"use client"

import Image from "next/image"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarDays,
  HeartHandshake,
  Leaf,
  Medal,
  Play,
  QrCode,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizTopics } from "@/lib/quiz-data"
import { aiQuizGeneration } from "@/lib/ai-quiz"

interface DashboardContentProps {
  userName: string
  userEmail: string
  bestScore: number
  totalQuizzes: number
  totalXp: number
  onNavigate: (tab: string) => void
}

const impactCards = [
  {
    title: "Educação ambiental",
    description: "Conteúdos curtos e visuais para transformar consciência em ação.",
    icon: Leaf,
    metric: "3 trilhas",
  },
  {
    title: "Impacto comunitário",
    description: "Base preparada para campanhas em escolas, bairros e parceiros.",
    icon: Users,
    metric: "Em breve",
  },
  {
    title: "Saúde e prevenção",
    description: "Aprendizado conectado a temas reais como dengue, água e resíduos.",
    icon: ShieldCheck,
    metric: "MVP ativo",
  },
]

const achievements = [
  { label: "Guardião verde", icon: BadgeCheck, active: true },
  { label: "Reciclagem básica", icon: Award, active: true },
  { label: "Líder comunitário", icon: Medal, active: false },
]

const futureModules = [
  { title: "Eventos com QR Code", icon: QrCode, tab: "campanhas" },
  { title: "Rankings por escola", icon: Trophy, tab: "ranking" },
  { title: "Painel de impacto", icon: Target, tab: "impacto" },
  { title: "Patrocínios", icon: Building2, tab: "campanhas" },
]

export function DashboardContent({
  userName,
  userEmail,
  bestScore,
  totalQuizzes,
  totalXp,
  onNavigate,
}: DashboardContentProps) {
  const nextLevelXp = 600
  const xpProgress = Math.min(Math.round((totalXp / nextLevelXp) * 100), 100)

  return (
    <div className="min-h-screen overflow-y-auto">
      <section className="relative isolate overflow-hidden px-5 pb-10 pt-20 sm:px-8 lg:px-10 lg:pt-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.2),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.18),transparent_26%)]" />
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-card shadow-2xl">
            <Image
              src="/images/meio-ambiente.jpg"
              alt="Floresta usada como visual principal da Ecolearn"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/45 to-emerald-950/30" />
            <div className="relative flex h-full min-h-[520px] flex-col justify-between p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-white/75">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
                  Ecolearn MVP
                </span>
                <span>Educação ambiental gamificada</span>
              </div>

              <div className="max-w-3xl space-y-6">
                <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
                  Aprender sustentabilidade pode parecer uma missão.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                  Uma plataforma visual para escolas, comunidades e parceiros criarem consciência, desafios e campanhas ambientais com uma experiência de startup moderna.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="h-12 rounded-md bg-primary px-6 text-base shadow-lg shadow-emerald-950/30" onClick={() => onNavigate("meio-ambiente")}>
                    Começar desafio
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 rounded-md border-white/30 bg-white/10 px-6 text-base text-white hover:bg-white/20" onClick={() => onNavigate("cursos")}>
                    Ver cursos
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {impactCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div key={card.title} className="rounded-lg border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
                      <Icon className="mb-3 h-5 w-5 text-emerald-200" />
                      <p className="text-sm font-semibold">{card.title}</p>
                      <p className="mt-1 text-xs leading-5 text-white/70">{card.description}</p>
                      <p className="mt-3 text-xs font-semibold text-emerald-200">{card.metric}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="border-border bg-card/90 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Olá, {userName}</p>
                    <h2 className="mt-1 text-2xl font-semibold">Sua jornada climática</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{userEmail}</p>
                  </div>
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">XP para nível 2</span>
                    <span className="font-semibold">{totalXp}/{nextLevelXp} XP</span>
                  </div>
                  <Progress value={xpProgress} className="h-3 bg-primary/20" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-secondary/70 p-4">
                    <p className="text-2xl font-semibold">{bestScore}%</p>
                    <p className="text-xs text-muted-foreground">melhor quiz</p>
                  </div>
                  <div className="rounded-lg bg-secondary/70 p-4">
                    <p className="text-2xl font-semibold">{totalQuizzes}</p>
                    <p className="text-xs text-muted-foreground">quizzes</p>
                  </div>
                  <div className="rounded-lg bg-secondary/70 p-4">
                    <p className="text-2xl font-semibold">3</p>
                    <p className="text-xs text-muted-foreground">badges</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/90">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gamificação leve</p>
                    <h2 className="text-xl font-semibold">Conquistas</h2>
                  </div>
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="grid gap-3">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <div key={achievement.label} className="flex items-center justify-between rounded-lg border border-border bg-background/45 p-3">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-md p-2 ${achievement.active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{achievement.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{achievement.active ? "Ativo" : "Em breve"}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-primary">Quizzes com imagens</p>
              <h2 className="text-3xl font-semibold">Escolha um desafio</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              A geração por IA está preparada na arquitetura, mas permanece restrita a administradores e fica em estado {aiQuizGeneration.status} para estudantes no MVP.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {quizTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => onNavigate(topic.id)}
                className="group overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
              >
                <div className="relative h-48">
                  <Image src={topic.image} alt={topic.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">{topic.difficulty}</span>
                    <h3 className="mt-3 text-2xl font-semibold">{topic.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="min-h-12 text-sm leading-6 text-muted-foreground">{topic.description}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-medium text-primary">{topic.questions.length} perguntas</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1fr]">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-md bg-cyan-500/15 p-2 text-cyan-500">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cursos e vídeos</p>
                  <h2 className="text-xl font-semibold">Conteúdos patrocináveis</h2>
                </div>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Cards já preparados para thumbnail, logo de patrocinador, descrição e progresso. O objetivo é permitir campanhas educativas sem construir uma plataforma EAD completa agora.
              </p>
              <Button className="mt-5 rounded-md" onClick={() => onNavigate("cursos")}>
                Abrir seção
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {futureModules.map((module) => {
              const Icon = module.icon
              return (
                <button
                  key={module.title}
                  type="button"
                  onClick={() => onNavigate(module.tab)}
                  className="rounded-lg border border-dashed border-border bg-card/70 p-5 text-left transition hover:border-primary/50 hover:bg-card"
                >
                  <Icon className="mb-4 h-5 w-5 text-primary" />
                  <p className="font-semibold">{module.title}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Coming soon</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>Próxima fase: desafios comunitários, rankings e campanhas presenciais.</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-4 w-4 text-primary" />
            <span>Pronto para escolas e patrocinadores</span>
          </div>
        </div>
      </section>
    </div>
  )
}
