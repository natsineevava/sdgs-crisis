'use client'

import { Headphones, Smile } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: 'listen' | 'checkin') => void
  userName?: string
}

export function HomeScreen({ onNavigate, userName = 'Siriwan' }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white px-5 pb-8 pt-16">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-lg font-medium text-gray-900">Hi {userName}</h1>
        <p className="text-lg text-gray-900">How can we help you today?</p>
      </div>

      {/* Main Action Cards */}
      <div className="flex flex-col gap-4">
        {/* Dhamma Podcasts Card - Yellow/Gold */}
        <button
          onClick={() => onNavigate('listen')}
          className="group flex items-start gap-4 rounded-2xl bg-amber-400 p-4 text-left transition-all active:scale-[0.98]"
        >
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <Headphones className="h-7 w-7 text-amber-500" />
          </div>
          <div className="flex flex-col justify-center pt-2">
            <span className="text-base font-semibold leading-tight text-white">Dhamma</span>
            <span className="text-base font-semibold leading-tight text-white">Podcasts</span>
          </div>
        </button>

        {/* Mood Tracking Card - Pink/Coral */}
        <button
          onClick={() => onNavigate('checkin')}
          className="group flex items-start gap-4 rounded-2xl bg-rose-400 p-4 text-left transition-all active:scale-[0.98]"
        >
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <Smile className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex flex-col justify-center pt-2">
            <span className="text-base font-semibold leading-tight text-white">Mood</span>
            <span className="text-base font-semibold leading-tight text-white">Tracking</span>
          </div>
        </button>
      </div>
    </div>
  )
}
