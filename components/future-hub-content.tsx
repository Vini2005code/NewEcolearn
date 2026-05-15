"use client"

import { BarChart3, Building2, Crown, MapPin, QrCode, Shield, Trophy, UserRound, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FutureHubContentProps {
  activeView: string
}

const viewCopy: Record<string, { title: string; eyebrow: string; description: string }> = {
  ranking: {
    title: "Rankings e impacto coletivo",
    eyebrow: "Coming soon",
    description: "Arquitetura visual para rankings por escola, comunidade e pontuação ambiental. Sem lógica de produção ativa no MVP.",
  },
  comunidade: {
    title: "Comunidade Ecolearn",
    eyebrow: "Coming soon",
    description: "Espaço preparado para desafios entre turmas, ações locais e colaboração entre estudantes, professores e parceiros.",
  },
  campanhas: {
    title: "Campanhas e patrocínios",
    eyebrow: "Coming soon",
    description: "Base visual para eventos com QR Code, campanhas de reciclagem, missões presenciais e trilhas patrocinadas.",
  },
  impacto: {
    title: "Painel de impacto ambiental",
    eyebrow: "Coming soon",
    description: "Mockup escalável para métricas de árvores, resíduos, água economizada e participação comunitária.",
  },
  perfil: {
    title: "Perfil do estudante",
    eyebrow: "Coming soon",
    description: "Área futura para avatar, histórico de XP, badges, conquistas e participação em campanhas.",
  },
}

const rankingPlaceholders = [
  { label: "Escola Verde Norte", score: "12.480 XP", icon: Crown },
  { label: "Comunidade Água Limpa", score: "9.240 XP", icon: Users },
  { label: "Turma Recicla+", score: "7.810 XP", icon: Trophy },
]

const impactMetrics = [
  { label: "Resíduos mapeados", value: "1.2t", progress: 62 },
  { label: "Participação escolar", value: "74%", progress: 74 },
  { label: "Campanhas ativas", value: "8", progress: 45 },
]

export function FutureHubContent({ activeView }: FutureHubContentProps) {
  const copy = viewCopy[activeView] ?? viewCopy.comunidade

  return (
    <div className="min-h-screen overflow-y-auto px-5 py-20 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {copy.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{copy.description}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-border bg-card shadow-xl">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ranking preview</p>
                  <h2 className="text-2xl font-semibold">Escolas e comunidades</h2>
                </div>
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-3">
                {rankingPlaceholders.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-4 rounded-lg border border-border bg-background/50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-xs text-muted-foreground">#{index + 1} no mockup futuro</p>
                      </div>
                      <span className="text-sm font-semibold">{item.score}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <QrCode className="mb-5 h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Eventos com QR Code</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Check-ins de campanhas presenciais e missões de reciclagem serão conectados depois.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <Building2 className="mb-5 h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Patrocinadores</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Espaço preparado para marcas, municípios e instituições apoiarem trilhas educativas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card sm:col-span-2">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Indicadores ambientais</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {impactMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-lg bg-secondary/50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                        <span className="font-semibold">{metric.value}</span>
                      </div>
                      <Progress value={metric.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <Card className="border-dashed border-border bg-card/70">
            <CardContent className="p-5">
              <UserRound className="mb-4 h-5 w-5 text-primary" />
              <p className="font-semibold">Perfis e badges</p>
              <p className="mt-2 text-sm text-muted-foreground">Mockado para futura identidade do estudante.</p>
            </CardContent>
          </Card>
          <Card className="border-dashed border-border bg-card/70">
            <CardContent className="p-5">
              <MapPin className="mb-4 h-5 w-5 text-primary" />
              <p className="font-semibold">Missões locais</p>
              <p className="mt-2 text-sm text-muted-foreground">Preparado para ações em bairros e escolas.</p>
            </CardContent>
          </Card>
          <Card className="border-dashed border-border bg-card/70">
            <CardContent className="p-5">
              <Shield className="mb-4 h-5 w-5 text-primary" />
              <p className="font-semibold">Sem produção ativa</p>
              <p className="mt-2 text-sm text-muted-foreground">Apenas UI e arquitetura visual neste estágio.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
