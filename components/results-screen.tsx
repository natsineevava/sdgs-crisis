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

// Growth stages based on focus minutes - representing Bodhi tree growth
const getGrowthStage = (minutes: number) => {
  if (minutes < 5) {
    return {
      stage: 1,
      message: 'วันนี้คุณได้หว่านเมล็ดพันธุ์แล้ว',
      subMessage: 'เมล็ดพันธุ์เล็กๆ รอการเติบโต',
      leaves: 2,
    }
  } else if (minutes < 15) {
    return {
      stage: 2,
      message: 'วันนี้คุณได้รดน้ำพรวนดิน',
      subMessage: 'เมล็ดพันธุ์เล็กๆ กำลังเติบโตแล้ว',
      leaves: 3,
    }
  } else if (minutes < 30) {
    return {
      stage: 3,
      message: 'ต้นโพกำลังแตกใบอ่อน',
      subMessage: 'ใบใหม่ผลิบานสวยงาม',
      leaves: 4,
    }
  } else if (minutes < 60) {
    return {
      stage: 4,
      message: 'ต้นโพเติบโตแข็งแรง',
      subMessage: 'กิ่งก้านเริ่มแผ่ขยาย',
      leaves: 5,
    }
  } else {
    return {
      stage: 5,
      message: 'ต้นโพเติบโตสมบูรณ์',
      subMessage: 'ร่มเงาแห่งปัญญาแผ่กว้าง',
      leaves: 6,
    }
  }
}

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
  const todayIndex = new Date().getDate() % quotes.length
  const todayQuote = quotes[todayIndex]
  const suggestedPodcast = suggestedPodcasts[todayIndex % suggestedPodcasts.length]
  const growth = getGrowthStage(focusMinutes)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50/50 to-white">
      {/* Header */}
      <div className="flex items-center justify-center px-5 py-4">
        <span className="text-xl font-bold text-gray-900">การโตของต้นโพ</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center px-6 pb-6">
        {/* Growth Message */}
        <div className="mb-2 text-center w-full">
          <p className="text-lg font-semibold text-emerald-700">
            {growth.message}
          </p>
          <p className="text-sm text-gray-600">
            {growth.subMessage}
          </p>
        </div>

        {/* Realistic Bodhi Seedling */}
        <div className="relative mb-4 flex items-center justify-center h-56 w-full">
          {/* Soft ambient glow */}
          <div 
            className="absolute top-8 h-40 w-40 rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(253,224,71,0.5) 0%, rgba(253,224,71,0.2) 40%, transparent 70%)',
            }}
          />
          
          {/* Floating particles/sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-yellow-300/60"
                style={{
                  width: `${3 + (i % 3)}px`,
                  height: `${3 + (i % 3)}px`,
                  left: `${20 + (i * 10) % 60}%`,
                  top: `${15 + (i * 12) % 50}%`,
                  animation: `float ${3 + (i % 2)}s ease-in-out infinite ${i * 0.3}s`,
                }}
              />
            ))}
          </div>
          
          <svg viewBox="0 0 200 200" className="relative z-10 h-52 w-52">
            <defs>
              {/* Realistic leaf gradients */}
              <linearGradient id="leafMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="30%" stopColor="#4ade80" />
                <stop offset="70%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <linearGradient id="leafHighlight" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="30%" stopColor="#22c55e" />
                <stop offset="70%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              {/* Soil gradients */}
              <linearGradient id="soilTop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
              <linearGradient id="soilBase" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              {/* Glow effect */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15"/>
              </filter>
            </defs>
            
            {/* Soil mound - realistic layers */}
            <ellipse cx="100" cy="175" rx="60" ry="18" fill="url(#soilBase)" />
            <ellipse cx="100" cy="172" rx="55" ry="14" fill="url(#soilTop)" />
            <ellipse cx="100" cy="170" rx="45" ry="10" fill="#b45309" opacity="0.7" />
            
            {/* Soil texture - small pebbles and dirt */}
            <circle cx="70" cy="173" r="4" fill="#78350f" opacity="0.6" />
            <circle cx="130" cy="174" r="3" fill="#78350f" opacity="0.5" />
            <circle cx="85" cy="176" r="2.5" fill="#451a03" opacity="0.4" />
            <circle cx="115" cy="175" r="3" fill="#451a03" opacity="0.5" />
            <circle cx="60" cy="175" r="2" fill="#78350f" opacity="0.3" />
            <circle cx="140" cy="173" r="2" fill="#78350f" opacity="0.3" />
            <ellipse cx="95" cy="178" rx="3" ry="2" fill="#92400e" opacity="0.4" />
            <ellipse cx="108" cy="177" rx="2.5" ry="1.5" fill="#92400e" opacity="0.4" />
            
            {/* Base golden glow */}
            <ellipse cx="100" cy="165" rx="20" ry="10" fill="#fde047" opacity="0.5" filter="url(#glow)" />
            
            {/* Main stem with slight curve */}
            <path 
              d="M100 165 Q99 140 100 115 Q101 90 100 70" 
              stroke="url(#stemGradient)" 
              strokeWidth="5" 
              fill="none"
              strokeLinecap="round"
              filter="url(#softShadow)"
              className="origin-bottom"
              style={{
                animation: 'stemSway 4s ease-in-out infinite',
                transformOrigin: '100px 165px',
              }}
            />
            
            {/* Animated leaves group */}
            <g style={{ animation: 'plantSway 4s ease-in-out infinite', transformOrigin: '100px 165px' }}>
              {/* Top center leaf - largest, always visible */}
              <g style={{ animation: 'leafFloat 3s ease-in-out infinite', transformOrigin: '100px 55px' }}>
                <path 
                  d="M100 30 
                     C85 40, 80 55, 82 70 
                     C84 80, 92 88, 100 90 
                     C108 88, 116 80, 118 70 
                     C120 55, 115 40, 100 30Z" 
                  fill="url(#leafMain)"
                  filter="url(#softShadow)"
                />
                <path 
                  d="M100 30 
                     C90 42, 86 55, 88 68 
                     C90 75, 95 80, 100 82" 
                  fill="url(#leafHighlight)"
                  opacity="0.6"
                />
                {/* Leaf vein */}
                <path d="M100 35 Q100 60 100 85" stroke="#16a34a" strokeWidth="1" opacity="0.4" fill="none" />
                <path d="M100 50 Q92 58 88 65" stroke="#16a34a" strokeWidth="0.5" opacity="0.3" fill="none" />
                <path d="M100 50 Q108 58 112 65" stroke="#16a34a" strokeWidth="0.5" opacity="0.3" fill="none" />
              </g>
              
              {/* Left upper leaf */}
              {growth.leaves >= 2 && (
                <g style={{ animation: 'leafFloat 3.2s ease-in-out infinite 0.2s', transformOrigin: '70px 80px' }}>
                  <path 
                    d="M55 65 
                       C45 72, 42 82, 45 92 
                       C48 100, 58 105, 68 103 
                       C78 101, 85 93, 85 83 
                       C85 73, 75 65, 55 65Z" 
                    fill="url(#leafMain)"
                    filter="url(#softShadow)"
                    transform="rotate(-15, 65, 85)"
                  />
                  <path d="M55 70 Q62 85 68 98" stroke="#16a34a" strokeWidth="0.8" opacity="0.3" fill="none" transform="rotate(-15, 65, 85)" />
                </g>
              )}
              
              {/* Right upper leaf */}
              {growth.leaves >= 2 && (
                <g style={{ animation: 'leafFloat 3.4s ease-in-out infinite 0.4s', transformOrigin: '130px 80px' }}>
                  <path 
                    d="M145 65 
                       C155 72, 158 82, 155 92 
                       C152 100, 142 105, 132 103 
                       C122 101, 115 93, 115 83 
                       C115 73, 125 65, 145 65Z" 
                    fill="url(#leafMain)"
                    filter="url(#softShadow)"
                    transform="rotate(15, 135, 85)"
                  />
                  <path d="M145 70 Q138 85 132 98" stroke="#16a34a" strokeWidth="0.8" opacity="0.3" fill="none" transform="rotate(15, 135, 85)" />
                </g>
              )}
              
              {/* Left lower leaf */}
              {growth.leaves >= 3 && (
                <g style={{ animation: 'leafFloat 3.6s ease-in-out infinite 0.3s', transformOrigin: '60px 120px' }}>
                  <path 
                    d="M40 110 
                       C32 115, 30 123, 33 130 
                       C36 137, 45 140, 53 138 
                       C61 136, 67 128, 65 120 
                       C63 112, 52 108, 40 110Z" 
                    fill="url(#leafMain)"
                    filter="url(#softShadow)"
                    transform="rotate(-25, 50, 125)"
                  />
                </g>
              )}
              
              {/* Right lower leaf */}
              {growth.leaves >= 4 && (
                <g style={{ animation: 'leafFloat 3.3s ease-in-out infinite 0.5s', transformOrigin: '140px 120px' }}>
                  <path 
                    d="M160 110 
                       C168 115, 170 123, 167 130 
                       C164 137, 155 140, 147 138 
                       C139 136, 133 128, 135 120 
                       C137 112, 148 108, 160 110Z" 
                    fill="url(#leafMain)"
                    filter="url(#softShadow)"
                    transform="rotate(25, 150, 125)"
                  />
                </g>
              )}
              
              {/* Extra small leaves for stage 5+ */}
              {growth.leaves >= 5 && (
                <>
                  <g style={{ animation: 'leafFloat 3.1s ease-in-out infinite 0.6s', transformOrigin: '45px 145px' }}>
                    <path 
                      d="M30 140 C25 143, 24 148, 26 152 C28 156, 34 158, 40 156 C46 154, 50 149, 48 144 C46 139, 38 137, 30 140Z" 
                      fill="url(#leafMain)"
                      filter="url(#softShadow)"
                      transform="rotate(-35, 38, 148)"
                    />
                  </g>
                  <g style={{ animation: 'leafFloat 3.5s ease-in-out infinite 0.7s', transformOrigin: '155px 145px' }}>
                    <path 
                      d="M170 140 C175 143, 176 148, 174 152 C172 156, 166 158, 160 156 C154 154, 150 149, 152 144 C154 139, 162 137, 170 140Z" 
                      fill="url(#leafMain)"
                      filter="url(#softShadow)"
                      transform="rotate(35, 162, 148)"
                    />
                  </g>
                </>
              )}
              
              {/* Tiny new sprouts for stage 6 */}
              {growth.leaves >= 6 && (
                <>
                  <ellipse cx="75" cy="95" rx="6" ry="10" fill="#86efac" opacity="0.8" transform="rotate(-20, 75, 95)" style={{ animation: 'leafFloat 2.8s ease-in-out infinite 0.8s' }} />
                  <ellipse cx="125" cy="95" rx="6" ry="10" fill="#86efac" opacity="0.8" transform="rotate(20, 125, 95)" style={{ animation: 'leafFloat 2.9s ease-in-out infinite 0.9s' }} />
                </>
              )}
            </g>
          </svg>
          
          <style jsx>{`
            @keyframes plantSway {
              0%, 100% { transform: rotate(-2deg); }
              50% { transform: rotate(2deg); }
            }
            @keyframes stemSway {
              0%, 100% { transform: rotate(-1deg); }
              50% { transform: rotate(1deg); }
            }
            @keyframes leafFloat {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-4px) rotate(3deg); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
              50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
            }
          `}</style>
        </div>

        {/* Quote of the Day */}
        <div className="mb-4 w-full rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 p-4 text-center shadow-sm">
          <p className="mb-1 text-xs font-medium text-amber-600">คำคมประจำวัน</p>
          <p className="mb-2 text-lg font-semibold text-gray-900 leading-relaxed">
            &ldquo;{todayQuote.thai}&rdquo;
          </p>
          <p className="text-sm text-amber-600">- {todayQuote.author}</p>
        </div>

        {/* Podcast Suggestion */}
        <div className="mb-4 w-full">
          <p className="mb-2 text-sm font-medium text-gray-600">แนะนำสำหรับคุณ</p>
          <button
            onClick={onPodcast}
            className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-left shadow-lg transition-all active:scale-[0.98]"
          >
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
              <Image
                src={suggestedPodcast.image}
                alt={suggestedPodcast.nameThai}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-white truncate">{suggestedPodcast.nameThai}</p>
              <p className="text-sm text-white/80 truncate">{suggestedPodcast.teacher}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/25">
              <Play className="h-7 w-7 text-white" fill="white" />
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
