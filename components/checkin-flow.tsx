'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { CheckInAnswers } from '@/lib/store'
import { initialAnswers } from '@/lib/store'

interface Question {
  id: keyof CheckInAnswers
  textThai: string
  emoji: string
  concerningAnswer: boolean // true = "Yes" is concerning, false = "No" is concerning
}

// Category 1: Sleep Quality (REM Sleep Behavior Disorder)
// Category 2: Balance & Movement (Postural Instability)
// Category 3: Body Regulation (Autonomic Dysfunction / Hypotension)
const questions: Question[] = [
  // Sleep Quality
  { id: 'sleep1', textThai: 'คืนที่ผ่านมาหลับพักผ่อนได้ดีไหม?', emoji: '😴', concerningAnswer: false },
  { id: 'sleep2', textThai: 'มีคนสังเกตว่าคุณพูดหรือขยับตัวขณะหลับไหม?', emoji: '🗣️', concerningAnswer: true },
  { id: 'sleep3', textThai: 'ตื่นนอนมาพร้อมความฝันที่วุ่นวายหรือน่ากลัวไหม?', emoji: '😰', concerningAnswer: true },
  // Balance & Movement
  { id: 'balance1', textThai: 'รู้สึกมั่นคงขณะเดินหรือยืนวันนี้ไหม?', emoji: '🚶', concerningAnswer: false },
  { id: 'balance2', textThai: 'มีการเซหรือเกือบล้มวันนี้ไหม?', emoji: '⚠️', concerningAnswer: true },
  { id: 'balance3', textThai: 'ต้องการความช่วยเหลือในการลุกขึ้นจากที่นั่งไหม?', emoji: '🪑', concerningAnswer: true },
  // Body Regulation
  { id: 'body1', textThai: 'รู้สึกมึนหัวหรือเวียนศีรษะเมื่อลุกขึ้นยืนไหม?', emoji: '💫', concerningAnswer: true },
  { id: 'body2', textThai: 'รู้สึกอ่อนเพลียผิดปกติหรือหัวใจเต้นผิดจังหวะวันนี้ไหม?', emoji: '❤️', concerningAnswer: true },
  { id: 'body3', textThai: 'ดื่มน้ำและรับประทานอาหารได้เพียงพอวันนี้ไหม?', emoji: '🍵', concerningAnswer: false },
]

interface CheckInFlowProps {
  onComplete: (answers: CheckInAnswers) => void
  onBack: () => void
}

export function CheckInFlow({ onComplete, onBack }: CheckInFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<CheckInAnswers>(initialAnswers)

  const currentQuestion = questions[currentStep]
  const totalSteps = questions.length

  const handleAnswer = (answer: boolean) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header - Minimal */}
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={handleBack}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <span className="text-lg font-semibold text-gray-900">
          {currentStep + 1} / {totalSteps}
        </span>
        <div className="w-12" />
      </div>

      {/* Progress Bar - Simple & Clear */}
      <div className="px-5 pb-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content - Centered & Large */}
      <div className="flex flex-1 flex-col px-5">
        {/* Large Emoji - Very Prominent */}
        <div className="flex justify-center py-6">
          <span className="text-8xl">{currentQuestion.emoji}</span>
        </div>

        {/* Question Text - Clear & Large */}
        <div className="mb-6 text-center px-2">
          <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
            {currentQuestion.textThai}
          </h2>
        </div>

        {/* Extra Large Answer Buttons - Full Width, High Contrast */}
        <div className="mt-auto flex flex-col gap-5 pb-8">
          {/* Yes Button - Green */}
          <button
            onClick={() => handleAnswer(true)}
            className="flex w-full items-center justify-center gap-5 rounded-3xl bg-emerald-500 px-8 py-10 text-white shadow-lg transition-all active:scale-[0.98] active:bg-emerald-600"
            style={{ minHeight: '130px' }}
          >
            <span className="text-6xl">😊</span>
            <span className="text-4xl font-bold">ใช่</span>
          </button>

          {/* No Button - Red/Coral */}
          <button
            onClick={() => handleAnswer(false)}
            className="flex w-full items-center justify-center gap-5 rounded-3xl bg-rose-500 px-8 py-10 text-white shadow-lg transition-all active:scale-[0.98] active:bg-rose-600"
            style={{ minHeight: '130px' }}
          >
            <span className="text-6xl">😔</span>
            <span className="text-4xl font-bold">ไม่ใช่</span>
          </button>
        </div>
      </div>
    </div>
  )
}
