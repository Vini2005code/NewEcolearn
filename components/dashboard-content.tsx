"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

interface DashboardContentProps {
  userName: string
  userEmail: string
  bestScore: number
  totalQuizzes: number
  onStartQuiz: (topicId: string) => void
}

const topics = [
  {
    id: "meio-ambiente",
    name: "Meio Ambiente",
    image: "/images/meio-ambiente.jpg",
    description: "Sustentabilidade e preservação"
  },
  {
    id: "animais",
    name: "Animais",
    image: "/images/animais.jpg",
    description: "Fauna brasileira e conservação"
  },
  {
    id: "dengue",
    name: "Dengue",
    image: "/images/dengue.jpg",
    description: "Prevenção e combate"
  }
]

export function DashboardContent({ userName, userEmail, bestScore, totalQuizzes, onStartQuiz }: DashboardContentProps) {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Bem-vindo, {userName}!
        </h1>
        <p className="text-muted-foreground">
          Email: {userEmail}
        </p>
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
              R$ {bestScore.toFixed(2).replace(".", ",")}
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
            <div className="text-3xl font-bold text-foreground">
              {totalQuizzes}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tópicos Disponíveis
            </CardTitle>
            <Award className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              3
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progresso Geral
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {Math.min(Math.round((totalQuizzes / 9) * 100), 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Escolha um desafio para começar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic) => (
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
              <CardContent className="p-4">
                <button className="w-full py-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
                  Iniciar Quiz
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
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
                Quanto mais acertos, maior será sua pontuação! Seu melhor score é convertido 
                em um valor em reais para gamificação. Compete com seus colegas e alcance o topo do ranking!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
