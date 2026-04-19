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
  patientName = 'Siriwan',
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
        return { thai: 'Good', english: 'Good' }
      case 'monitor':
        return { thai: 'Monitor', english: 'Monitor' }
      case 'attention':
        return { thai: 'Attention', english: 'Needs Attention' }
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
  }

  const getCategoryIcon = (category: 'sleep' | 'balance' | 'body') => {
    switch (category) {
      case 'sleep':
        return <Moon className="h-5 w-5" />
      case 'balance':
        return <Activity className="h-5 w-5" />
      case 'body':
        return <Heart className="h-5 w-5" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 text-gray-900" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold text-gray-900">Health Summary</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6 py-4">
        {/* Patient Name */}
        <div className="mb-6">
          <p className="text-lg text-gray-600">Patient: <span className="font-semibold text-gray-900">{patientName}</span></p>
        </div>

        {/* Current Status */}
        {currentResult ? (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
              Today&apos;s Status
            </h2>
            <div className={`rounded-2xl ${getLevelColor(currentResult.overallLevel)} p-5`}>
              <p className="text-xl font-semibold text-white">
                {getLevelText(currentResult.overallLevel).english}
              </p>
              <p className="mt-1 text-sm text-white/80">
                Overall wellness level
              </p>
            </div>

            {/* Category breakdown */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className={`flex flex-col items-center rounded-xl ${getLevelColor(currentResult.sleep.level)} p-4`}>
                <div className="text-white">{getCategoryIcon('sleep')}</div>
                <span className="mt-2 text-xs font-medium text-white">Sleep</span>
                <span className="text-xs text-white/80">{currentResult.sleep.levelThai}</span>
              </div>
              <div className={`flex flex-col items-center rounded-xl ${getLevelColor(currentResult.balance.level)} p-4`}>
                <div className="text-white">{getCategoryIcon('balance')}</div>
                <span className="mt-2 text-xs font-medium text-white">Balance</span>
                <span className="text-xs text-white/80">{currentResult.balance.levelThai}</span>
              </div>
              <div className={`flex flex-col items-center rounded-xl ${getLevelColor(currentResult.body.level)} p-4`}>
                <div className="text-white">{getCategoryIcon('body')}</div>
                <span className="mt-2 text-xs font-medium text-white">Body</span>
                <span className="text-xs text-white/80">{currentResult.body.levelThai}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl bg-gray-100 p-5 text-center">
            <p className="text-gray-600">No check-in yet today</p>
          </div>
        )}

        {/* 7-day History */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
            7-Day History
          </h2>
          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="flex justify-between gap-2">
              {history.slice(0, 7).map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-10 w-10 rounded-full ${getLevelColor(day.overallLevel)}`}
                    title={`${formatDate(day.date)}: ${getLevelText(day.overallLevel).english}`}
                  />
                  <span className="text-[10px] text-gray-500">
                    {formatDate(day.date).split(' ')[0]}
                  </span>
                </div>
              ))}
              {/* Fill remaining slots if history is short */}
              {Array.from({ length: Math.max(0, 7 - history.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <span className="text-[10px] text-gray-400">-</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="rounded-2xl bg-gray-50 p-4">
          <h3 className="mb-3 text-sm font-medium text-gray-600">Legend</h3>
          <div className="flex justify-around">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-600">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-amber-400" />
              <span className="text-xs text-gray-600">Monitor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-rose-400" />
              <span className="text-xs text-gray-600">Attention</span>
            </div>
          </div>
        </div>

        {/* Caregiver Message */}
        {currentResult && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-center text-gray-700">
              {currentResult.caregiverMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
