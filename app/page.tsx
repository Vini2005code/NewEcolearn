"use client"

import { useEffect, useRef, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { QuizContent } from "@/components/quiz-content"
import { CoursesContent } from "@/components/courses-content"
import { FutureHubContent } from "@/components/future-hub-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Menu, X, Loader2 } from "lucide-react"
import { api } from "@/lib/api-client"
import type { Profile } from "@/lib/contracts"
import { getTopicById } from "@/lib/quiz-data"
import { ProfileContent } from "@/components/profile-content"

const mockUser = {
  name: "Estudante Ecolearn",
  email: "Jornada neste navegador",
}

export default function EcoLearn() {
  const initialized = useRef(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [bestScore, setBestScore] = useState(0)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [totalXp, setTotalXp] = useState(0)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [paused, setPaused] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const syncProfile = (next: Profile) => {
    setProfile(next)
    setBestScore(next.bestScore)
    setTotalQuizzes(next.totalQuizzes)
    setTotalXp(next.totalXp)
  }

  const loadProfile = async () => {
    setLoading(true)
    setLoadError("")
    try {
      let next = await api<Profile>("/profile")
      if (!next.migrated) {
        const saved = (key: string, max: number) => {
          try {
            const value = Number(localStorage.getItem(key) ?? 0)
            return Number.isFinite(value) ? Math.max(0, Math.min(max, Math.floor(value))) : 0
          } catch { return 0 }
        }
        next = await api<Profile>("/progress/migrate", {
          bestScore: saved("ecolearn_best_score", 100),
          totalQuizzes: saved("ecolearn_total_quizzes", 1_000_000),
          totalXp: saved("ecolearn_total_xp", 100_000_000),
        })
      }
      syncProfile(next)
    } catch (error) { setLoadError((error as Error).message) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (!initialized.current) { initialized.current = true; void loadProfile() } }, [])

  const handleTabChange = (tab: string) => {
    if (tab === "logout") {
      setShowLogoutModal(true)
      return
    }

    setActiveTab(tab)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    setShowLogoutModal(false)
    setIsMobileMenuOpen(false)
    setPaused(true)
  }

  const renderContent = () => {
    if (getTopicById(activeTab)) {
      return (
        <QuizContent
          key={activeTab}
          topicId={activeTab}
          onComplete={syncProfile}
          onBack={() => setActiveTab("dashboard")}
        />
      )
    }

    if (activeTab === "cursos") {
      return <CoursesContent profile={profile!} onProgress={syncProfile} />
    }

    if (activeTab === "perfil") return <ProfileContent profile={profile!} />

    if (["ranking", "comunidade", "campanhas", "impacto"].includes(activeTab)) {
      return <FutureHubContent key={activeTab} activeView={activeTab} />
    }

    return (
      <DashboardContent
        userName={profile?.name ?? mockUser.name}
        userEmail={mockUser.email}
        bestScore={bestScore}
        totalQuizzes={totalQuizzes}
        totalXp={totalXp}
        onNavigate={handleTabChange}
      />
    )
  }

  if (loading || loadError || paused) return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md"><CardContent className="space-y-5 p-8 text-center">
        <h1 className="text-2xl font-semibold">Ecolearn</h1>
        {loading ? <p role="status" className="flex items-center justify-center gap-2"><Loader2 className="h-5 w-5 animate-spin" />Carregando sua jornada…</p> : loadError ? <><p role="alert">{loadError}</p><Button onClick={loadProfile}>Tentar novamente</Button></> : <><p>Jornada pausada. Seu progresso está salvo neste navegador.</p><Button onClick={() => { setPaused(false); setActiveTab("dashboard") }}>Continuar jornada</Button></>}
      </CardContent></Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <button
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/90 shadow-lg backdrop-blur lg:hidden"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        aria-label="Alternar menu"
        aria-expanded={isMobileMenuOpen}
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
          userName={profile?.name ?? mockUser.name}
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
                Pausar jornada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Seu progresso será mantido. Você pode retomar sua jornada neste navegador quando quiser.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowLogoutModal(false)}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Pausar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
