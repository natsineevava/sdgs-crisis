'use client'

import { ChevronLeft, Play } from 'lucide-react'
import Image from 'next/image'
import type { DhammaRecommendation } from '@/lib/store'

interface Track {
  id: string
  nameThai: string
  nameEnglish: string
  teacher: string
  duration: string
  imageUrl?: string
  color: string
}

const defaultTracks: Track[] = [
  {
    id: '1',
    nameThai: 'Moment Apart',
    nameEnglish: 'ODESZA',
    teacher: 'ODESZA',
    duration: '15 นาที',
    color: 'bg-orange-400',
  },
  {
    id: '2',
    nameThai: 'Moment Apart',
    nameEnglish: 'ODESZA',
    teacher: 'ODESZA',
    duration: '20 นาที',
    color: 'bg-amber-400',
  },
  {
    id: '3',
    nameThai: 'Moment Apart',
    nameEnglish: 'ODESZA',
    teacher: 'ODESZA',
    duration: '10 นาที',
    color: 'bg-emerald-500',
  },
  {
    id: '4',
    nameThai: 'Moment Apart',
    nameEnglish: 'ODESZA',
    teacher: 'ODESZA',
    duration: '12 นาที',
    color: 'bg-violet-400',
  },
  {
    id: '5',
    nameThai: 'Moment Apart',
    nameEnglish: 'ODESZA',
    teacher: 'ODESZA',
    duration: '18 นาที',
    color: 'bg-rose-400',
  },
]

interface PodcastScreenProps {
  onBack: () => void
  onPlay: (track: Track) => void
  onSelectAlbum: (track: Track) => void
  recommendedTrack?: DhammaRecommendation | null
}

export function PodcastScreen({
  onBack,
  onPlay,
  onSelectAlbum,
  recommendedTrack,
}: PodcastScreenProps) {
  const tracks = recommendedTrack
    ? [
        {
          id: 'recommended',
          nameThai: recommendedTrack.nameThai,
          nameEnglish: recommendedTrack.name,
          teacher: recommendedTrack.teacher,
          duration: recommendedTrack.duration,
          color: 'bg-emerald-500',
        },
        ...defaultTracks.slice(0, 4),
      ]
    : defaultTracks

  return (
    <div className="flex min-h-screen flex-col bg-emerald-600">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">Albums</h1>
        <div className="w-8" />
      </div>

      {/* Track List */}
      <div className="flex-1 px-4 pb-4 pt-1">
        <div className="space-y-2.5">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => onSelectAlbum(track)}
              className={`flex w-full items-center gap-3 rounded-xl ${track.color} p-2.5 text-left transition-all active:scale-[0.99]`}
            >
              {/* Album Art */}
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-73d6WTMo8djmFuy0RHVpFYVjmvGUzJ.png"
                  alt="Album art"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{track.nameThai}</p>
                <p className="text-xs text-white/80 truncate">{track.teacher}</p>
              </div>
              {/* Play Button */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Play className="h-4 w-4 text-white" fill="white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
