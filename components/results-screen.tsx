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

// Growth stages based on focus minutes
const getGrowthStage = (minutes: number) => {
  if (minutes < 5) {
    return {
      stage: 1,
      message: 'วันนี้คุณได้หว่านเมล็ดพันธุ์แห่งสติ',
      subMessage: 'เมล็ดพันธุ์เล็กๆ กำลังรอการเติบโต',
    }
  } else if (minutes < 15) {
    return {
      stage: 2,
      message: 'วันนี้คุณได้รดน้ำพรวนดิน',
      subMessage: 'เมล็ดพันธุ์เริ่มงอกงาม',
    }
  } else if (minutes < 30) {
    return {
      stage: 3,
      message: 'ต้นโพกำลังเติบโต',
      subMessage: 'ใบอ่อนเริ่มผลิบาน',
    }
  } else if (minutes < 60) {
    return {
      stage: 4,
      message: 'ต้นโพเติบโตแข็งแรง',
      subMessage: 'กิ่งก้านแผ่ขยาย',
    }
  } else {
    return {
      stage: 5,
      message: 'ต้นโพเติบโตสมบูรณ์',
      subMessage: 'ร่มเงาแห่งปัญญาแผ่กว้าง',
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
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-center px-5 py-4">
        <span className="text-xl font-bold text-gray-900">การโตของต้นโพ</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center px-6 pb-6">
        {/* Growth Message */}
        <div className="mb-3 text-center w-full">
          <p className="text-lg font-semibold text-amber-700">
            {growth.message}
          </p>
          <p className="text-sm text-gray-600">
            {growth.subMessage}
          </p>
        </div>

        {/* Animated Golden Bodhi Tree */}
        <div className="mb-4 flex items-center justify-center">
          <svg viewBox="0 0 200 220" className="h-48 w-48">
            <defs>
              <linearGradient id="trunkGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8860B" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
              <linearGradient id="leafGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFC125" />
                <stop offset="100%" stopColor="#DAA520" />
              </linearGradient>
              <linearGradient id="leafGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DAA520" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            
            {/* Main trunk */}
            <path d="M94 220 L94 140 Q100 125 100 115 Q100 125 106 140 L106 220" fill="url(#trunkGold)" />
            <path d="M97 220 L97 145 Q100 135 100 125 Q100 135 103 145 L103 220" fill="#FFD700" opacity="0.5" />
            
            {/* Animated tree group - gentle sway */}
            <g className="animate-[sway_4s_ease-in-out_infinite]" style={{ transformOrigin: '100px 140px' }}>
              {/* Branch structure */}
              <path d="M100 115 L100 45" stroke="url(#trunkGold)" strokeWidth="4" fill="none" />
              
              {/* Main branches */}
              <path d="M100 105 Q80 100 60 90" stroke="url(#trunkGold)" strokeWidth="3" fill="none" />
              <path d="M100 105 Q120 100 140 90" stroke="url(#trunkGold)" strokeWidth="3" fill="none" />
              <path d="M100 90 Q75 85 50 75" stroke="url(#trunkGold)" strokeWidth="2.5" fill="none" />
              <path d="M100 90 Q125 85 150 75" stroke="url(#trunkGold)" strokeWidth="2.5" fill="none" />
              <path d="M100 75 Q70 70 40 65" stroke="url(#trunkGold)" strokeWidth="2" fill="none" />
              <path d="M100 75 Q130 70 160 65" stroke="url(#trunkGold)" strokeWidth="2" fill="none" />
              <path d="M100 60 Q65 58 30 60" stroke="url(#trunkGold)" strokeWidth="1.5" fill="none" />
              <path d="M100 60 Q135 58 170 60" stroke="url(#trunkGold)" strokeWidth="1.5" fill="none" />
              
              {/* Bodhi leaves - Heart shaped with pointed tips - Top section */}
              <g className="animate-[leafSway_3s_ease-in-out_infinite]" style={{ transformOrigin: '100px 35px' }}>
                <path d="M100 25 Q95 30 100 40 Q105 30 100 25 M100 40 L100 48" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.2s_ease-in-out_infinite_0.1s]" style={{ transformOrigin: '88px 38px' }}>
                <path d="M88 30 Q83 35 88 45 Q93 35 88 30 M88 45 L88 52" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_2.8s_ease-in-out_infinite_0.2s]" style={{ transformOrigin: '112px 38px' }}>
                <path d="M112 30 Q107 35 112 45 Q117 35 112 30 M112 45 L112 52" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              
              {/* Second row */}
              <g className="animate-[leafSway_3.5s_ease-in-out_infinite_0.15s]" style={{ transformOrigin: '75px 48px' }}>
                <path d="M75 40 Q70 45 75 55 Q80 45 75 40 M75 55 L75 62" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.3s_ease-in-out_infinite_0.25s]" style={{ transformOrigin: '125px 48px' }}>
                <path d="M125 40 Q120 45 125 55 Q130 45 125 40 M125 55 L125 62" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.1s_ease-in-out_infinite_0.3s]" style={{ transformOrigin: '100px 52px' }}>
                <path d="M100 45 Q95 50 100 60 Q105 50 100 45 M100 60 L100 67" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              
              {/* Third row - wider */}
              <g className="animate-[leafSway_3.4s_ease-in-out_infinite_0.1s]" style={{ transformOrigin: '60px 58px' }}>
                <path d="M60 50 Q55 55 60 65 Q65 55 60 50 M60 65 L60 72" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.6s_ease-in-out_infinite_0.2s]" style={{ transformOrigin: '140px 58px' }}>
                <path d="M140 50 Q135 55 140 65 Q145 55 140 50 M140 65 L140 72" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.2s_ease-in-out_infinite_0.35s]" style={{ transformOrigin: '82px 58px' }}>
                <path d="M82 52 Q77 57 82 67 Q87 57 82 52 M82 67 L82 74" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3s_ease-in-out_infinite_0.4s]" style={{ transformOrigin: '118px 58px' }}>
                <path d="M118 52 Q113 57 118 67 Q123 57 118 52 M118 67 L118 74" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              
              {/* Fourth row - widest spread */}
              <g className="animate-[leafSway_3.7s_ease-in-out_infinite_0.05s]" style={{ transformOrigin: '45px 68px' }}>
                <path d="M45 60 Q40 65 45 75 Q50 65 45 60 M45 75 L45 82" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.8s_ease-in-out_infinite_0.15s]" style={{ transformOrigin: '155px 68px' }}>
                <path d="M155 60 Q150 65 155 75 Q160 65 155 60 M155 75 L155 82" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.3s_ease-in-out_infinite_0.25s]" style={{ transformOrigin: '68px 70px' }}>
                <path d="M68 62 Q63 67 68 77 Q73 67 68 62 M68 77 L68 84" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.5s_ease-in-out_infinite_0.35s]" style={{ transformOrigin: '132px 70px' }}>
                <path d="M132 62 Q127 67 132 77 Q137 67 132 62 M132 77 L132 84" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.1s_ease-in-out_infinite_0.45s]" style={{ transformOrigin: '100px 72px' }}>
                <path d="M100 65 Q95 70 100 80 Q105 70 100 65 M100 80 L100 87" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              
              {/* Fifth row */}
              <g className="animate-[leafSway_3.9s_ease-in-out_infinite_0.1s]" style={{ transformOrigin: '32px 78px' }}>
                <path d="M32 70 Q27 75 32 85 Q37 75 32 70 M32 85 L32 92" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_4s_ease-in-out_infinite_0.2s]" style={{ transformOrigin: '168px 78px' }}>
                <path d="M168 70 Q163 75 168 85 Q173 75 168 70 M168 85 L168 92" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.4s_ease-in-out_infinite_0.3s]" style={{ transformOrigin: '52px 80px' }}>
                <path d="M52 72 Q47 77 52 87 Q57 77 52 72 M52 87 L52 94" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.6s_ease-in-out_infinite_0.4s]" style={{ transformOrigin: '148px 80px' }}>
                <path d="M148 72 Q143 77 148 87 Q153 77 148 72 M148 87 L148 94" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.2s_ease-in-out_infinite_0.5s]" style={{ transformOrigin: '78px 82px' }}>
                <path d="M78 75 Q73 80 78 90 Q83 80 78 75 M78 90 L78 97" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3s_ease-in-out_infinite_0.55s]" style={{ transformOrigin: '122px 82px' }}>
                <path d="M122 75 Q117 80 122 90 Q127 80 122 75 M122 90 L122 97" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              
              {/* Sixth row - lower spreading */}
              <g className="animate-[leafSway_3.8s_ease-in-out_infinite_0.15s]" style={{ transformOrigin: '40px 92px' }}>
                <path d="M40 85 Q35 90 40 100 Q45 90 40 85 M40 100 L40 107" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_4.1s_ease-in-out_infinite_0.25s]" style={{ transformOrigin: '160px 92px' }}>
                <path d="M160 85 Q155 90 160 100 Q165 90 160 85 M160 100 L160 107" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.5s_ease-in-out_infinite_0.35s]" style={{ transformOrigin: '62px 95px' }}>
                <path d="M62 88 Q57 93 62 103 Q67 93 62 88 M62 103 L62 110" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.7s_ease-in-out_infinite_0.45s]" style={{ transformOrigin: '138px 95px' }}>
                <path d="M138 88 Q133 93 138 103 Q143 93 138 88 M138 103 L138 110" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.3s_ease-in-out_infinite_0.55s]" style={{ transformOrigin: '90px 98px' }}>
                <path d="M90 92 Q85 97 90 107 Q95 97 90 92 M90 107 L90 114" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
              <g className="animate-[leafSway_3.1s_ease-in-out_infinite_0.6s]" style={{ transformOrigin: '110px 98px' }}>
                <path d="M110 92 Q105 97 110 107 Q115 97 110 92 M110 107 L110 114" fill="url(#leafGold)" stroke="url(#leafGoldDark)" strokeWidth="0.5" />
              </g>
            </g>
          </svg>
          
          <style jsx>{`
            @keyframes sway {
              0%, 100% { transform: rotate(-1deg); }
              50% { transform: rotate(1deg); }
            }
            @keyframes leafSway {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
          `}</style>
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
