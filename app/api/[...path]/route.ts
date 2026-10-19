import { withDatabase, DatabaseConfigurationError } from "@/lib/server/db"
import { NextRequest, NextResponse } from "next/server"
import { ApiError, identify, profile, migrate, startAttempt, submitAttempt, completeLesson, history, hub, createPost, createCampaign, joinCampaign } from "@/lib/server/service"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
const cookieName = "ecolearn_journey"

async function handle(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname.replace(/^\/api/, "")
    if (request.method === "POST") {
      const origin = request.headers.get("origin")
      if (origin && origin !== request.nextUrl.origin) throw new ApiError("Origem não autorizada.", 403)
      if (!request.headers.get("content-type")?.includes("application/json")) throw new ApiError("Use JSON para enviar dados.", 415)
      if (Number(request.headers.get("content-length") || 0) > 16384) throw new ApiError("Requisição muito grande.", 413)
    }
    return await withDatabase(async () => {
      const session = await identify(request.cookies.get(cookieName)?.value)
      let body: unknown
      if (request.method === "POST") {
        const raw = await request.text()
        if (raw.length > 16384) throw new ApiError("Requisição muito grande.", 413)
        try { body = JSON.parse(raw) } catch { throw new ApiError("JSON inválido.") }
      }
      let data: unknown
      if (request.method === "GET" && path === "/profile") data = await profile(session.id)
      else if (request.method === "GET" && path === "/history") data = await history(session.id)
      else if (request.method === "GET" && path === "/hub") data = await hub(session.id)
      else if (request.method === "POST" && path === "/progress/migrate") data = await migrate(session.id, body)
      else if (request.method === "POST" && path === "/quizzes/start") data = await startAttempt(session.id, (body as { topicId?: unknown } | null)?.topicId)
      else if (request.method === "POST" && path === "/quizzes/submit") data = await submitAttempt(session.id, body)
      else if (request.method === "POST" && path === "/courses/complete") data = await completeLesson(session.id, body)
      else if (request.method === "POST" && path === "/community") data = await createPost(session.id, body)
      else if (request.method === "POST" && path === "/campaigns") data = await createCampaign(session.id, body)
      else if (request.method === "POST" && path === "/campaigns/join") data = await joinCampaign(session.id, body)
      else throw new ApiError("Recurso não encontrado.", 404)
      const response = NextResponse.json(data, { headers: { "Cache-Control": "no-store" } })
      if (session.fresh) response.cookies.set(cookieName, session.token, { httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge: 60 * 60 * 24 * 365 })
      return response
    })
  } catch (error) {
    if (!(error instanceof ApiError)) console.error("Ecolearn API:", error)
    return NextResponse.json({ error: error instanceof ApiError || error instanceof DatabaseConfigurationError ? error.message : "Não foi possível acessar seus dados. Tente novamente." }, { status: error instanceof ApiError ? error.status : error instanceof DatabaseConfigurationError ? 503 : 500, headers: { "Cache-Control": "no-store" } })
  }
}

export const GET = handle
export const POST = handle
