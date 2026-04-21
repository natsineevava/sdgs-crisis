'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'

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

// 21 levels of tree growth messages
const growthMessages = [
  { level: 1, message: 'เมล็ดพันธุ์เริ่มหยั่งราก', subMessage: 'วันที่ 1 - เริ่มต้นการเดินทาง' },
  { level: 2, message: 'รากเริ่มแข็งแรง', subMessage: 'วันที่ 2 - กำลังเติบโต' },
  { level: 3, message: 'หน่ออ่อนโผล่พ้นดิน', subMessage: 'วันที่ 3 - ชีวิตใหม่' },
  { level: 4, message: 'ใบแรกเริ่มผลิ', subMessage: 'วันที่ 4 - ความหวังเริ่มงอกงาม' },
  { level: 5, message: 'ต้นกล้าตั้งตัวได้', subMessage: 'วันที่ 5 - แข็งแรงขึ้น' },
  { level: 6, message: 'ใบที่สองผลิบาน', subMessage: 'วันที่ 6 - เติบโตต่อเนื่อง' },
  { level: 7, message: 'ลำต้นเริ่มแข็งแรง', subMessage: 'วันที่ 7 - ครบสัปดาห์แรก' },
  { level: 8, message: 'กิ่งแรกเริ่มแตก', subMessage: 'วันที่ 8 - ขยายกิ่งก้าน' },
  { level: 9, message: 'ใบเพิ่มขึ้นมากมาย', subMessage: 'วันที่ 9 - รุ่งเรืองยิ่งขึ้น' },
  { level: 10, message: 'ต้นไม้ตั้งตัวมั่นคง', subMessage: 'วันที่ 10 - ครึ่งทาง' },
  { level: 11, message: 'กิ่งก้านแผ่ขยาย', subMessage: 'วันที่ 11 - แผ่กว้าง' },
  { level: 12, message: 'ร่มเงาเริ่มปกคลุม', subMessage: 'วันที่ 12 - ให้ร่มเงา' },
  { level: 13, message: 'ใบเขียวชอุ่ม', subMessage: 'วันที่ 13 - อุดมสมบูรณ์' },
  { level: 14, message: 'ลำต้นใหญ่โตแข็งแรง', subMessage: 'วันที่ 14 - ครบสองสัปดาห์' },
  { level: 15, message: 'กิ่งแตกสาขามากมาย', subMessage: 'วันที่ 15 - แผ่ไพศาล' },
  { level: 16, message: 'ต้นโพธิ์งดงามสง่า', subMessage: 'วันที่ 16 - สง่างาม' },
  { level: 17, message: 'ใบเริ่มเปลี่ยนสี', subMessage: 'วันที่ 17 - ใกล้สมบูรณ์' },
  { level: 18, message: 'แสงทองส่องประกาย', subMessage: 'วันที่ 18 - เรืองรอง' },
  { level: 19, message: 'ใบทองระยิบระยับ', subMessage: 'วันที่ 19 - เจิดจรัส' },
  { level: 20, message: 'ต้นโพธิ์ทองอร่าม', subMessage: 'วันที่ 20 - ใกล้บรรลุ' },
  { level: 21, message: 'ต้นโพธิ์ทองสมบูรณ์แบบ', subMessage: 'วันที่ 21 - สำเร็จแล้ว!' },
]

interface RecommendedPodcast {
  id: string
  nameThai: string
  teacher: string
  image: string
}

interface ResultsScreenProps {
  treeLevel: number // 1-21
  alertLevel?: 'good' | 'monitor' | 'attention' | 'miss'
  patientMessage?: string
  onHome: () => void
  onPlayPodcast?: (podcast: RecommendedPodcast) => void
}

