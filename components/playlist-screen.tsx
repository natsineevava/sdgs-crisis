'use client'

import { ChevronLeft, Play } from 'lucide-react'
import Image from 'next/image'

interface Track {
  id: string
  nameThai: string
  nameEnglish: string
  teacher: string
  duration: string
  imageUrl?: string
  color?: string
  audioUrl?: string
}

interface Episode {
  id: string
  title: string
  artist: string
  imageUrl: string
  audioUrl: string
  duration: string
}

const episodes: Episode[] = [
  {
    id: '1',
    title: 'กายคตาสติ',
    artist: 'หลวงปู่ปราโมทย์',
    imageUrl: '/images/dhamma-1.jpg',
    audioUrl: '/audio/กายคตาสติ - หลวงปู่ปราโมทย์.mp3',
    duration: '15 นาที',
  },
  {
    id: '2',
    title: 'บทสวดตอนเช้า',
    artist: 'บทสวดมนต์',
    imageUrl: '/images/dhamma-2.jpg',
    audioUrl: '/audio/บทสวดตอนเช้า.mp3',
    duration: '10 นาที',
  },
  {
    id: '3',
    title: 'อานาปานสติ',
    artist: 'หลวงพ่อชา',
    imageUrl: '/images/dhamma-3.jpg',
    audioUrl: '/audio/อานาปานสติ - หลวงพ่อชา.mp3',
    duration: '18 นาที',
  },
  {
    id: '4',
    title: 'เจริญเมตตาภาวนา',
    artist: 'พระไพศาล',
    imageUrl: '/images/dhamma-4.jpg',
    audioUrl: '/audio/เจริญเมตตาภาวนา - พระไพศาล.mp3',
    duration: '12 นาที',
  },
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
      <div className="flex items-center gap-4 bg-rose-400 px-5 py-4">
        <button
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 transition-colors active:scale-95"
          aria-label="กลับ"
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-bold text-white">รายการ</h1>
        <div className="w-12" />
      </div>

      {/* Featured Album Card */}
      <div className="bg-rose-400 px-5 pb-6">
        <div className="flex items-center gap-4 rounded-2xl bg-rose-300/80 p-4 shadow-lg">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-800 shadow-md">
            <Image
              src={album.imageUrl || '/images/dhamma-1.jpg'}
              alt={album.nameThai}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold text-white truncate">{album.nameThai}</p>
            <p className="text-sm text-white/90">{album.teacher}</p>
          </div>
        </div>
      </div>

      {/* Episode List */}
      <div className="flex-1 px-5 py-5">
        <div className="space-y-4">
          {episodes.map((episode) => (
            <button
              key={episode.id}
              onClick={() =>
                onPlay({
                  ...album,
                  id: episode.id,
                  nameThai: episode.title,
                  teacher: episode.artist,
                  duration: episode.duration,
                  imageUrl: episode.imageUrl,
                  audioUrl: episode.audioUrl,
                })
              }
              className="flex w-full items-center gap-4 rounded-2xl bg-gray-50 p-4 text-left shadow-sm transition-all active:scale-[0.98]"
              style={{ minHeight: '80px' }}
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gray-200 shadow-sm">
                <Image
                  src={episode.imageUrl}
                  alt={episode.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-gray-900 truncate">{episode.title}</p>
                <p className="text-sm text-gray-500">{episode.artist}</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                <Play className="h-5 w-5 text-gray-600" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
