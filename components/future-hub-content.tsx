"use client"

import { useEffect, useRef, useState } from "react"
import { BarChart3, Leaf, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api-client"
import type { HubData } from "@/lib/contracts"

const copy: Record<string, { title: string; description: string }> = {
  ranking: { title: "Ranking da comunidade", description: "As 20 jornadas com mais XP. Continue aprendendo para subir no ranking." },
  comunidade: { title: "Comunidade Ecolearn", description: "Compartilhe uma ideia ou um hábito sustentável. As publicações são visíveis aos participantes desta plataforma." },
  campanhas: { title: "Campanhas ambientais", description: "Crie uma ação para sua comunidade ou participe das iniciativas já cadastradas." },
  impacto: { title: "Impacto do aprendizado", description: "Acompanhe a participação real na plataforma. Os indicadores registram aprendizado e mobilização." },
}

export function FutureHubContent({ activeView }: { activeView: string }) {
  const [data, setData] = useState<HubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const lock = useRef(false)
  async function load() {
    setLoading(true)
    setError("")
    try { setData(await api<HubData>("/hub")) }
    catch (err) { setError((err as Error).message) }
    finally { setLoading(false) }
  }
  useEffect(() => { void load() }, [])
  async function submit(path: string, body: unknown, success: string) {
    if (lock.current) return
    lock.current = true
    setBusy(true)
    setError("")
    setNotice("")
    try { setData(await api<HubData>(path, body)); setNotice(success); setMessage(""); setTitle(""); setDescription("") }
    catch (err) { setError((err as Error).message) }
    finally { setBusy(false); lock.current = false }
  }
  const current = copy[activeView] ?? copy.comunidade
  return <div className="min-h-screen px-5 py-20 sm:px-8 lg:px-10 lg:py-10"><div className="mx-auto max-w-6xl">
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-primary">Aprender e agir juntos</p><h1 className="mt-3 text-4xl font-semibold">{current.title}</h1><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{current.description}</p></div><Button variant="outline" disabled={loading || busy} onClick={load}>Atualizar</Button></div>
    {loading && <p role="status">Carregando…</p>}
    {error && <p role="alert" className="mb-5 rounded-lg border border-destructive/30 p-4 text-destructive">{error}</p>}
    {notice && <p role="status" className="mb-5 rounded-lg bg-primary/10 p-4 text-primary">{notice}</p>}
    {data && activeView === "ranking" && <Card><CardContent className="p-6"><Trophy className="mb-4 h-7 w-7 text-primary" />{data.ranking.length === 0 ? <p className="text-muted-foreground">O ranking começa com o primeiro quiz concluído.</p> : <ol className="space-y-3">{data.ranking.map((item) => <li key={item.position} className={item.isYou ? "flex items-center gap-4 rounded-lg bg-primary/10 p-4" : "flex items-center gap-4 rounded-lg bg-secondary/40 p-4"}><span className="text-xl font-semibold">#{item.position}</span><span className="flex-1 font-medium">{item.name}<span className="block text-xs text-muted-foreground">{item.totalQuizzes} quizzes concluídos</span></span><span className="font-semibold text-primary">{item.totalXp} XP</span></li>)}</ol>}</CardContent></Card>}
    {data && activeView === "comunidade" && <div className="grid items-start gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <Card><CardContent className="p-6"><Users className="mb-4 h-6 w-6 text-primary" /><h2 className="text-xl font-semibold">Compartilhe uma ideia</h2><form className="mt-4 space-y-4" onSubmit={(event) => { event.preventDefault(); void submit("/community", { message }, "Ideia publicada na comunidade.") }}><label htmlFor="community-message" className="block text-sm">Sua mensagem</label><Textarea id="community-message" value={message} onChange={(event) => setMessage(event.target.value)} required minLength={3} maxLength={600} rows={5} placeholder="Que hábito sustentável você pratica?" /><p className="text-xs text-muted-foreground">Evite compartilhar dados pessoais. Até 600 caracteres.</p><Button disabled={busy} type="submit">{busy ? "Publicando…" : "Publicar ideia"}</Button></form></CardContent></Card>
      <div className="space-y-4">{data.posts.length === 0 && <p className="rounded-lg border border-border p-6 text-muted-foreground">Ainda não há publicações. Compartilhe a primeira ideia.</p>}{data.posts.map((post) => <Card key={post.id}><CardContent className="p-6"><p className="text-sm font-semibold text-primary">{post.isYou ? "Você" : "Participante Ecolearn"}</p><p className="mt-3 whitespace-pre-wrap break-words leading-7">{post.message}</p><p className="mt-4 text-xs text-muted-foreground">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(post.createdAt)}</p></CardContent></Card>)}</div>
    </div>}
    {data && activeView === "campanhas" && <div className="grid items-start gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <Card><CardContent className="p-6"><Leaf className="mb-4 h-6 w-6 text-primary" /><h2 className="text-xl font-semibold">Criar campanha</h2><form className="mt-4 space-y-4" onSubmit={(event) => { event.preventDefault(); void submit("/campaigns", { title, description }, "Campanha criada. Convide sua comunidade a participar.") }}><label className="block text-sm" htmlFor="campaign-title">Nome da campanha</label><Input id="campaign-title" value={title} onChange={(event) => setTitle(event.target.value)} required minLength={3} maxLength={100} placeholder="Ex.: Semana da coleta seletiva" /><label className="block text-sm" htmlFor="campaign-description">Como participar</label><Textarea id="campaign-description" value={description} onChange={(event) => setDescription(event.target.value)} required minLength={10} maxLength={1000} rows={5} placeholder="Descreva a ação e as orientações para participar." /><Button type="submit" disabled={busy}>{busy ? "Salvando…" : "Criar campanha"}</Button></form></CardContent></Card>
      <div className="space-y-4">{data.campaigns.length === 0 && <p className="rounded-lg border border-border p-6 text-muted-foreground">Nenhuma campanha cadastrada. Crie uma ação para começar.</p>}{data.campaigns.map((campaign) => <Card key={campaign.id}><CardContent className="p-6"><h2 className="break-words text-xl font-semibold">{campaign.title}</h2><p className="mt-3 whitespace-pre-wrap break-words leading-7 text-muted-foreground">{campaign.description}</p><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm">{campaign.participants} participantes</p><Button disabled={busy || campaign.joined} onClick={() => void submit("/campaigns/join", { campaignId: campaign.id }, "Participação registrada.")}>{campaign.joined ? "✓ Você participa" : "Quero participar"}</Button></div></CardContent></Card>)}</div>
    </div>}
    {data && activeView === "impacto" && <><BarChart3 className="mb-5 h-8 w-8 text-primary" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[[data.impact.learners, "Jornadas com atividade"], [data.impact.quizzes, "Quizzes concluídos no servidor"], [data.impact.lessons, "Leituras concluídas"], [data.impact.campaigns, "Campanhas criadas"], [data.impact.participations, "Participações em campanhas"]].map(([value, label]) => <Card key={label}><CardContent className="p-6"><p className="text-4xl font-semibold text-primary">{value}</p><h2 className="mt-3 text-sm text-muted-foreground">{label}</h2></CardContent></Card>)}</div><p className="mt-6 text-sm text-muted-foreground">Os quizzes importados do navegador ficam nos totais da sua jornada. Os indicadores coletivos contam os registros criados no servidor.</p></>}
  </div></div>
}
