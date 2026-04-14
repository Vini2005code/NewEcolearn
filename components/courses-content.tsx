"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Clock, BookOpen, Award, Droplets, Leaf, Bug } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"

export function CoursesContent() {
  const [activeTab, setActiveTab] = useState("categories")

  const courses = [
    {
      id: "agua",
      title: "Conscientização de Água",
      description: "Aprenda sobre a importância da água",
      icon: Droplets,
      color: "blue",
      status: "Novo Curso!",
      lessons: 8,
      duration: "2h 30min"
    },
    {
      id: "meio-ambiente",
      title: "Meio Ambiente",
      description: "Preservação e sustentabilidade",
      icon: Leaf,
      color: "green",
      status: "Popular",
      lessons: 12,
      duration: "4h 15min"
    },
    {
      id: "animais",
      title: "Proteção Animal",
      description: "Fauna brasileira e conservação",
      icon: Bug,
      color: "amber",
      status: "Recomendado",
      lessons: 10,
      duration: "3h 45min"
    },
    {
      id: "reciclagem",
      title: "Reciclagem",
      description: "Como reciclar corretamente",
      icon: Award,
      color: "purple",
      status: "Essencial",
      lessons: 6,
      duration: "1h 50min"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> = {
      blue: { bg: "bg-blue-500/20", text: "text-blue-500", hover: "hover:border-blue-500" },
      green: { bg: "bg-green-500/20", text: "text-green-500", hover: "hover:border-green-500" },
      amber: { bg: "bg-amber-500/20", text: "text-amber-500", hover: "hover:border-amber-500" },
      purple: { bg: "bg-purple-500/20", text: "text-purple-500", hover: "hover:border-purple-500" }
    }
    return colors[color] || colors.green
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Cursos de Sustentabilidade
        </h1>
        <p className="text-muted-foreground">
          Explore nossos conteúdos e aprenda a cuidar do planeta.
        </p>
      </div>

      <div className="flex gap-2 mb-6 bg-muted/50 p-1 rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "categories" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Cursos Disponíveis
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("featured")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "featured" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Vídeo em Destaque
        </button>
      </div>

      {activeTab === "categories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const colorClasses = getColorClasses(course.color)
            const IconComponent = course.icon
            return (
              <Card 
                key={course.id}
                className={`bg-card border-border ${colorClasses.hover} transition-all cursor-pointer hover:scale-105 group`}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-full ${colorClasses.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-8 h-8 ${colorClasses.text}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-center">{course.title}</h3>
                  <p className="text-xs text-muted-foreground text-center mb-3">{course.description}</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.lessons} aulas
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                  </div>
                  <p className={`text-xs font-medium ${colorClasses.text} text-center`}>{course.status}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {activeTab === "featured" && (
        <div className="space-y-6">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <VideoPlayer
                src="/images/video-onu.mp4"
                poster="/images/meio-ambiente.jpg"
                title="A Odisseia de uma Garrafa - ONU Meio Ambiente"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Play className="w-5 h-5 text-primary" />
                  <span className="text-sm text-primary font-medium">Vídeo em Destaque</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  A Odisseia de uma Garrafa - ONU Meio Ambiente
                </h2>
                <p className="text-muted-foreground mb-4">
                  Acompanhe a jornada de uma garrafa plástica e entenda o impacto do plástico nos oceanos. 
                  Este vídeo educativo da ONU Brasil mostra a importância da reciclagem e do consumo consciente.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    2 minutos
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    ONU Brasil
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border-border p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Meio Ambiente</p>
                  <p className="text-xs text-muted-foreground">Categoria principal</p>
                </div>
              </div>
            </Card>
            <Card className="bg-card border-border p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Oceanos</p>
                  <p className="text-xs text-muted-foreground">Subtema abordado</p>
                </div>
              </div>
            </Card>
            <Card className="bg-card border-border p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Certificado</p>
                  <p className="text-xs text-muted-foreground">Ao completar</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
