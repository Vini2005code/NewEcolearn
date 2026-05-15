"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Lock, RotateCcw, Sparkles, Trophy, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { calculateScore, getTopicById } from "@/lib/quiz-data"
import { aiQuizGeneration } from "@/lib/ai-quiz"
import { cn } from "@/lib/utils"

interface QuizContentProps {
  topicId: string
  onComplete: (score: number, xpEarned: number) => void
  onBack: () => void
}

type QuizState = "intro" | "playing" | "result"

export function QuizContent({ topicId, onComplete, onBack }: QuizContentProps) {
  const topic = getTopicById(topicId)
  const [quizState, setQuizState] = useState<QuizState>("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [correctQuestionIndexes, setCorrectQuestionIndexes] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(30)

  const question = topic?.questions[currentQuestion]
  const progress = topic ? ((currentQuestion + 1) / topic.questions.length) * 100 : 0
  const xpEarned = useMemo(() => {
    if (!topic) return 0
    return correctQuestionIndexes.reduce((total, questionIndex) => total + topic.questions[questionIndex].xp, 0)
  }, [correctQuestionIndexes, topic])

  const handleAnswer = useCallback((answerIndex: number) => {
    if (!question || isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    if (answerIndex === question.correct) {
      setCorrectQuestionIndexes((current) => [...current, currentQuestion])
    }
  }, [currentQuestion, isAnswered, question])

  useEffect(() => {
    if (quizState !== "playing" || isAnswered) return
    if (timeLeft <= 0) {
      handleAnswer(-1)
      return
    }

    const timer = window.setTimeout(() => setTimeLeft((current) => current - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [timeLeft, quizState, isAnswered, handleAnswer])

  const startQuiz = () => {
    setQuizState("playing")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setCorrectQuestionIndexes([])
    setTimeLeft(30)
  }

  const nextQuestion = () => {
    if (!topic) return

    if (currentQuestion + 1 < topic.questions.length) {
      setCurrentQuestion((current) => current + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setTimeLeft(30)
      return
    }

    const finalCorrect = correctQuestionIndexes.length
    const finalScore = calculateScore(finalCorrect, topic.questions.length)
    onComplete(finalScore, xpEarned)
    setQuizState("result")
  }

  const restartQuiz = () => {
    setQuizState("intro")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setCorrectQuestionIndexes([])
    setTimeLeft(30)
  }

  if (!topic || !question) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="border-border bg-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Tópico não encontrado.</p>
            <Button className="mt-4" onClick={onBack}>
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizState === "intro") {
    return (
      <div className="min-h-screen overflow-y-auto px-5 py-20 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
            <Image src={topic.image} alt={topic.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/45 to-emerald-950/30" />
            <div className="relative flex min-h-[520px] flex-col justify-between p-6 text-white sm:p-8">
              <Button variant="outline" className="w-fit border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
                  {topic.difficulty}
                </span>
                <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">{topic.name}</h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/75">{topic.description}</p>
              </div>
            </div>
          </div>

          <div className="grid content-start gap-5">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-3 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Desafio gamificado</p>
                    <h2 className="text-2xl font-semibold">Ganhe XP por resposta</h2>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-secondary/60 p-4 text-center">
                    <p className="text-2xl font-semibold">{topic.questions.length}</p>
                    <p className="text-xs text-muted-foreground">perguntas</p>
                  </div>
                  <div className="rounded-lg bg-secondary/60 p-4 text-center">
                    <p className="text-2xl font-semibold">30s</p>
                    <p className="text-xs text-muted-foreground">por questão</p>
                  </div>
                  <div className="rounded-lg bg-secondary/60 p-4 text-center">
                    <p className="text-2xl font-semibold">{topic.questions.reduce((total, item) => total + item.xp, 0)}</p>
                    <p className="text-xs text-muted-foreground">XP total</p>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-dashed border-border bg-background/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Lock className="h-4 w-4 text-primary" />
                    IA para quiz: admin-only
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Geração por IA está marcada como {aiQuizGeneration.status} e não aparece para estudantes.
                  </p>
                </div>

                <Button size="lg" className="mt-6 h-12 w-full rounded-md text-base" onClick={startQuiz}>
                  Iniciar quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (quizState === "result") {
    const score = calculateScore(correctQuestionIndexes.length, topic.questions.length)
    const missed = topic.questions.length - correctQuestionIndexes.length

    return (
      <div className="flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 lg:px-10 lg:py-10">
        <Card className="w-full max-w-2xl border-border bg-card shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Trophy className="h-10 w-10" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Desafio concluído</p>
            <h1 className="mt-3 text-4xl font-semibold">{score}% de acerto</h1>
            <p className="mt-3 text-muted-foreground">Você ganhou {xpEarned} XP nesta rodada.</p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-secondary/60 p-4">
                <p className="text-2xl font-semibold text-primary">{correctQuestionIndexes.length}</p>
                <p className="text-xs text-muted-foreground">acertos</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-4">
                <p className="text-2xl font-semibold text-destructive">{missed}</p>
                <p className="text-xs text-muted-foreground">erros</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-4">
                <p className="text-2xl font-semibold">{xpEarned}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>

            <Progress value={score} className="mt-6 h-3" />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button variant="outline" className="bg-transparent" onClick={onBack}>
                Voltar à home
              </Button>
              <Button onClick={restartQuiz}>
                <RotateCcw className="h-4 w-4" />
                Tentar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-y-auto px-5 py-20 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Pergunta {currentQuestion + 1} de {topic.questions.length}</p>
            <h1 className="text-2xl font-semibold">{topic.name}</h1>
          </div>
          <div className={cn("flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold", timeLeft <= 10 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary")}>
            <Clock className="h-4 w-4" />
            {timeLeft}s
          </div>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <Progress value={progress} className="h-3" />
          <span className="text-sm font-semibold text-muted-foreground">{xpEarned} XP</span>
        </div>

        <Card className="overflow-hidden border-border bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300" key={question.id}>
          <div className="relative h-64 sm:h-80">
            <Image src={question.image} alt={`Imagem da pergunta: ${question.question}`} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>

          <CardContent className="p-5 sm:p-7">
            <h2 className="text-2xl font-semibold leading-tight">{question.question}</h2>
            <div className="mt-6 grid gap-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correct

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition duration-200",
                      !isAnswered && "border-border bg-secondary/35 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/5",
                      isAnswered && isCorrect && "border-primary bg-primary/10",
                      isAnswered && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                      isAnswered && !isSelected && !isCorrect && "border-border bg-secondary/25 opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background font-semibold",
                        isAnswered && isCorrect && "bg-primary text-primary-foreground",
                        isAnswered && isSelected && !isCorrect && "bg-destructive text-white",
                      )}
                    >
                      {isAnswered && isCorrect ? <CheckCircle2 className="h-5 w-5" /> : isAnswered && isSelected && !isCorrect ? <XCircle className="h-5 w-5" /> : String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm font-medium sm:text-base">{option}</span>
                  </button>
                )
              })}
            </div>

            {isAnswered && (
              <div className="mt-6 flex justify-end">
                <Button onClick={nextQuestion} className="rounded-md">
                  {currentQuestion + 1 < topic.questions.length ? "Próxima pergunta" : "Ver resultado"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
