'use client'

import { Headphones, Smile } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: 'listen' | 'checkin') => void
  userName?: string
}

export function HomeScreen({ onNavigate, userName = 'คุณยาย' }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white px-5 pb-8 pt-12">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">สวัสดีค่ะ {userName}</h1>
        <p className="text-xl text-gray-600">วันนี้ให้เราช่วยอะไรดีคะ?</p>
      </div>

      {/* Main Action Cards - Large Buttons */}
      <div className="flex flex-col gap-5">
        {/* Dhamma Podcasts Card - Yellow/Gold */}
        <button
          onClick={() => onNavigate('listen')}
          className="group flex items-center gap-5 rounded-3xl bg-amber-400 p-6 text-left shadow-lg transition-all active:scale-[0.98]"
          style={{ minHeight: '140px' }}
        >
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
            <Headphones className="h-10 w-10 text-amber-500" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold leading-tight text-white">ฟังธรรมะ</span>
            <span className="text-lg text-white/90">พอดแคสต์</span>
          </div>
        </button>

        {/* Mood Tracking Card - Pink/Coral */}
        <button
          onClick={() => onNavigate('checkin')}
          className="group flex items-center gap-5 rounded-3xl bg-rose-400 p-6 text-left shadow-lg transition-all active:scale-[0.98]"
          style={{ minHeight: '140px' }}
        >
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
            <Smile className="h-10 w-10 text-rose-400" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold leading-tight text-white">บันทึกอารมณ์</span>
            <span className="text-lg text-white/90">เช็คอินสุขภาพ</span>
          </div>
        </button>
      </div>
    </div>
  )
}