export function ResultsScreen({
  treeLevel,
  alertLevel = 'good',
  patientMessage,
  onHome,
  onPlayPodcast,
}: ResultsScreenProps) {
  const todayIndex = new Date().getDate() % quotes.length
  const todayQuote = quotes[todayIndex]
  const suggestedPodcast = suggestedPodcasts[todayIndex % suggestedPodcasts.length]
  
  // Clamp level to 1-21
  const level = Math.max(1, Math.min(21, treeLevel))
  const growth = growthMessages[level - 1]
  const isGolden = level >= 17 // Start turning gold at level 17
  const isFullyGolden = level === 21

  // Calculate tree size and leaves based on level
  const treeScale = 0.3 + (level / 21) * 0.7 // Scale from 30% to 100%
  const numLeaves = Math.min(level * 3, 50) // More leaves as tree grows
  const trunkHeight = 40 + (level / 21) * 60 // Trunk grows taller

  // Leaf color based on level
  const getLeafColor = (index: number) => {
    if (isFullyGolden) return '#FFD700' // Pure gold
    if (level >= 19) return index % 2 === 0 ? '#FFD700' : '#FFC107'
    if (level >= 17) return index % 3 === 0 ? '#FFD700' : '#4ade80'
    return '#4ade80' // Green
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-center px-5 py-4">
        <span className="text-2xl font-bold text-gray-900">ต้นโพธิ์ของคุณ</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center px-5 pb-6">
        {/* Growth Level Badge */}
        <div className={`mb-4 rounded-full px-6 py-2 ${isGolden ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-emerald-500'}`}>
          <span className="text-lg font-bold text-white">
            วันที่ {level} / 21
          </span>
        </div>

        {/* Growth Message */}
        <div className="mb-4 text-center w-full">
          <p className={`text-xl font-bold ${isGolden ? 'text-amber-600' : 'text-emerald-700'}`}>
            {growth.message}
          </p>
          <p className="text-base text-gray-600">
            {growth.subMessage}
          </p>
        </div>

        {/* Growing Bodhi Tree - 21 Levels */}
        <div className="relative mb-4 flex items-center justify-center h-64 w-full">
          {/* Golden glow for higher levels */}
          {isGolden && (
            <div 
              className="absolute h-56 w-56 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(255,215,0,${isFullyGolden ? 0.6 : 0.3}) 0%, rgba(255,215,0,0.1) 50%, transparent 70%)`,
              }}
            />
          )}
          
          {/* Sparkles for golden tree */}
          {isGolden && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-yellow-300"
                  style={{
                    width: `${4 + (i % 3)}px`,
                    height: `${4 + (i % 3)}px`,
                    left: `${15 + (i * 7) % 70}%`,
                    top: `${10 + (i * 8) % 60}%`,
                    animation: `sparkle ${2 + (i % 2)}s ease-in-out infinite ${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          )}
          
          <svg viewBox="0 0 200 220" className="relative z-10 h-60 w-60">
            <defs>
              {/* Green leaf gradient */}
              <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="50%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              {/* Golden leaf gradient */}
              <linearGradient id="leafGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              {/* Trunk gradient */}
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="30%" stopColor="#92400e" />
                <stop offset="70%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              {/* Soil */}
              <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a16207" />
                <stop offset="100%" stopColor="#713f12" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Soil */}
            <ellipse cx="100" cy="200" rx="70" ry="18" fill="url(#soilGrad)" />
            <ellipse cx="100" cy="197" rx="60" ry="12" fill="#92400e" opacity="0.7" />
            
            {/* Tree Trunk - grows with level */}
            <path 
              d={`M95 200 
                  Q93 ${200 - trunkHeight * 0.5} 95 ${200 - trunkHeight * 0.7}
                  Q97 ${200 - trunkHeight * 0.9} 100 ${200 - trunkHeight}
                  Q103 ${200 - trunkHeight * 0.9} 105 ${200 - trunkHeight * 0.7}
                  Q107 ${200 - trunkHeight * 0.5} 105 200
                  Z`}
              fill="url(#trunkGrad)"
            />
            
            {/* Branches - appear as tree grows */}
            {level >= 7 && (
              <>
                <path 
                  d={`M98 ${200 - trunkHeight * 0.6} Q80 ${200 - trunkHeight * 0.7} 70 ${200 - trunkHeight * 0.5}`}
                  stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round"
                />
                <path 
                  d={`M102 ${200 - trunkHeight * 0.6} Q120 ${200 - trunkHeight * 0.7} 130 ${200 - trunkHeight * 0.5}`}
                  stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round"
                />
              </>
            )}
            {level >= 11 && (
              <>
                <path 
                  d={`M97 ${200 - trunkHeight * 0.75} Q70 ${200 - trunkHeight * 0.85} 55 ${200 - trunkHeight * 0.65}`}
                  stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round"
                />
                <path 
                  d={`M103 ${200 - trunkHeight * 0.75} Q130 ${200 - trunkHeight * 0.85} 145 ${200 - trunkHeight * 0.65}`}
                  stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round"
                />
              </>
            )}
            
            {/* Leaves - grow and turn golden */}
            <g style={{ animation: 'sway 4s ease-in-out infinite', transformOrigin: '100px 200px' }}>
              {[...Array(numLeaves)].map((_, i) => {
                const angle = (i / numLeaves) * 360
                const radius = 20 + (i % 5) * 15 * treeScale
                const cx = 100 + Math.cos(angle * Math.PI / 180) * radius
                const cy = (200 - trunkHeight * 0.8) + Math.sin(angle * Math.PI / 180) * radius * 0.6
                const size = 8 + (i % 4) * 4
                const isThisLeafGolden = isGolden && (isFullyGolden || i % (22 - level) === 0)
                
                return (
                  <ellipse
                    key={i}
                    cx={cx}
                    cy={cy}
                    rx={size}
                    ry={size * 1.3}
                    fill={isThisLeafGolden ? 'url(#leafGold)' : 'url(#leafGreen)'}
                    transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
                    filter={isThisLeafGolden ? 'url(#glow)' : undefined}
                    style={{
                      animation: `leafFloat ${3 + (i % 2)}s ease-in-out infinite ${i * 0.1}s`,
                    }}
                  />
                )
              })}
            </g>
            
            {/* Central canopy - appears at higher levels */}
            {level >= 5 && (
              <ellipse 
                cx="100" 
                cy={200 - trunkHeight * 0.85} 
                rx={30 * treeScale} 
                ry={25 * treeScale} 
                fill={isFullyGolden ? 'url(#leafGold)' : 'url(#leafGreen)'}
                filter={isGolden ? 'url(#glow)' : undefined}
                opacity="0.9"
              />
            )}
          </svg>
          
          <style jsx>{`
            @keyframes sway {
              0%, 100% { transform: rotate(-1deg); }
              50% { transform: rotate(1deg); }
            }
            @keyframes leafFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
            @keyframes sparkle {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.5); }
            }
          `}</style>
        </div>

        {/* Completion message for level 21 */}
        {isFullyGolden && (
          <div className="mb-4 w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 p-4 text-center shadow-lg">
            <p className="text-xl font-bold text-white">
              ยินดีด้วย! ต้นโพธิ์ทองของคุณเติบโตสมบูรณ์แล้ว
            </p>
            <p className="text-base text-white/90">
              21 วันแห่งการดูแลตัวเอง
            </p>
          </div>
        )}

        {/* Missing Somebody Message - shown when mental alertLevel is 'miss' */}
        {alertLevel === 'miss' && (
          <div className="mb-4 w-full rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 p-4 text-center shadow-sm border-2 border-pink-200">
            <p className="mb-1 text-lg font-bold text-rose-600">คิดถึงใครบางคน</p>
            <p className="text-base text-rose-500">
              {patientMessage || 'ลองโทรหาลูกหลานหรือคนที่รักนะคะ'}
            </p>
          </div>
        )}

        {/* Quote of the Day */}
        <div className="mb-4 w-full rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 p-4 text-center shadow-sm">
          <p className="mb-1 text-sm font-medium text-amber-600">คำคมประจำวัน</p>
          <p className="mb-2 text-lg font-semibold text-gray-900 leading-relaxed">
            &ldquo;{todayQuote.thai}&rdquo;
          </p>
          <p className="text-base text-amber-600">- {todayQuote.author}</p>
        </div>

        {/* Podcast Suggestion */}
        <div className="mb-4 w-full">
          <p className="mb-2 text-base font-medium text-gray-600">แนะนำสำหรับคุณ</p>
          <button
            onClick={() => onPlayPodcast?.(suggestedPodcast)}
            className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-left shadow-lg transition-all active:scale-[0.98]"
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
              <Image
                src={suggestedPodcast.image}
                alt={suggestedPodcast.nameThai}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl font-bold text-white truncate">{suggestedPodcast.nameThai}</p>
              <p className="text-base text-white/80 truncate">{suggestedPodcast.teacher}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </button>
        </div>

        {/* Home Button */}
        <button
          onClick={onHome}
          className="w-full rounded-2xl bg-amber-500 py-6 text-center text-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] active:bg-amber-600"
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  )
}
