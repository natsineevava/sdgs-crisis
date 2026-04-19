'use client'

import { ChevronLeft, Play } from 'lucide-react'
import Image from 'next/image'

interface Track {
  id: string
  nameThai: string
  nameEnglish: string
  teacher: string
  duration: string
  color?: string
}

interface Episode {
  id: string
  title: string
  artist: string
}

const episodes: Episode[] = [
  { id: '1', title: 'Episode 1', artist: 'ODESZA' },
  { id: '2', title: 'Episode 2 Apart', artist: 'ODESZA' },
  { id: '3', title: 'Episode 3', artist: 'ODESZA' },
]

interface PlaylistScreenProps {
  album: Track
  onBack: () => void
  onPlay: (track: Track) => void
}

export function PlaylistScreen({ album, onBack, onPlay }: PlaylistScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 bg-rose-400 px-4 py-3">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">Playlist</h1>
        <div className="w-8" />
      </div>

      {/* Featured Album Card */}
      <div className="bg-rose-400 px-4 pb-5">
        <div className="flex items-center gap-3 rounded-xl bg-rose-300/80 p-3">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-73d6WTMo8djmFuy0RHVpFYVjmvGUzJ.png"
              alt="Album art"
              fill
              className="object-cover opacity-80"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-white truncate">{album.nameThai}</p>
            <p className="text-xs text-white/80">Episode and more</p>
          </div>
        </div>
      </div>

      {/* Episode List */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-3">
          {episodes.map((episode) => (
            <button
              key={episode.id}
              onClick={() => onPlay({ ...album, id: episode.id, nameThai: episode.title })}
              className="flex w-full items-center gap-3 text-left transition-all active:scale-[0.99]"
            >
              {/* Episode Art */}
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-73d6WTMo8djmFuy0RHVpFYVjmvGUzJ.png"
                  alt="Episode art"
                  fill
                  className="object-cover opacity-70"
                />
              </div>
              {/* Episode Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{episode.title}</p>
                <p className="text-xs text-gray-500">{episode.artist}</p>
              </div>
              {/* Play Button */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                <Play className="h-3.5 w-3.5 text-gray-500" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
