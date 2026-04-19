'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { CheckInAnswers } from '@/lib/store'
import { initialAnswers } from '@/lib/store'

interface Question {
  id: keyof CheckInAnswers
  text: string
  textThai: string
  emoji: string
}

const questions: Question[] = [
  { id: 'sleep1', text: 'How are you feeling today?', textThai: 'วันนี้คุณรู้สึกอย่างไร?', emoji: '😊' },
  { id: 'sleep2', text: 'Did you sleep well?', textThai: 'คุณหลับสบายไหม?', emoji: '😴' },
  { id: 'sleep3', text: 'Any vivid dreams?', textThai: 'ฝันชัดเจนไหม?', emoji: '💭' },
  { id: 'balance1', text: 'Feeling steady today?', textThai: 'รู้สึกมั่นคงไหม?', emoji: '🧘' },
  { id: 'balance2', text: 'Any dizziness?', textThai: 'มีอาการเวียนศีรษะไหม?', emoji: '🌀' },
  { id: 'balance3', text: 'Need help moving?', textThai: 'ต้องการความช่วยเหลือไหม?', emoji: '🤝' },
  { id: 'body1', text: 'Feeling tired?', textThai: 'รู้สึกเหนื่อยไหม?', emoji: '😓' },
  { id: 'body2', text: 'Ate and drank well?', textThai: 'ทานอาหารดีไหม?', emoji: '🍵' },
  { id: 'body3', text: 'Any unusual symptoms?', textThai: 'มีอาการผิดปกติไหม?', emoji: '❤️' },
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
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {currentQuestion.textThai}
          </h2>
          <p className="text-base text-gray-500">
            {currentQuestion.text}
          </p>
        </div>

        {/* Large Answer Buttons - Full Width, High Contrast */}
        <div className="mt-auto flex flex-col gap-4 pb-8">
          {/* Yes Button - Green */}
          <button
            onClick={() => handleAnswer(true)}
            className="flex w-full items-center justify-center gap-4 rounded-3xl bg-emerald-500 px-8 py-8 text-white shadow-lg transition-all active:scale-[0.98] active:bg-emerald-600"
            style={{ minHeight: '140px' }}
          >
            <span className="text-5xl">😊</span>
            <span className="text-3xl font-bold">ใช่</span>
          </button>

          {/* No Button - Red/Coral */}
          <button
            onClick={() => handleAnswer(false)}
            className="flex w-full items-center justify-center gap-4 rounded-3xl bg-rose-500 px-8 py-8 text-white shadow-lg transition-all active:scale-[0.98] active:bg-rose-600"
            style={{ minHeight: '140px' }}
          >
            <span className="text-5xl">😔</span>
            <span className="text-3xl font-bold">ไม่ใช่</span>
          </button>
        </div>
      </div>
    </div>
  )
}
