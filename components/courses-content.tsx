"use client"

import { useState } from "react"
import Image from "next/image"
import { Award, BookOpen, Building2, Clock, Droplets, Leaf, Play, Recycle, ShieldCheck, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { VideoPlayer } from "@/components/video-player"
import { cn } from "@/lib/utils"

const courses = [
  {
    id: "reciclagem",
    title: "Reciclagem inteligente",
    description: "Como separar resíduos, reduzir desperdício e mobilizar a escola.",
    thumbnail: "/images/quiz/coleta-seletiva.jpg",
    sponsor: "Sponsor ready",
    progress: 38,
    lessons: 6,
    duration: "1h 50min",
    icon: Recycle,
  },
  {
    id: "agua",
    title: "Água e consumo consciente",
    description: "Hábitos simples para preservar água em casa, na escola e no bairro.",
    thumbnail: "/images/quiz/economia-agua.jpg",
    sponsor: "Parceiro futuro",
    progress: 12,
    lessons: 8,
    duration: "2h 30min",
    icon: Droplets,
  },
  {
    id: "biodiversidade",
    title: "Biodiversidade brasileira",
    description: "Fauna, habitat, espécies ameaçadas e ações de conservação.",
    thumbnail: "/images/animais.jpg",
    sponsor: "Institucional",
    progress: 0,
    lessons: 10,
    duration: "3h 20min",
    icon: Sprout,
  },
]

const videos = [
  {
    title: "A Odisseia de uma Garrafa",
    description: "Vídeo educativo sobre o ciclo do plástico, reciclagem e impacto nos oceanos.",
    src: "/images/video-onu.mp4",
    poster: "/images/meio-ambiente.jpg",
    source: "ONU Meio Ambiente",
  },
]

export function CoursesContent() {
  const [activeTab, setActiveTab] = useState<"courses" | "videos">("courses")

  return (
    <div className="min-h-screen overflow-y-auto px-5 py-20 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Cursos MVP
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Trilhas ambientais prontas para crescer com patrocinadores.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              A seção mostra cursos, vídeos e progresso sem construir uma plataforma EAD completa. Os cards já deixam espaço para thumbnail, sponsor logo e campanhas futuras.
            </p>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-primary/10 p-3 text-primary">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Arquitetura patrocinável</p>
                  <h2 className="text-xl font-semibold">Conteúdo institucional futuro</h2>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-2xl font-semibold">3</p>
                  <p className="text-xs text-muted-foreground">cursos</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-2xl font-semibold">1</p>
                  <p className="text-xs text-muted-foreground">vídeo</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-2xl font-semibold">0</p>
                  <p className="text-xs text-muted-foreground">APIs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="mb-6 flex w-fit rounded-lg border border-border bg-secondary/45 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("courses")}
            className={cn("rounded-md px-4 py-2 text-sm font-medium transition", activeTab === "courses" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            Cursos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={cn("rounded-md px-4 py-2 text-sm font-medium transition", activeTab === "videos" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            Vídeos
          </button>
        </div>

        {activeTab === "courses" && (
          <div className="grid gap-5 lg:grid-cols-3">
            {courses.map((course) => {
              const Icon = course.icon
              return (
                <Card key={course.id} className="group overflow-hidden border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-48">
                    <Image src={course.thumbnail} alt={course.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {course.sponsor}
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                      <div className="rounded-md bg-white/20 p-2 backdrop-blur">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-semibold">{course.title}</h2>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="min-h-16 text-sm leading-6 text-muted-foreground">{course.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {course.lessons} aulas
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progresso mockado</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button variant="outline" className="mt-5 w-full bg-transparent">
                      Ver trilha
                      <Play className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid gap-5 lg:grid-cols-[1fr_0.42fr]">
            {videos.map((video) => (
              <Card key={video.title} className="overflow-hidden border-border bg-card shadow-xl">
                <CardContent className="p-0">
                  <VideoPlayer src={video.src} poster={video.poster} title={video.title} />
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                      <Play className="h-4 w-4" />
                      Vídeo educativo
                    </div>
                    <h2 className="text-2xl font-semibold">{video.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{video.description}</p>
                    <p className="mt-4 text-sm font-medium">{video.source}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="grid gap-5">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <ShieldCheck className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Player responsivo</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Usa HTML5 video com MP4, fallback WebM, poster, lazy-load e estado de erro.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <Award className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Aulas patrocinadas</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Espaço preparado para logos e campanhas, ainda sem lógica comercial ativa.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <Leaf className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Conteúdo leve</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Sem chamadas de IA ou APIs desnecessárias durante o aprendizado.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
