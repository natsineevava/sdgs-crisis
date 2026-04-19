'use client'

import type { CheckInResult } from '@/lib/store'

interface ResultsScreenProps {
  result: CheckInResult
  focusMinutes: number
  onViewDetail: () => void
  onHome: () => void
}

export function ResultsScreen({
  focusMinutes,
  onViewDetail,
}: ResultsScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-center px-5 py-4">
        <span className="text-xl font-bold text-gray-900">สรุปผล</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center px-6 py-6">
        {/* Focus Time Message */}
        <div className="mb-8 text-center w-full">
          <p className="text-xl text-gray-900">
            วันนี้คุณได้มีสติ
          </p>
          <p className="text-xl text-gray-900">
            เป็นเวลา <span className="font-bold text-emerald-600">{focusMinutes} นาที</span>
          </p>
        </div>

        {/* Tree Illustration */}
        <div className="mb-8 flex flex-1 items-center justify-center">
          <div className="relative">
            {/* Circular background */}
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-emerald-100 shadow-lg">
              {/* Tree SVG */}
              <svg viewBox="0 0 100 120" className="h-48 w-48">
                {/* Tree trunk */}
                <path
                  d="M46 120 L46 70 Q46 65 50 60 Q54 65 54 70 L54 120"
                  fill="#8B5A2B"
                />
                {/* Main trunk texture */}
                <path
                  d="M48 120 L48 75"
                  stroke="#6B4423"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M52 120 L52 75"
                  stroke="#6B4423"
                  strokeWidth="1"
                  fill="none"
                />
                
                {/* Tree canopy - layered circles for foliage */}
                <ellipse cx="50" cy="45" rx="32" ry="28" fill="#4CAF50" />
                <ellipse cx="35" cy="50" rx="18" ry="16" fill="#66BB6A" />
                <ellipse cx="65" cy="50" rx="18" ry="16" fill="#66BB6A" />
                <ellipse cx="50" cy="35" rx="22" ry="18" fill="#81C784" />
                <ellipse cx="40" cy="40" rx="12" ry="10" fill="#A5D6A7" />
                <ellipse cx="60" cy="40" rx="12" ry="10" fill="#A5D6A7" />
                <ellipse cx="50" cy="28" rx="14" ry="12" fill="#C8E6C9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Detail Button - Large */}
        <button
          onClick={onViewDetail}
          className="w-full rounded-2xl border-3 border-gray-900 bg-white py-5 text-center text-xl font-bold text-gray-900 shadow-lg transition-all active:scale-[0.98]"
        >
          ดูรายละเอียด
        </button>
      </div>
    </div>
  )
}
