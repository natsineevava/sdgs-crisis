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

        {/* Animated Bodhi Seedling - matching reference image style */}
        <div className="relative mb-4 flex items-center justify-center">
          {/* Soft golden glow background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-44 w-44 rounded-full bg-gradient-radial from-amber-200/60 via-amber-100/30 to-transparent blur-xl" />
          </div>
          
          {/* Sparkles */}
          <div className="absolute inset-0">
            <div className="absolute left-1/4 top-1/4 h-1 w-1 animate-pulse rounded-full bg-amber-300" style={{ animationDelay: '0s' }} />
            <div className="absolute right-1/4 top-1/3 h-1.5 w-1.5 animate-pulse rounded-full bg-amber-200" style={{ animationDelay: '0.5s' }} />
            <div className="absolute left-1/3 top-1/2 h-1 w-1 animate-pulse rounded-full bg-yellow-300" style={{ animationDelay: '1s' }} />
            <div className="absolute right-1/3 bottom-1/3 h-1 w-1 animate-pulse rounded-full bg-amber-300" style={{ animationDelay: '1.5s' }} />
            <div className="absolute left-1/5 bottom-1/4 h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-200" style={{ animationDelay: '0.3s' }} />
            <div className="absolute right-1/5 top-1/4 h-1 w-1 animate-pulse rounded-full bg-amber-200" style={{ animationDelay: '0.8s' }} />
          </div>
          
          <svg viewBox="0 0 200 220" className="relative z-10 h-52 w-52">
            <defs>
              {/* Green leaf gradient */}
              <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86EFAC" />
                <stop offset="50%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              <linearGradient id="leafGreenDark" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
              {/* Stem gradient */}
              <linearGradient id="stemGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="50%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              {/* Soil gradient */}
              <linearGradient id="soilBrown" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A16207" />
                <stop offset="50%" stopColor="#854D0E" />
                <stop offset="100%" stopColor="#713F12" />
              </linearGradient>
              <linearGradient id="soilLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#CA8A04" />
                <stop offset="100%" stopColor="#A16207" />
              </linearGradient>
              {/* Golden glow at base */}
              <radialGradient id="baseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Soil mound */}
            <ellipse cx="100" cy="195" rx="55" ry="20" fill="url(#soilBrown)" />
            <ellipse cx="100" cy="190" rx="50" ry="15" fill="url(#soilLight)" />
            <ellipse cx="100" cy="188" rx="40" ry="10" fill="#CA8A04" opacity="0.6" />
            
            {/* Soil texture dots */}
            <circle cx="75" cy="192" r="3" fill="#854D0E" opacity="0.5" />
            <circle cx="125" cy="193" r="2.5" fill="#854D0E" opacity="0.5" />
            <circle cx="90" cy="196" r="2" fill="#713F12" opacity="0.4" />
            <circle cx="110" cy="194" r="2.5" fill="#713F12" opacity="0.4" />
            <circle cx="135" cy="190" r="2" fill="#854D0E" opacity="0.3" />
            <circle cx="65" cy="190" r="2" fill="#854D0E" opacity="0.3" />
            
            {/* Golden glow at base of plant */}
            <ellipse cx="100" cy="175" rx="25" ry="15" fill="url(#baseGlow)" />
            
            {/* Main stem */}
            <path 
              d="M100 175 Q100 140 100 100" 
              stroke="url(#stemGreen)" 
              strokeWidth="4" 
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Animated plant group */}
            <g className="origin-bottom animate-[gentleSway_4s_ease-in-out_infinite]" style={{ transformOrigin: '100px 175px' }}>
              
              {/* Top leaf - always shown */}
              <g className="animate-[leafBob_3s_ease-in-out_infinite]" style={{ transformOrigin: '100px 60px' }}>
                <path 
                  d="M100 45 
                     Q85 55 85 70 
                     Q85 85 100 95 
                     Q115 85 115 70 
                     Q115 55 100 45
                     M100 95 L100 100" 
                  fill="url(#leafGreen)" 
                  stroke="url(#leafGreenDark)" 
                  strokeWidth="1"
                />
                {/* Leaf vein */}
                <path d="M100 50 L100 90" stroke="#22C55E" strokeWidth="1" opacity="0.5" />
              </g>
              
              {/* Left leaf - stage 2+ */}
              {growth.leaves >= 2 && (
                <g className="animate-[leafBob_3.2s_ease-in-out_infinite_0.2s]" style={{ transformOrigin: '75px 95px' }}>
                  <path 
                    d="M75 75 
                       Q60 82 58 95 
                       Q56 108 70 118 
                       Q84 108 82 95 
                       Q80 82 75 75
                       M70 118 Q80 120 90 115" 
                    fill="url(#leafGreen)" 
                    stroke="url(#leafGreenDark)" 
                    strokeWidth="1"
                    transform="rotate(-25, 75, 95)"
                  />
                </g>
              )}
              
              {/* Right leaf - stage 2+ */}
              {growth.leaves >= 2 && (
                <g className="animate-[leafBob_3.4s_ease-in-out_infinite_0.4s]" style={{ transformOrigin: '125px 95px' }}>
                  <path 
                    d="M125 75 
                       Q140 82 142 95 
                       Q144 108 130 118 
                       Q116 108 118 95 
                       Q120 82 125 75
                       M130 118 Q120 120 110 115" 
                    fill="url(#leafGreen)" 
                    stroke="url(#leafGreenDark)" 
                    strokeWidth="1"
                    transform="rotate(25, 125, 95)"
                  />
                </g>
              )}
              
              {/* Lower left leaf - stage 3+ */}
              {growth.leaves >= 3 && (
                <g className="animate-[leafBob_3.6s_ease-in-out_infinite_0.3s]" style={{ transformOrigin: '65px 130px' }}>
                  <path 
                    d="M65 115 
                       Q50 120 48 130 
                       Q46 142 58 150 
                       Q72 142 70 130 
                       Q68 120 65 115
                       M58 150 Q70 152 85 145" 
                    fill="url(#leafGreen)" 
                    stroke="url(#leafGreenDark)" 
                    strokeWidth="1"
                    transform="rotate(-35, 65, 130)"
                  />
                </g>
              )}
              
              {/* Lower right leaf - stage 4+ */}
              {growth.leaves >= 4 && (
                <g className="animate-[leafBob_3.3s_ease-in-out_infinite_0.5s]" style={{ transformOrigin: '135px 130px' }}>
                  <path 
                    d="M135 115 
                       Q150 120 152 130 
                       Q154 142 142 150 
                       Q128 142 130 130 
                       Q132 120 135 115
                       M142 150 Q130 152 115 145" 
                    fill="url(#leafGreen)" 
                    stroke="url(#leafGreenDark)" 
                    strokeWidth="1"
                    transform="rotate(35, 135, 130)"
                  />
                </g>
              )}
              
              {/* Extra side leaves - stage 5+ */}
              {growth.leaves >= 5 && (
                <>
                  <g className="animate-[leafBob_3.1s_ease-in-out_infinite_0.6s]" style={{ transformOrigin: '55px 155px' }}>
                    <path 
                      d="M50 145 Q38 150 38 158 Q38 168 48 173 Q60 168 58 158 Q56 150 50 145 M48 173 Q58 175 70 168" 
                      fill="url(#leafGreen)" 
                      stroke="url(#leafGreenDark)" 
                      strokeWidth="0.8"
                      transform="rotate(-45, 50, 158)"
                    />
                  </g>
                  <g className="animate-[leafBob_3.5s_ease-in-out_infinite_0.7s]" style={{ transformOrigin: '145px 155px' }}>
                    <path 
                      d="M150 145 Q162 150 162 158 Q162 168 152 173 Q140 168 142 158 Q144 150 150 145 M152 173 Q142 175 130 168" 
                      fill="url(#leafGreen)" 
                      stroke="url(#leafGreenDark)" 
                      strokeWidth="0.8"
                      transform="rotate(45, 150, 158)"
                    />
                  </g>
                </>
              )}
            </g>
          </svg>
          
          <style jsx>{`
            @keyframes gentleSway {
              0%, 100% { transform: rotate(-1.5deg); }
              50% { transform: rotate(1.5deg); }
            }
            @keyframes leafBob {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-3px) rotate(2deg); }
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
