"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { QuizContent } from "@/components/quiz-content"
import { CoursesContent } from "@/components/courses-content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, LogOut, Menu, X } from "lucide-react"

// Mock user data for prototype
const mockUser = {
  name: "Vinícius Sávio Souza Rios",
  email: "riosvini42@gmail.com"
}

export default function EcoLearn() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [bestScore, setBestScore] = useState(150)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Load saved data from localStorage
    const savedScore = localStorage.getItem("ecolearn_best_score")
    const savedQuizzes = localStorage.getItem("ecolearn_total_quizzes")
    if (savedScore) setBestScore(parseFloat(savedScore))
    if (savedQuizzes) setTotalQuizzes(parseInt(savedQuizzes))
  }, [])

  const handleTabChange = (tab: string) => {
    if (tab === "logout") {
      setShowLogoutModal(true)
    } else {
      setActiveTab(tab)
      setIsMobileMenuOpen(false)
    }
  }

  const handleQuizComplete = (score: number) => {
    setTotalQuizzes(prev => {
      const newTotal = prev + 1
      localStorage.setItem("ecolearn_total_quizzes", newTotal.toString())
      return newTotal
    })
    
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("ecolearn_best_score", score.toString())
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("ecolearn_best_score")
    localStorage.removeItem("ecolearn_total_quizzes")
    window.location.reload()
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardContent
            userName={mockUser.name}
            userEmail={mockUser.email}
            bestScore={bestScore}
            totalQuizzes={totalQuizzes}
            onStartQuiz={handleTabChange}
          />
        )
      case "meio-ambiente":
      case "animais":
      case "dengue":
        return (
          <QuizContent
            topicId={activeTab}
            onComplete={handleQuizComplete}
            onBack={() => setActiveTab("dashboard")}
          />
        )
      case "cursos":
        return <CoursesContent />
      case "comunidade":
        return (
          <div className="flex-1 p-8 flex items-center justify-center">
            <Card className="max-w-md bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Comunidade
                </h2>
                <p className="text-muted-foreground">
                  Esta funcionalidade está em desenvolvimento. Em breve você poderá interagir com outros usuários!
                </p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <DashboardContent
            userName={mockUser.name}
            userEmail={mockUser.email}
            bestScore={bestScore}
            totalQuizzes={totalQuizzes}
            onStartQuiz={handleTabChange}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sidebar rounded-lg border border-sidebar-border"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userName={mockUser.name}
          userEmail={mockUser.email}
          bestScore={bestScore}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen lg:ml-0 overflow-hidden">
        {renderContent()}
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-sm w-full bg-card border-border animate-in fade-in zoom-in duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogOut className="w-5 h-5 text-destructive" />
                Sair da Plataforma
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Tem certeza que deseja sair? Seus dados de progresso serão mantidos.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleLogout}
                >
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
