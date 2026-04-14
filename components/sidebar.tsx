"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Leaf, 
  PawPrint, 
  Bug, 
  BookOpen, 
  Users, 
  LogOut,
  Trophy,
  ChevronRight
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
  { id: "comunidade", name: "Comunidade (Em Breve)", icon: Users, disabled: true },
]

export function Sidebar({ activeTab, onTabChange, userName, userEmail, bestScore }: SidebarProps) {
  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col min-h-screen">
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
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-muted-foreground">Melhor Score:</span>
          <span className="text-primary font-bold">R$ {bestScore.toFixed(2).replace(".", ",")}</span>
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
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
          {activeTab === "dashboard" && <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>

        {/* Quiz Topics */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
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
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
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
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
            Recursos
          </p>
          <div className="space-y-1">
            {resources.map((resource) => {
              const Icon = resource.icon
              return (
                <button
                  key={resource.id}
                  onClick={() => !resource.disabled && onTabChange(resource.id)}
                  disabled={resource.disabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    resource.disabled && "opacity-50 cursor-not-allowed",
                    activeTab === resource.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                    resource.disabled && "hover:bg-transparent hover:text-muted-foreground"
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
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => onTabChange("logout")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 EcoLearn. Todos os direitos reservados.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Vinícius Rios e Rafael Saldanha
        </p>
      </div>
    </aside>
  )
}
