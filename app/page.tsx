"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { QuizContent } from "@/components/quiz-content"
import { CoursesContent } from "@/components/courses-content"
import { FutureHubContent } from "@/components/future-hub-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Menu, X } from "lucide-react"

const mockUser = {
  name: "Vinícius Rios",
  email: "riosvini42@gmail.com",
}

export default function EcoLearn() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [bestScore, setBestScore] = useState(0)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [totalXp, setTotalXp] = useState(320)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const savedScore = localStorage.getItem("ecolearn_best_score")
    const savedQuizzes = localStorage.getItem("ecolearn_total_quizzes")
    const savedXp = localStorage.getItem("ecolearn_total_xp")

    if (savedScore) setBestScore(Number(savedScore))
    if (savedQuizzes) setTotalQuizzes(Number(savedQuizzes))
    if (savedXp) setTotalXp(Number(savedXp))
  }, [])

  const handleTabChange = (tab: string) => {
    if (tab === "logout") {
      setShowLogoutModal(true)
      return
    }

    setActiveTab(tab)
    setIsMobileMenuOpen(false)
  }

  const handleQuizComplete = (score: number, xpEarned: number) => {
    setTotalQuizzes((current) => {
      const next = current + 1
      localStorage.setItem("ecolearn_total_quizzes", String(next))
      return next
    })

    setTotalXp((current) => {
      const next = current + xpEarned
      localStorage.setItem("ecolearn_total_xp", String(next))
      return next
    })

    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("ecolearn_best_score", String(score))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("ecolearn_best_score")
    localStorage.removeItem("ecolearn_total_quizzes")
    localStorage.removeItem("ecolearn_total_xp")
    window.location.reload()
  }

  const renderContent = () => {
    if (["meio-ambiente", "animais", "dengue"].includes(activeTab)) {
      return (
        <QuizContent
          topicId={activeTab}
          onComplete={handleQuizComplete}
          onBack={() => setActiveTab("dashboard")}
        />
      )
    }

    if (activeTab === "cursos") {
      return <CoursesContent />
    }

    if (["ranking", "comunidade", "campanhas", "impacto", "perfil"].includes(activeTab)) {
      return <FutureHubContent activeView={activeTab} />
    }

    return (
      <DashboardContent
        userName={mockUser.name}
        userEmail={mockUser.email}
        bestScore={bestScore}
        totalQuizzes={totalQuizzes}
        totalXp={totalXp}
        onNavigate={handleTabChange}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <button
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/90 shadow-lg backdrop-blur lg:hidden"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        aria-label="Alternar menu"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isMobileMenuOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 lg:fixed ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userName={mockUser.name}
          userEmail={mockUser.email}
          bestScore={bestScore}
          totalXp={totalXp}
        />
      </div>

      <main className="min-h-screen overflow-hidden lg:pl-72">{renderContent()}</main>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-sm border-border bg-card shadow-2xl animate-in fade-in zoom-in duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5 text-destructive" />
                Sair da Ecolearn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Você voltará para o estado inicial deste protótipo. O MVP ainda usa dados locais no navegador.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowLogoutModal(false)}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Sair
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
