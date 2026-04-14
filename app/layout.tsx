import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'EcoLearn - Plataforma de Aprendizado Sustentável',
  description: 'Aprenda sobre sustentabilidade e meio ambiente de forma interativa com quizzes e cursos',
  generator: 'EcoLearn',
  icons: {
    icon: '/images/ecolearn-logo.png',
    apple: '/images/ecolearn-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
