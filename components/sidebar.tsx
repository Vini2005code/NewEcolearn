"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Leaf,
  PawPrint,
  Bug,
  BookOpen,
  LogOut,
  Star,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userName: string
  userEmail: string
  bestScore: number
}

const quizTopics = [
  { id: "meio-ambiente", name: "Meio Ambiente", icon: Leaf },
  { id: "animais", name: "Animais", icon: PawPrint },
  { id: "dengue", name: "Dengue", icon: Bug },
]

const resources = [
  { id: "cursos", name: "Cursos", icon: BookOpen },
]

export function Sidebar({ activeTab, onTabChange, userName, userEmail, bestScore }: SidebarProps) {
  return (
    <aside className="w-72 flex flex-col min-h-screen" style={{
      background: "linear-gradient(180deg, #0d1f0d 0%, #1a3320 50%, #162a1a 100%)"
    }}>
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Image
          src="/images/ecolearn-logo.png"
          alt="EcoLearn Logo"
          width={180}
          height={60}
          className="object-contain"
          priority
        />
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-primary/30 flex items-center justify-center">
            <span className="text-sidebar-primary font-semibold text-lg">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-sidebar-foreground truncate">{userName}</p>
            <p className="text-xs text-sidebar-foreground/50 truncate">{userEmail}</p>
          </div>
        </div>
        {/* Score with tooltip */}
        <div
          className="mt-3 flex items-center gap-2 text-xs group relative cursor-default"
          title="Melhor pontuação de todos os quizzes"
        >
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sidebar-foreground/60">Melhor Score:</span>
          <span className="text-sidebar-primary font-bold">{bestScore} pts</span>
          {/* Tooltip */}
          <span className="absolute left-0 -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Melhor pontuação de todos os quizzes
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Dashboard */}
        <button
          onClick={() => onTabChange("dashboard")}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            activeTab === "dashboard"
              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
          {activeTab === "dashboard" && <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>

        {/* Quiz Topics */}
        <div>
          <p className="text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-wider mb-3 px-4">
            Desafios em Quiz
          </p>
          <div className="space-y-1">
            {quizTopics.map((topic) => {
              const Icon = topic.icon
              return (
                <button
                  key={topic.id}
                  onClick={() => onTabChange(topic.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    activeTab === topic.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{topic.name}</span>
                  {activeTab === topic.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Resources */}
        <div>
          <p className="text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-wider mb-3 px-4">
            Recursos
          </p>
          <div className="space-y-1">
            {resources.map((resource) => {
              const Icon = resource.icon
              return (
                <button
                  key={resource.id}
                  onClick={() => onTabChange(resource.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    activeTab === resource.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{resource.name}</span>
                  {activeTab === resource.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Em Breve banner (replacing Comunidade) */}
        <div className="mx-1 rounded-lg border border-sidebar-border/40 bg-sidebar-accent/40 px-4 py-3">
          <p className="text-xs font-semibold text-sidebar-primary uppercase tracking-wider mb-0.5">Em breve</p>
          <p className="text-xs text-sidebar-foreground/50">Comunidade chegando em breve!</p>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => onTabChange("logout")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="p-4 text-center">
        <p className="text-xs text-sidebar-foreground/30">
          &copy; 2025 EcoLearn. Todos os direitos reservados.
        </p>
        <p className="text-xs text-sidebar-foreground/30 mt-1">
          Vinícius Rios e Rafael Saldanha
        </p>
      </div>
    </aside>
  )
}
