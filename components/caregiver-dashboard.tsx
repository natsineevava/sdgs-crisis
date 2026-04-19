'use client'

import { ChevronLeft, Moon, Activity, Heart } from 'lucide-react'
import type { CheckInResult, CategoryLevel } from '@/lib/store'

interface DailyStatus {
  date: string
  overallLevel: CategoryLevel
  sleep: CategoryLevel
  balance: CategoryLevel
  body: CategoryLevel
}

interface CaregiverDashboardProps {
  onBack: () => void
  currentResult: CheckInResult | null
  history: DailyStatus[]
  patientName?: string
}

export function CaregiverDashboard({
  onBack,
  currentResult,
  history,
  patientName = 'คุณยาย',
}: CaregiverDashboardProps) {
  const getLevelColor = (level: CategoryLevel) => {
    switch (level) {
      case 'good':
        return 'bg-emerald-500'
      case 'monitor':
        return 'bg-amber-400'
      case 'attention':
        return 'bg-rose-400'
    }
  }

  const getLevelText = (level: CategoryLevel) => {
    switch (level) {
      case 'good':
        return { thai: 'ดี', english: 'สบายดี' }
      case 'monitor':
        return { thai: 'เฝ้าดู', english: 'ควรติดตาม' }
      case 'attention':
        return { thai: 'ระวัง', english: 'ต้องดูแล' }
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    return days[date.getDay()]
  }

  const getCategoryIcon = (category: 'sleep' | 'balance' | 'body') => {
    switch (category) {
      case 'sleep':
        return <Moon className="h-6 w-6" />
      case 'balance':
        return <Activity className="h-6 w-6" />
      case 'body':
        return <Heart className="h-6 w-6" />
    }
  }

  const getCategoryName = (category: 'sleep' | 'balance' | 'body') => {
    switch (category) {
      case 'sleep':
        return 'การนอน'
      case 'balance':
        return 'การทรงตัว'
      case 'body':
        return 'ร่างกาย'
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4">
        <button
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 transition-colors active:scale-95"
          aria-label="กลับ"
        >
          <ChevronLeft className="h-7 w-7 text-gray-900" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-bold text-gray-900">สรุปสุขภาพ</h1>
        <div className="w-12" />
      </div>

      <div className="flex-1 px-6 py-4">
        {/* Patient Name */}
        <div className="mb-6">
          <p className="text-xl text-gray-600">ผู้ป่วย: <span className="font-bold text-gray-900">{patientName}</span></p>
        </div>

        {/* Current Status */}
        {currentResult ? (
          <div className="mb-6">
            <h2 className="mb-4 text-base font-semibold text-gray-500">
              สถานะวันนี้
            </h2>
            <div className={`rounded-3xl ${getLevelColor(currentResult.overallLevel)} p-6 shadow-lg`}>
              <p className="text-2xl font-bold text-white">
                {getLevelText(currentResult.overallLevel).english}
              </p>
              <p className="mt-1 text-base text-white/90">
                ระดับสุขภาพโดยรวม
              </p>
            </div>

            {/* Category breakdown */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div className={`flex flex-col items-center rounded-2xl ${getLevelColor(currentResult.sleep.level)} p-5 shadow-md`}>
                <div className="text-white">{getCategoryIcon('sleep')}</div>
                <span className="mt-2 text-sm font-semibold text-white">{getCategoryName('sleep')}</span>
                <span className="text-xs text-white/90">{currentResult.sleep.levelThai}</span>
              </div>
              <div className={`flex flex-col items-center rounded-2xl ${getLevelColor(currentResult.balance.level)} p-5 shadow-md`}>
                <div className="text-white">{getCategoryIcon('balance')}</div>
                <span className="mt-2 text-sm font-semibold text-white">{getCategoryName('balance')}</span>
                <span className="text-xs text-white/90">{currentResult.balance.levelThai}</span>
              </div>
              <div className={`flex flex-col items-center rounded-2xl ${getLevelColor(currentResult.body.level)} p-5 shadow-md`}>
                <div className="text-white">{getCategoryIcon('body')}</div>
                <span className="mt-2 text-sm font-semibold text-white">{getCategoryName('body')}</span>
                <span className="text-xs text-white/90">{currentResult.body.levelThai}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-3xl bg-gray-100 p-6 text-center shadow-md">
            <p className="text-lg text-gray-600">ยังไม่ได้เช็คอินวันนี้</p>
          </div>
        )}

        {/* 7-day History */}
        <div className="mb-6">
          <h2 className="mb-4 text-base font-semibold text-gray-500">
            ประวัติ 7 วัน
          </h2>
          <div className="rounded-3xl bg-gray-50 p-5 shadow-sm">
            <div className="flex justify-between gap-2">
              {history.slice(0, 7).map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-12 w-12 rounded-full ${getLevelColor(day.overallLevel)} shadow-md`}
                    title={`${formatDate(day.date)}: ${getLevelText(day.overallLevel).thai}`}
                  />
                  <span className="text-sm font-medium text-gray-600">
                    {formatDate(day.date)}
                  </span>
                </div>
              ))}
              {/* Fill remaining slots if history is short */}
              {Array.from({ length: Math.max(0, 7 - history.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                  <span className="text-sm text-gray-400">-</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="rounded-3xl bg-gray-50 p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-600">สัญลักษณ์</h3>
          <div className="flex justify-around">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-emerald-500 shadow-sm" />
              <span className="text-base text-gray-700">ดี</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-400 shadow-sm" />
              <span className="text-base text-gray-700">เฝ้าดู</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-rose-400 shadow-sm" />
              <span className="text-base text-gray-700">ระวัง</span>
            </div>
          </div>
        </div>

        {/* Caregiver Message */}
        {currentResult && (
          <div className="mt-6 rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-center text-lg text-gray-700">
              {currentResult.caregiverMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
