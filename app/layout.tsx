import React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"


export const metadata: Metadata = {
  title: "Ecolearn - Educação ambiental gamificada",
  description: "Plataforma moderna de sustentabilidade, saúde ambiental, comunidade e aprendizado gamificado.",
  generator: "Ecolearn",
  icons: {
    icon: "/images/ecolearn-logo.png",
    apple: "/images/ecolearn-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
