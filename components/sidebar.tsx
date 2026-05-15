"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import {
  BarChart3,
  BookOpen,
  Building2,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Leaf,
  LogOut,
  Moon,
  PawPrint,
  QrCode,
  Sun,
  Trophy,
  UserRound,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userName: string
  userEmail: string
  bestScore: number
  totalXp: number
}

const navigation = [
  {
    label: "Principal",
    items: [{ id: "dashboard", name: "Home", icon: LayoutDashboard }],
  },
  {
    label: "Desafios",
    items: [
      { id: "meio-ambiente", name: "Sustentabilidade", icon: Leaf },
      { id: "animais", name: "Biodiversidade", icon: PawPrint },
      { id: "dengue", name: "Saúde ambiental", icon: HeartPulse },
    ],
  },
  {
    label: "Aprender",
    items: [{ id: "cursos", name: "Cursos e vídeos", icon: BookOpen }],
  },
  {
    label: "Futuro",
    items: [
      { id: "ranking", name: "Rankings", icon: Trophy, soon: true },
      { id: "comunidade", name: "Comunidade", icon: Users, soon: true },
      { id: "campanhas", name: "Campanhas", icon: QrCode, soon: true },
      { id: "impacto", name: "Impacto", icon: BarChart3, soon: true },
      { id: "perfil", name: "Perfil", icon: UserRound, soon: true },
    ],
  },
]

export function Sidebar({ activeTab, onTabChange, userName, userEmail, bestScore, totalXp }: SidebarProps) {
  const { theme, setTheme } = useTheme()
  const xpProgress = Math.min(Math.round((totalXp / 600) * 100), 100)

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-border bg-sidebar/95 text-sidebar-foreground shadow-2xl backdrop-blur-xl">
      <div className="border-b border-sidebar-border p-5">
        <button type="button" onClick={() => onTabChange("dashboard")} className="flex w-full items-center gap-3 text-left">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white">
            <Image src="/images/ecolearn-logo.png" alt="Ecolearn" width={42} height={42} className="object-contain" priority />
          </div>
          <div>
            <p className="text-lg font-semibold">Ecolearn</p>
            <p className="text-xs text-sidebar-foreground/60">Sustainability OS</p>
          </div>
        </button>
      </div>

      <div className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{userName}</p>
            <p className="truncate text-xs text-sidebar-foreground/50">{userEmail}</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-sidebar-foreground/60">XP da jornada</span>
            <span className="font-semibold">{totalXp} XP</span>
          </div>
          <Progress value={xpProgress} className="h-2" />
          <div className="mt-3 flex items-center justify-between text-xs text-sidebar-foreground/60">
            <span>Melhor quiz</span>
            <span className="font-semibold text-primary">{bestScore}%</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto p-4">
        {navigation.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/40">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="min-w-0 flex-1 truncate text-left">{item.name}</span>
                    {"soon" in item && item.soon && (
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] uppercase", isActive ? "bg-white/20" : "bg-primary/10 text-primary")}>
                        soon
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs text-sidebar-foreground/60">
            <Building2 className="h-4 w-4 text-primary" />
            <span>Pronto para parceiros</span>
          </div>
          <p className="text-xs leading-5 text-sidebar-foreground/50">Cursos patrocinados, campanhas e rankings entram em fases futuras.</p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Button
            variant="outline"
            className="justify-start bg-transparent"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Tema
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent text-destructive hover:text-destructive" onClick={() => onTabChange("logout")} aria-label="Sair">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
