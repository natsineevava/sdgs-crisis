'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import type { CheckInResult } from '@/lib/store'

const quotes = [
  { thai: 'จิตที่ฝึกดีแล้ว นำความสุขมาให้', author: 'พระพุทธเจ้า' },
  { thai: 'ความสงบเป็นสุขอย่างยิ่ง', author: 'พระพุทธเจ้า' },
  { thai: 'ชนะตนเองประเสริฐกว่าชนะผู้อื่น', author: 'พระพุทธเจ้า' },
  { thai: 'ความอดทนเป็นตบะอย่างยิ่ง', author: 'พระพุทธเจ้า' },
  { thai: 'ทำวันนี้ให้ดีที่สุด', author: 'หลวงพ่อชา' },
  { thai: 'ปล่อยวางคือความสุข', author: 'พระไพศาล วิสาโล' },
  { thai: 'ทุกอย่างเกิดขึ้น ตั้งอยู่ ดับไป', author: 'พระพุทธเจ้า' },
]

const suggestedPodcasts = [
  { id: '1', nameThai: 'ปล่อยวางใจ', teacher: 'หลวงพ่อชา', image: '/images/dhamma-1.jpg' },
  { id: '2', nameThai: 'สมาธิเบื้องต้น', teacher: 'พระอาจารย์มหาบุญมี', image: '/images/dhamma-2.jpg' },
  { id: '3', nameThai: 'ธรรมะก่อนนอน', teacher: 'ท่าน ว.วชิรเมธี', image: '/images/dhamma-3.jpg' },
]

interface ResultsScreenProps {
  result: CheckInResult
  focusMinutes: number
  onHome: () => void
  onPodcast?: () => void
}

