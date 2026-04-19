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
  imageUrl: string
  color: string
}

const defaultTracks: Track[] = [
  {
    id: '1',
    nameThai: 'ปล่อยวางใจ',
    nameEnglish: 'Letting Go',
    teacher: 'หลวงพ่อปราโมทย์',
    duration: '15 นาที',
    imageUrl: '/images/dhamma-1.jpg',
    color: 'bg-orange-400',
  },
  {
    id: '2',
    nameThai: 'สมาธิเบื้องต้น',
    nameEnglish: 'Basic Meditation',
    teacher: 'พระอาจารย์ชยสาโร',
    duration: '20 นาที',
    imageUrl: '/images/dhamma-2.jpg',
    color: 'bg-amber-400',
  },
  {
    id: '3',
    nameThai: 'ความสุขที่แท้จริง',
    nameEnglish: 'True Happiness',
    teacher: 'หลวงพ่อจรัญ',
    duration: '10 นาที',
    imageUrl: '/images/dhamma-3.jpg',
    color: 'bg-emerald-500',
  },
  {
    id: '4',
    nameThai: 'อยู่กับปัจจุบัน',
    nameEnglish: 'Living in Present',
    teacher: 'พระไพศาล วิสาโล',
    duration: '12 นาที',
    imageUrl: '/images/dhamma-4.jpg',
    color: 'bg-violet-400',
  },
  {
    id: '5',
    nameThai: 'หายใจอย่างมีสติ',
    nameEnglish: 'Mindful Breathing',
    teacher: 'หลวงปู่ชา',
    duration: '18 นาที',
    imageUrl: '/images/dhamma-5.jpg',
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
          imageUrl: '/images/dhamma-1.jpg',
          color: 'bg-emerald-500',
        },
        ...defaultTracks.slice(0, 4),
      ]
    : defaultTracks

  return (
    <div className="flex min-h-screen flex-col bg-emerald-600">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4">
        <button
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 transition-colors active:scale-95"
          aria-label="กลับ"
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-bold text-white">รายการธรรมะ</h1>
        <div className="w-12" />
      </div>

      {/* Track List */}
      <div className="flex-1 px-5 pb-6 pt-2">
        <div className="space-y-4">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => onSelectAlbum(track)}
              className={`flex w-full items-center gap-4 rounded-2xl ${track.color} p-4 text-left shadow-lg transition-all active:scale-[0.98]`}
              style={{ minHeight: '90px' }}
            >
              {/* Album Art */}
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-800 shadow-md">
                <Image
                  src={track.imageUrl}
                  alt={track.nameThai}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-white truncate">{track.nameThai}</p>
                <p className="text-sm text-white/90 truncate">{track.teacher}</p>
              </div>
              {/* Play Button */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 shadow-md">
                <Play className="h-6 w-6 text-white" fill="white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
