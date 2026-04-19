'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import Image from 'next/image'

interface Track {
  id: string
  nameThai: string
  nameEnglish: string
  teacher: string
  duration: string
}

interface NowPlayingScreenProps {
  track: Track
  onClose: () => void
}

export function NowPlayingScreen({ track, onClose }: NowPlayingScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const parseDuration = (duration: string): number => {
    const match = duration.match(/(\d+)/)
    if (match) {
      return parseInt(match[1]) * 60
    }
    return 600
  }

  const totalSeconds = parseDuration(track.duration)

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false)
            return totalSeconds
          }
          return prev + 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, totalSeconds])

  useEffect(() => {
    setProgress((currentTime / totalSeconds) * 100)
  }, [currentTime, totalSeconds])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const skipBack = () => {
    setCurrentTime((prev) => Math.max(0, prev - 15))
  }

  const skipForward = () => {
    setCurrentTime((prev) => Math.min(totalSeconds, prev + 15))
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 bg-rose-400 px-4 py-3">
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors active:scale-95"
          aria-label="Close player"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">Playing</h1>
        <div className="w-8" />
      </div>

      {/* Album Art */}
      <div className="flex flex-1 flex-col items-center px-6 pt-6">
        <div className="relative mb-5 aspect-square w-full max-w-[240px] overflow-hidden rounded-xl bg-gray-200 shadow-lg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-73d6WTMo8djmFuy0RHVpFYVjmvGUzJ.png"
            alt="Buddhist meditation"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Track Info */}
        <div className="mb-5 text-center">
          <h2 className="mb-0.5 text-lg font-semibold text-gray-900">ผู้ชนะสิบทิศ</h2>
          <p className="text-xs text-gray-500">พระอาจารย์ชัยภัส</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-5 w-full max-w-[240px]">
          <div className="mb-1.5 text-left text-xs text-gray-500">
            {formatTime(currentTime)}
          </div>
          <div className="relative h-0.5 w-full rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gray-900 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gray-900"
              style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={skipBack}
            className="flex h-10 w-10 items-center justify-center transition-colors active:scale-95"
            aria-label="Skip back"
          >
            <SkipBack className="h-6 w-6 text-gray-900" strokeWidth={1.5} />
          </button>

          <button
            onClick={togglePlayPause}
            className="flex h-12 w-12 items-center justify-center transition-all active:scale-95"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-10 w-10 text-gray-900" strokeWidth={1.5} />
            ) : (
              <Play className="ml-0.5 h-10 w-10 text-gray-900" strokeWidth={1.5} />
            )}
          </button>

          <button
            onClick={skipForward}
            className="flex h-10 w-10 items-center justify-center transition-colors active:scale-95"
            aria-label="Skip forward"
          >
            <SkipForward className="h-6 w-6 text-gray-900" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  )
}
