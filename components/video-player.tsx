"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AlertCircle, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  className?: string
}

type PlayerState = "idle" | "loading" | "ready" | "error"

export function VideoPlayer({ src, poster, title, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playerState, setPlayerState] = useState<PlayerState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)

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
      { threshold: 0.1 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleError = useCallback(() => {
    const video = videoRef.current
    let message = "Erro ao carregar o vídeo. Tente novamente."

    if (video?.error) {
      if (video.error.code === MediaError.MEDIA_ERR_NETWORK) {
        message = "Erro de rede. Verifique a conexão e tente novamente."
      }

      if (video.error.code === MediaError.MEDIA_ERR_DECODE) {
        message = "O vídeo não pôde ser decodificado neste navegador."
      }

      if (video.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        message = "Formato de vídeo não suportado neste navegador."
      }
    }

    setErrorMessage(message)
    setPlayerState("error")
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
      className={cn("relative aspect-video w-full overflow-hidden bg-black", className)}
      aria-label={title ? `Player de vídeo: ${title}` : "Player de vídeo educativo"}
    >
      {playerState === "loading" && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/55">
          <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
      )}

      {playerState === "error" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/85 p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-300" />
          <p className="max-w-xs text-sm text-white">{errorMessage}</p>
          <Button variant="outline" size="sm" className="border-white bg-transparent text-white hover:bg-white/10" onClick={handleRetry}>
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      )}

      {isVisible && (
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={poster}
          className="h-full w-full"
          aria-label={title || "Vídeo educativo"}
          onLoadStart={() => setPlayerState("loading")}
          onCanPlay={() => setPlayerState("ready")}
          onWaiting={() => setPlayerState("loading")}
          onPlaying={() => setPlayerState("ready")}
          onError={handleError}
        >
          <source src={src} type="video/mp4" />
          <source src={src.replace(/\.mp4$/i, ".webm")} type="video/webm" />
          <a href={src} download>
            Baixar vídeo
          </a>
        </video>
      )}

      {!isVisible && (
        <div className="absolute inset-0 flex items-center justify-center">
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={title || "Thumbnail do vídeo"} className="h-full w-full object-cover" />
          ) : (
            <Loader2 className="h-8 w-8 animate-spin text-white/50" />
          )}
        </div>
      )}
    </div>
  )
}
