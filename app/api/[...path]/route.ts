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
    const session = identify(request.cookies.get(cookieName)?.value)
    let body: unknown
    if (request.method === "POST") {
      const raw = await request.text()
      if (raw.length > 16384) throw new ApiError("Requisição muito grande.", 413)
      try { body = JSON.parse(raw) } catch { throw new ApiError("JSON inválido.") }
    }
    let data: unknown
    if (request.method === "GET" && path === "/profile") data = profile(session.id)
    else if (request.method === "GET" && path === "/history") data = history(session.id)
    else if (request.method === "GET" && path === "/hub") data = hub(session.id)
    else if (request.method === "POST" && path === "/progress/migrate") data = migrate(session.id, body)
    else if (request.method === "POST" && path === "/quizzes/start") data = startAttempt(session.id, (body as { topicId?: unknown } | null)?.topicId)
    else if (request.method === "POST" && path === "/quizzes/submit") data = submitAttempt(session.id, body)
    else if (request.method === "POST" && path === "/courses/complete") data = completeLesson(session.id, body)
    else if (request.method === "POST" && path === "/community") data = createPost(session.id, body)
    else if (request.method === "POST" && path === "/campaigns") data = createCampaign(session.id, body)
    else if (request.method === "POST" && path === "/campaigns/join") data = joinCampaign(session.id, body)
    else throw new ApiError("Recurso não encontrado.", 404)
    const response = NextResponse.json(data, { headers: { "Cache-Control": "no-store" } })
    if (session.fresh) response.cookies.set(cookieName, session.token, { httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge: 60 * 60 * 24 * 365 })
    return response
  } catch (error) {
    if (!(error instanceof ApiError)) console.error("Ecolearn API:", error)
    return NextResponse.json({ error: error instanceof ApiError ? error.message : "Não foi possível acessar seus dados. Tente novamente." }, { status: error instanceof ApiError ? error.status : 500, headers: { "Cache-Control": "no-store" } })
  }
}

export const GET = handle
export const POST = handle
