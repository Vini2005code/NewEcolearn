"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Award, TrendingUp, Lock, Star, Leaf } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DashboardContentProps {
  userName: string
  userEmail: string
  bestScore: number
  totalQuizzes: number
  completedTopics: string[]
  onStartQuiz: (topicId: string) => void
}

const TOTAL_TOPICS = 3

const topics = [
  {
    id: "meio-ambiente",
    name: "Meio Ambiente",
    image: "/images/meio-ambiente.jpg",
    description: "Sustentabilidade e preservação",
    difficulty: "Médio" as const,
  },
  {
    id: "animais",
    name: "Animais",
    image: "/images/animais.jpg",
    description: "Fauna brasileira e conservação",
    difficulty: "Fácil" as const,
  },
  {
    id: "dengue",
    name: "Dengue",
    image: "/images/dengue.jpg",
    description: "Prevenção e combate",
    difficulty: "Difícil" as const,
  },
]

const difficultyConfig: Record<string, { label: string; color: string; bar: number }> = {
  Fácil:  { label: "Fácil",  color: "bg-green-500",  bar: 33  },
  Médio:  { label: "Médio",  color: "bg-yellow-500", bar: 66  },
  Difícil:{ label: "Difícil",color: "bg-red-500",    bar: 100 },
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ElementType
  unlocked: boolean
  color: string
}

export function DashboardContent({
  userName,
  bestScore,
  totalQuizzes,
  completedTopics,
  onStartQuiz,
}: DashboardContentProps) {
  const uniqueTopicsCompleted = completedTopics.length
  const progressPct = Math.min(Math.round((uniqueTopicsCompleted / TOTAL_TOPICS) * 100), 100)

  const achievements: Achievement[] = [
    {
      id: "first-step",
      title: "Primeiro Passo",
      description: "Complete seu primeiro quiz",
      icon: Star,
      unlocked: totalQuizzes >= 1,
      color: "text-yellow-500",
    },
    {
      id: "green-explorer",
      title: "Explorador Verde",
      description: "Complete todos os 3 tópicos",
      icon: Leaf,
      unlocked: uniqueTopicsCompleted >= TOTAL_TOPICS,
      color: "text-green-500",
    },
    {
      id: "ecolearn-master",
      title: "Mestre EcoLearn",
      description: "Alcance mais de 800 pts",
      icon: Trophy,
      unlocked: bestScore > 800,
      color: "text-amber-500",
    },
  ]

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 text-balance">
          Bem-vindo, {userName.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">Continue sua jornada de aprendizado sustentável.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Seu Melhor Score
            </CardTitle>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {bestScore} <span className="text-lg font-medium">pts</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quizzes Completados
            </CardTitle>
            <Target className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalQuizzes}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tópicos Disponíveis
            </CardTitle>
            <Award className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{TOTAL_TOPICS}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progresso Geral
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{progressPct}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {uniqueTopicsCompleted}/{TOTAL_TOPICS} tópicos
            </p>
            <Progress value={progressPct} className="h-1.5 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Conquistas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <Card
                key={achievement.id}
                className={cn(
                  "bg-card border-border flex flex-col items-center p-5 text-center transition-all duration-300",
                  achievement.unlocked && "badge-glow"
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-3",
                    achievement.unlocked
                      ? "bg-primary/20"
                      : "bg-muted grayscale"
                  )}
                >
                  {achievement.unlocked ? (
                    <Icon className={cn("w-7 h-7", achievement.color)} />
                  ) : (
                    <Lock className="w-7 h-7 text-muted-foreground" />
                  )}
                </div>
                <p className={cn(
                  "font-semibold text-sm mb-1",
                  achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                )}>
                  {achievement.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <span className="mt-2 text-xs font-medium text-primary">Desbloqueada!</span>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Escolha um desafio para começar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const diff = difficultyConfig[topic.difficulty]
            return (
              <Card
                key={topic.id}
                className="bg-card border-border overflow-hidden cursor-pointer hover:border-primary transition-all duration-300 group"
                onClick={() => onStartQuiz(topic.id)}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={topic.image || "/placeholder.svg"}
                    alt={topic.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{topic.name}</h3>
                    <p className="text-sm text-white/80">{topic.description}</p>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  {/* Difficulty bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Dificuldade</span>
                      <span className={cn("text-xs font-medium", diff.color.replace("bg-", "text-"))}>
                        {diff.label}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", diff.color)}
                        style={{ width: `${diff.bar}%` }}
                      />
                    </div>
                  </div>
                  <button className="w-full py-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
                    Iniciar Quiz
                  </button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Info Card */}
      <Card className="mt-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Como funciona o sistema de pontuação?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada quiz possui 10 perguntas. Responda corretamente para acumular pontos.
                Quanto mais acertos, maior será sua pontuação! O placar exibe pontos (pts).
                Compete com seus colegas e alcance o topo!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
