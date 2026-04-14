"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { quizTopics, calculateScore, type QuizTopic } from "@/lib/quiz-data"
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Clock, Play } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface QuizContentProps {
  topicId: string
  onComplete: (score: number) => void
  onBack: () => void
}

type QuizState = "intro" | "video" | "playing" | "result"

export function QuizContent({ topicId, onComplete, onBack }: QuizContentProps) {
  const [quizState, setQuizState] = useState<QuizState>("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isTimerActive, setIsTimerActive] = useState(false)

  const topic = quizTopics.find(t => t.id === topicId) as QuizTopic
  const question = topic?.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / topic?.questions.length) * 100

  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1)
    }
  }, [timeLeft, isTimerActive, isAnswered])

  const goToVideo = () => {
    setQuizState("video")
  }

  const startQuiz = () => {
    setQuizState("playing")
    setIsTimerActive(true)
    setTimeLeft(30)
  }

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return
    
    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    setIsTimerActive(false)
    
    if (answerIndex === question.correct) {
      setCorrectAnswers(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 < topic.questions.length) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setTimeLeft(30)
      setIsTimerActive(true)
    } else {
      const finalScore = calculateScore(correctAnswers, topic.questions.length)
      onComplete(finalScore)
      setQuizState("result")
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setCorrectAnswers(0)
    setTimeLeft(30)
    setQuizState("video")
    setIsTimerActive(false)
  }

  if (!topic) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Tópico não encontrado</p>
      </div>
    )
  }

  // Intro Screen
  if (quizState === "intro") {
    return (
      <div className="flex-1 p-8 overflow-y-auto">
        <Card className="max-w-2xl mx-auto bg-card border-border overflow-hidden">
          <div className="relative h-56">
            <Image
              src={topic.image || "/placeholder.svg"}
              alt={topic.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{topic.icon}</span>
                <h1 className="text-3xl font-bold text-white">{topic.name}</h1>
              </div>
              <p className="text-white/80">{topic.description}</p>
            </div>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{topic.questions.length}</p>
                <p className="text-sm text-muted-foreground">Perguntas</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">30s</p>
                <p className="text-sm text-muted-foreground">Por pergunta</p>
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Regras do Quiz</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Você tem 30 segundos para responder cada pergunta</li>
                <li>• Cada resposta correta aumenta sua pontuação</li>
                <li>• Não é possível voltar para perguntas anteriores</li>
                <li>• Seu melhor score será salvo automaticamente</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={onBack}
              >
                Voltar
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-primary text-primary hover:bg-primary/10"
                onClick={goToVideo}
              >
                <Play className="w-4 h-4 mr-2" />
                Ver Vídeo
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={startQuiz}
              >
                Começar Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Video Screen
  if (quizState === "video") {
    return (
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Aprenda sobre Reciclagem</h2>
              <p className="text-muted-foreground text-sm">Assista ao vídeo antes de responder o quiz!</p>
            </div>
          </div>

          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black">
                <video
                  controls
                  className="w-full h-full"
                  poster="/images/meio-ambiente.jpg"
                >
                  <source src="/images/video-onu.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  A Odisseia de uma Garrafa — ONU Meio Ambiente
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Acompanhe a jornada de uma garrafa plástica e entenda o impacto do plástico nos oceanos.
                  Este vídeo educativo da ONU Brasil mostra a importância da reciclagem e do consumo consciente.
                  Após assistir, você estará pronto para o quiz!
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => setQuizState("intro")}
            >
              Voltar
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={startQuiz}
            >
              Já assisti — Começar Quiz
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Result Screen
  if (quizState === "result") {
    const finalScore = calculateScore(correctAnswers, topic.questions.length)
    const percentage = Math.round((correctAnswers / topic.questions.length) * 100)
    
    return (
      <div className="flex-1 p-8 overflow-y-auto">
        <Card className="max-w-2xl mx-auto bg-card border-border">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Quiz Finalizado!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-primary mb-2">
                R$ {finalScore.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-muted-foreground">Sua pontuação neste quiz</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-500">{correctAnswers}</p>
                <p className="text-sm text-muted-foreground">Acertos</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-red-500">{topic.questions.length - correctAnswers}</p>
                <p className="text-sm text-muted-foreground">Erros</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Desempenho</span>
                <span className="font-medium text-foreground">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={onBack}
              >
                Voltar ao Dashboard
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={restartQuiz}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Playing Screen
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Pergunta {currentQuestion + 1} de {topic.questions.length}
            </span>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full",
              timeLeft <= 10 ? "bg-red-500/20 text-red-500" : "bg-secondary text-muted-foreground"
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-medium">{timeLeft}s</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-card border-border overflow-hidden">
          {/* Question Image */}
          <div className="relative w-full h-52 overflow-hidden">
            <Image
              key={question.image}
              src={question.image}
              alt={`Ilustração para: ${question.question}`}
              fill
              className="object-cover transition-opacity duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
          </div>
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correct
              const showResult = isAnswered
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-3",
                    !isAnswered && "hover:border-primary hover:bg-primary/5 cursor-pointer",
                    !isAnswered && "border-border bg-secondary/30",
                    isAnswered && isCorrect && "border-green-500 bg-green-500/10",
                    isAnswered && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                    isAnswered && !isSelected && !isCorrect && "border-border bg-secondary/30 opacity-50"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0",
                    !isAnswered && "bg-secondary text-muted-foreground",
                    isAnswered && isCorrect && "bg-green-500 text-white",
                    isAnswered && isSelected && !isCorrect && "bg-red-500 text-white",
                    isAnswered && !isSelected && !isCorrect && "bg-secondary text-muted-foreground"
                  )}>
                    {showResult && isCorrect ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : showResult && isSelected && !isCorrect ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={cn(
                    "flex-1",
                    isAnswered && isCorrect && "text-green-500 font-medium",
                    isAnswered && isSelected && !isCorrect && "text-red-500"
                  )}>
                    {option}
                  </span>
                </button>
              )
            })}

            {isAnswered && (
              <div className="pt-4 flex justify-end">
                <Button
                  onClick={nextQuestion}
                  className="bg-primary hover:bg-primary/90"
                >
                  {currentQuestion + 1 < topic.questions.length ? (
                    <>
                      Próxima Pergunta
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    "Ver Resultado"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Score Preview */}
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Acertos: {correctAnswers}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>Erros: {currentQuestion - correctAnswers + (isAnswered && selectedAnswer !== question.correct ? 1 : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
