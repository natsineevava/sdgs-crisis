'use client'

import { Headphones, Droplets } from 'lucide-react'

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

      {/* Main Action Cards - Extra Large Buttons */}
      <div className="flex flex-col gap-6">
        {/* Dhamma Podcasts Card - Yellow/Gold */}
        <button
          onClick={() => onNavigate('listen')}
          className="group flex items-center gap-6 rounded-3xl bg-amber-400 p-8 text-left shadow-lg transition-all active:scale-[0.98]"
          style={{ minHeight: '180px' }}
        >
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
            <Headphones className="h-12 w-12 text-amber-500" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-3xl font-bold leading-tight text-white">ฟังธรรมะ</span>
            <span className="text-xl text-white/90">พอดแคสต์</span>
          </div>
        </button>

        {/* Daily Watering Card - Green */}
        <button
          onClick={() => onNavigate('checkin')}
          className="group flex items-center gap-6 rounded-3xl bg-emerald-500 p-8 text-left shadow-lg transition-all active:scale-[0.98]"
          style={{ minHeight: '180px' }}
        >
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
            <Droplets className="h-12 w-12 text-emerald-500" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-3xl font-bold leading-tight text-white">รดน้ำประจำวัน</span>
            <span className="text-xl text-white/90">ดูแลต้นโพธิ์</span>
          </div>
        </button>
      </div>
    </div>
  )
}
