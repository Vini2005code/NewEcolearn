"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { AlertCircle, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  className?: string
  onPlay?: () => void
}

type PlayerState = "idle" | "loading" | "ready" | "error"

export function VideoPlayer({ src, poster, title, className, onPlay }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playerState, setPlayerState] = useState<PlayerState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  // Lazy load: only load video when it becomes visible
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleCanPlay = useCallback(() => {
    setPlayerState("ready")
  }, [])

  const handleWaiting = useCallback(() => {
    setPlayerState("loading")
  }, [])

  const handlePlaying = useCallback(() => {
    setPlayerState("ready")
  }, [])

  const handleLoadStart = useCallback(() => {
    setPlayerState("loading")
  }, [])

  const handleError = useCallback(() => {
    const video = videoRef.current
    let msg = "Erro ao carregar o vídeo. Tente novamente."
    if (video?.error) {
      switch (video.error.code) {
        case MediaError.MEDIA_ERR_NETWORK:
          msg = "Erro de rede. Verifique sua conexão e tente novamente."
          break
        case MediaError.MEDIA_ERR_DECODE:
          msg = "O vídeo não pôde ser decodificado. Formato não suportado."
          break
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          msg = "Formato de vídeo não suportado neste navegador."
          break
      }
    }
    setErrorMessage(msg)
    setPlayerState("error")
    console.error("[v0] VideoPlayer error:", video?.error)
  }, [])

  const handleRetry = () => {
    const video = videoRef.current
    if (!video) return
    setPlayerState("loading")
    setErrorMessage("")
    video.load()
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full aspect-video bg-black overflow-hidden rounded-t-lg", className)}
      aria-label={title ? `Player de vídeo: ${title}` : "Player de vídeo"}
    >
      {/* Loading spinner */}
      {playerState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 pointer-events-none">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {/* Error state */}
      {playerState === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 gap-4 p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <p className="text-white text-sm max-w-xs">{errorMessage}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="bg-transparent border-white text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Video element — only rendered when visible (lazy load) */}
      {isVisible && (
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={poster}
          className="w-full h-full"
          aria-label={title || "Vídeo educativo"}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onPlay={onPlay}
          onError={handleError}
        >
          <source src={src} type="video/mp4" />
          {/* WebM fallback — same file path but .webm extension if available */}
          <source src={src.replace(/\.mp4$/i, ".webm")} type="video/webm" />
          <p className="text-white text-sm p-4">
            Seu navegador não suporta vídeos HTML5.{" "}
            <a href={src} download className="underline">
              Baixe o vídeo aqui.
            </a>
          </p>
        </video>
      )}

      {/* Idle placeholder before visibility */}
      {!isVisible && (
        <div className="absolute inset-0 flex items-center justify-center">
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={title || "Thumbnail do vídeo"} className="w-full h-full object-cover" />
          ) : (
            <Loader2 className="w-8 h-8 text-white/40 animate-spin" />
          )}
        </div>
      )}
    </div>
  )
}
