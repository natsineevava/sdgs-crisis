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
  imageUrl?: string
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
      <div className="flex items-center gap-4 bg-rose-400 px-5 py-4">
        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 transition-colors active:scale-95"
          aria-label="ปิด"
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-bold text-white">กำลังเล่น</h1>
        <div className="w-12" />
      </div>

      {/* Album Art */}
      <div className="flex flex-1 flex-col items-center px-8 pt-8">
        <div className="relative mb-6 aspect-square w-full max-w-[280px] overflow-hidden rounded-3xl bg-gray-200 shadow-2xl">
          <Image
            src={track.imageUrl || '/images/dhamma-1.jpg'}
            alt={track.nameThai}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Track Info */}
        <div className="mb-6 text-center">
          <h2 className="mb-1 text-2xl font-bold text-gray-900">{track.nameThai}</h2>
          <p className="text-base text-gray-500">{track.teacher}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 w-full max-w-[280px]">
          <div className="mb-2 text-left text-sm text-gray-500">
            {formatTime(currentTime)}
          </div>
          <div className="relative h-2 w-full rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-rose-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-rose-400 shadow-lg"
              style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>
        </div>

        {/* Controls - Large Buttons */}
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={skipBack}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 shadow-lg transition-all active:scale-95"
            aria-label="ย้อนกลับ"
          >
            <SkipBack className="h-8 w-8 text-gray-700" strokeWidth={2} />
          </button>

          <button
            onClick={togglePlayPause}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-400 shadow-xl transition-all active:scale-95"
            aria-label={isPlaying ? 'หยุด' : 'เล่น'}
          >
            {isPlaying ? (
              <Pause className="h-10 w-10 text-white" strokeWidth={2} fill="white" />
            ) : (
              <Play className="ml-1 h-10 w-10 text-white" strokeWidth={2} fill="white" />
            )}
          </button>

          <button
            onClick={skipForward}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 shadow-lg transition-all active:scale-95"
            aria-label="ข้ามไป"
          >
            <SkipForward className="h-8 w-8 text-gray-700" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-10" />
    </div>
  )
}
