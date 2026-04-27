'use client'

import { useState } from 'react'
import { MathGame } from './math-game'
import { ReactionGame } from './reaction-game'
import { GameResults } from './game-results'

type GameScreen = 'hub' | 'math' | 'reaction' | 'results'

interface MathGameResult {
  correct: number
  total: number
  avgTime: number
  times: number[]
}

interface ReactionGameResult {
  reactionTime: number | null
  earlyTaps: number
  status: 'perfect' | 'good' | 'slow' | 'early'
}

interface GameHubProps {
  onBack: () => void
  onComplete: (results: { math: MathGameResult | null; reaction: ReactionGameResult | null }) => void
}

export function GameHub({ onBack, onComplete }: GameHubProps) {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('hub')
  const [mathResult, setMathResult] = useState<MathGameResult | null>(null)
  const [reactionResult, setReactionResult] = useState<ReactionGameResult | null>(null)

  const handleMathComplete = (result: MathGameResult) => {
    setMathResult(result)
    setCurrentScreen('hub')
  }

  const handleReactionComplete = (result: ReactionGameResult) => {
    setReactionResult(result)
    setCurrentScreen('hub')
  }

  const handleViewResults = () => {
    setCurrentScreen('results')
  }

  const handleFinish = () => {
    onComplete({ math: mathResult, reaction: reactionResult })
  }

  const bothCompleted = mathResult !== null && reactionResult !== null

  if (currentScreen === 'math') {
    return <MathGame onComplete={handleMathComplete} onBack={() => setCurrentScreen('hub')} />
  }

  if (currentScreen === 'reaction') {
    return <ReactionGame onComplete={handleReactionComplete} onBack={() => setCurrentScreen('hub')} />
  }

  if (currentScreen === 'results') {
    return (
      <GameResults 
        mathResult={mathResult} 
        reactionResult={reactionResult} 
        onHome={onBack}
      />
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-all active:scale-95"
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900">เกมส์ประจำวัน</p>
          <p className="text-sm text-indigo-600">เช็กสมาธิและสติ</p>
        </div>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 py-4">
        {/* Intro Text */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-center text-lg text-gray-700">
            เล่นเกมส์สั้นๆ เพื่อเช็กสภาพจิตใจวันนี้
          </p>
        </div>

        {/* Game Cards */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Math Game Card */}
          <button
            onClick={() => setCurrentScreen('math')}
            disabled={mathResult !== null}
            className={`flex items-center gap-4 rounded-3xl p-6 shadow-lg transition-all active:scale-[0.98] ${
              mathResult 
                ? 'bg-emerald-100 border-2 border-emerald-300' 
                : 'bg-gradient-to-r from-purple-500 to-purple-600'
            }`}
            style={{ minHeight: '140px' }}
          >
            <div className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl ${
              mathResult ? 'bg-emerald-500' : 'bg-white/20'
            }`}>
              {mathResult ? (
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-4xl">🧮</span>
              )}
            </div>
            <div className="flex flex-1 flex-col text-left">
              <span className={`text-2xl font-bold ${mathResult ? 'text-emerald-700' : 'text-white'}`}>
                เกมส์บวกเลข
              </span>
              <span className={`text-base ${mathResult ? 'text-emerald-600' : 'text-white/80'}`}>
                {mathResult 
                  ? `ถูก ${mathResult.correct}/${mathResult.total} ข้อ` 
                  : 'เช็กความคมของความคิด'}
              </span>
            </div>
            {!mathResult && (
              <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>

          {/* Reaction Game Card */}
          <button
            onClick={() => setCurrentScreen('reaction')}
            disabled={reactionResult !== null}
            className={`flex items-center gap-4 rounded-3xl p-6 shadow-lg transition-all active:scale-[0.98] ${
              reactionResult 
                ? 'bg-emerald-100 border-2 border-emerald-300' 
                : 'bg-gradient-to-r from-rose-500 to-rose-600'
            }`}
            style={{ minHeight: '140px' }}
          >
            <div className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl ${
              reactionResult ? 'bg-emerald-500' : 'bg-white/20'
            }`}>
              {reactionResult ? (
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-4xl">⚡</span>
              )}
            </div>
            <div className="flex flex-1 flex-col text-left">
              <span className={`text-2xl font-bold ${reactionResult ? 'text-emerald-700' : 'text-white'}`}>
                เกมส์วัดสติ
              </span>
              <span className={`text-base ${reactionResult ? 'text-emerald-600' : 'text-white/80'}`}>
                {reactionResult 
                  ? `${reactionResult.reactionTime} มิลลิวินาที` 
                  : 'เช็กสติและความพร้อมของใจ'}
              </span>
            </div>
            {!reactionResult && (
              <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* View Results Button */}
        {bothCompleted && (
          <button
            onClick={handleViewResults}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 py-5 text-xl font-bold text-white shadow-lg transition-all active:scale-[0.98]"
          >
            ดูผลสรุป
          </button>
        )}
      </div>
    </div>
  )
}