export function ResultsScreen({
  focusMinutes,
  onHome,
  onPodcast,
}: ResultsScreenProps) {
  // Get random quote based on date
  const todayIndex = new Date().getDate() % quotes.length
  const todayQuote = quotes[todayIndex]
  const suggestedPodcast = suggestedPodcasts[todayIndex % suggestedPodcasts.length]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-center px-5 py-4">
        <span className="text-xl font-bold text-gray-900">สรุปผล</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center px-6 pb-6">
        {/* Focus Time Message */}
        <div className="mb-4 text-center w-full">
          <p className="text-lg text-gray-900">
            วันนี้คุณได้มีสติ
          </p>
          <p className="text-lg text-gray-900">
            เป็นเวลา <span className="font-bold text-amber-600">{focusMinutes} นาที</span>
          </p>
        </div>

        {/* Golden Bodhi Tree */}
        <div className="mb-4 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="h-44 w-44">
            {/* Trunk */}
            <defs>
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8860B" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
              <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#DAA520" />
              </linearGradient>
            </defs>
            
            {/* Main trunk */}
            <path d="M95 200 L95 130 Q100 120 100 110 Q100 120 105 130 L105 200" fill="url(#trunkGradient)" />
            
            {/* Branch structure - symmetrical spreading branches */}
            {/* Center branch */}
            <path d="M100 110 L100 50" stroke="url(#trunkGradient)" strokeWidth="3" fill="none" />
            
            {/* Level 1 branches */}
            <path d="M100 100 Q85 95 70 85" stroke="url(#trunkGradient)" strokeWidth="2.5" fill="none" />
            <path d="M100 100 Q115 95 130 85" stroke="url(#trunkGradient)" strokeWidth="2.5" fill="none" />
            
            {/* Level 2 branches */}
            <path d="M100 85 Q80 80 55 70" stroke="url(#trunkGradient)" strokeWidth="2" fill="none" />
            <path d="M100 85 Q120 80 145 70" stroke="url(#trunkGradient)" strokeWidth="2" fill="none" />
            
            {/* Level 3 branches */}
            <path d="M100 70 Q75 65 45 58" stroke="url(#trunkGradient)" strokeWidth="1.5" fill="none" />
            <path d="M100 70 Q125 65 155 58" stroke="url(#trunkGradient)" strokeWidth="1.5" fill="none" />
            
            {/* Level 4 branches - widest */}
            <path d="M100 60 Q70 55 35 55" stroke="url(#trunkGradient)" strokeWidth="1.5" fill="none" />
            <path d="M100 60 Q130 55 165 55" stroke="url(#trunkGradient)" strokeWidth="1.5" fill="none" />
            
            {/* Heart-shaped Bodhi leaves - spread around the tree */}
            {/* Top leaves */}
            <path d="M100 35 C100 30 95 25 100 20 C105 25 100 30 100 35" fill="url(#leafGradient)" />
            <path d="M92 40 C92 35 87 30 92 25 C97 30 92 35 92 40" fill="url(#leafGradient)" />
            <path d="M108 40 C108 35 103 30 108 25 C113 30 108 35 108 40" fill="url(#leafGradient)" />
            
            {/* Second row */}
            <path d="M80 50 C80 45 75 40 80 35 C85 40 80 45 80 50" fill="url(#leafGradient)" />
            <path d="M120 50 C120 45 115 40 120 35 C125 40 120 45 120 50" fill="url(#leafGradient)" />
            <path d="M100 55 C100 50 95 45 100 40 C105 45 100 50 100 55" fill="url(#leafGradient)" />
            
            {/* Third row - wider */}
            <path d="M65 60 C65 55 60 50 65 45 C70 50 65 55 65 60" fill="url(#leafGradient)" />
            <path d="M135 60 C135 55 130 50 135 45 C140 50 135 55 135 60" fill="url(#leafGradient)" />
            <path d="M85 58 C85 53 80 48 85 43 C90 48 85 53 85 58" fill="url(#leafGradient)" />
            <path d="M115 58 C115 53 110 48 115 43 C120 48 115 53 115 58" fill="url(#leafGradient)" />
            
            {/* Fourth row - widest spread */}
            <path d="M50 65 C50 60 45 55 50 50 C55 55 50 60 50 65" fill="url(#leafGradient)" />
            <path d="M150 65 C150 60 145 55 150 50 C155 55 150 60 150 65" fill="url(#leafGradient)" />
            <path d="M70 68 C70 63 65 58 70 53 C75 58 70 63 70 68" fill="url(#leafGradient)" />
            <path d="M130 68 C130 63 125 58 130 53 C135 58 130 63 130 68" fill="url(#leafGradient)" />
            <path d="M100 70 C100 65 95 60 100 55 C105 60 100 65 100 70" fill="url(#leafGradient)" />
            
            {/* Fifth row */}
            <path d="M40 75 C40 70 35 65 40 60 C45 65 40 70 40 75" fill="url(#leafGradient)" />
            <path d="M160 75 C160 70 155 65 160 60 C165 65 160 70 160 75" fill="url(#leafGradient)" />
            <path d="M55 78 C55 73 50 68 55 63 C60 68 55 73 55 78" fill="url(#leafGradient)" />
            <path d="M145 78 C145 73 140 68 145 63 C150 68 145 73 145 78" fill="url(#leafGradient)" />
            <path d="M80 80 C80 75 75 70 80 65 C85 70 80 75 80 80" fill="url(#leafGradient)" />
            <path d="M120 80 C120 75 115 70 120 65 C125 70 120 75 120 80" fill="url(#leafGradient)" />
            
            {/* Sixth row - lower spreading */}
            <path d="M35 88 C35 83 30 78 35 73 C40 78 35 83 35 88" fill="url(#leafGradient)" />
            <path d="M165 88 C165 83 160 78 165 73 C170 78 165 83 165 88" fill="url(#leafGradient)" />
            <path d="M60 90 C60 85 55 80 60 75 C65 80 60 85 60 90" fill="url(#leafGradient)" />
            <path d="M140 90 C140 85 135 80 140 75 C145 80 140 85 140 90" fill="url(#leafGradient)" />
            <path d="M90 92 C90 87 85 82 90 77 C95 82 90 87 90 92" fill="url(#leafGradient)" />
            <path d="M110 92 C110 87 105 82 110 77 C115 82 110 87 110 92" fill="url(#leafGradient)" />
            
            {/* Bottom row leaves */}
            <path d="M45 100 C45 95 40 90 45 85 C50 90 45 95 45 100" fill="url(#leafGradient)" />
            <path d="M155 100 C155 95 150 90 155 85 C160 90 155 95 155 100" fill="url(#leafGradient)" />
            <path d="M75 102 C75 97 70 92 75 87 C80 92 75 97 75 102" fill="url(#leafGradient)" />
            <path d="M125 102 C125 97 120 92 125 87 C130 92 125 97 125 102" fill="url(#leafGradient)" />
          </svg>
        </div>

        {/* Quote of the Day */}
        <div className="mb-5 w-full rounded-2xl bg-amber-50 p-4 text-center">
          <p className="mb-1 text-xs font-medium text-amber-700">คำคมประจำวัน</p>
          <p className="mb-2 text-lg font-semibold text-gray-900 leading-relaxed">
            &ldquo;{todayQuote.thai}&rdquo;
          </p>
          <p className="text-sm text-amber-600">- {todayQuote.author}</p>
        </div>

        {/* Podcast Suggestion */}
        <div className="mb-5 w-full">
          <p className="mb-3 text-sm font-medium text-gray-600">แนะนำสำหรับคุณ</p>
          <button
            onClick={onPodcast}
            className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 p-4 text-left shadow-md transition-all active:scale-[0.98]"
          >
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={suggestedPodcast.image}
                alt={suggestedPodcast.nameThai}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-white">{suggestedPodcast.nameThai}</p>
              <p className="text-sm text-white/80">{suggestedPodcast.teacher}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </button>
        </div>

        {/* Home Button */}
        <button
          onClick={onHome}
          className="w-full rounded-2xl bg-amber-500 py-5 text-center text-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] active:bg-amber-600"
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  )
}
