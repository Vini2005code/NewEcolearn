"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api-client"
import catalog from "@/lib/quiz-catalog.json"
import type { Profile, QuizResult } from "@/lib/contracts"

type HistoryEntry = QuizResult & { topicId: string; createdAt: number }

export function ProfileContent({ profile }: { profile: Profile }) {
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  async function load() {
    setLoading(true)
    setError("")
    try { setEntries(await api<HistoryEntry[]>("/history")) }
    catch (err) { setError((err as Error).message) }
    finally { setLoading(false) }
  }
  useEffect(() => { void load() }, [])
  return <div className="min-h-screen px-5 py-20 sm:px-8 lg:px-10 lg:py-10"><div className="mx-auto max-w-4xl">
    <p className="text-sm text-primary">Seu aprendizado</p><h1 className="mt-3 text-4xl font-semibold">Minha jornada</h1>
    <p className="mt-4 text-muted-foreground">Seu progresso é identificado por este navegador. Use o mesmo navegador para continuar sua jornada.</p>
    <div className="my-8 grid grid-cols-3 gap-3">{[[profile.totalXp, "XP acumulados"], [profile.totalQuizzes, "quizzes concluídos"], [`${profile.bestScore}%`, "melhor resultado"]].map(([value, label]) => <Card key={label}><CardContent className="p-4"><p className="text-2xl font-semibold">{value}</p><p className="text-xs text-muted-foreground">{label}</p></CardContent></Card>)}</div>
    <h2 className="mb-4 text-2xl font-semibold">Últimas 20 tentativas</h2>
    {loading && <p role="status">Carregando histórico…</p>}
    {error && <div role="alert"><p>{error}</p><Button className="mt-3" onClick={load}>Tentar novamente</Button></div>}
    {!loading && !error && entries.length === 0 && <p className="rounded-lg border border-border p-6 text-muted-foreground">Conclua seu primeiro desafio para ver o histórico aqui. O progresso importado continua nos totais acima.</p>}
    <div className="space-y-3">{entries.map((entry, index) => <Card key={`${entry.createdAt}-${index}`}><CardContent className="flex flex-wrap items-center justify-between gap-4 p-5"><div><h3 className="font-semibold">{catalog.find((topic) => topic.id === entry.topicId)?.name ?? entry.topicId}</h3><p className="mt-1 text-sm text-muted-foreground">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(entry.createdAt)}</p></div><p className="font-semibold text-primary">{entry.score}% · +{entry.xpEarned} XP</p></CardContent></Card>)}</div>
  </div></div>
}
