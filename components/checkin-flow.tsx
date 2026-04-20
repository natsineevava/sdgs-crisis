'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

interface Question {
  id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7' | 'q8' | 'q9'
  textThai: string
  emoji: string
  category: 'sleep' | 'balance' | 'body'
}

// Questions from the specification with exact Thai text
const questions: Question[] = [
  // Category 1: Sleep Quality (REM Sleep Behavior Disorder)
  { id: 'q1', textThai: 'คืนที่ผ่านมาหลับพักผ่อนได้ดีไหม?', emoji: '😴', category: 'sleep' },
  { id: 'q2', textThai: 'มีคนสังเกตว่าคุณพูดหรือขยับตัวขณะหลับไหม?', emoji: '🗣️', category: 'sleep' },
  { id: 'q3', textThai: 'ตื่นนอนมาพร้อมความฝันที่วุ่นวายหรือน่ากลัวไหม?', emoji: '😰', category: 'sleep' },
  // Category 2: Balance & Movement (Postural Instability)
  { id: 'q4', textThai: 'รู้สึกมั่นคงขณะเดินหรือยืนวันนี้ไหม?', emoji: '🚶', category: 'balance' },
  { id: 'q5', textThai: 'มีการเซหรือเกือบล้มวันนี้ไหม?', emoji: '⚠️', category: 'balance' },
  { id: 'q6', textThai: 'ต้องการความช่วยเหลือในการลุกขึ้นจากที่นั่งไหม?', emoji: '🪑', category: 'balance' },
  // Category 3: Body Regulation (Autonomic Dysfunction / Hypotension)
  { id: 'q7', textThai: 'รู้สึกมึนหัวหรือเวียนศีรษะเมื่อลุกขึ้นยืนไหม?', emoji: '💫', category: 'body' },
  { id: 'q8', textThai: 'รู้สึกอ่อนเพลียผิดปกติหรือหัวใจเต้นผิดจังหวะวันนี้ไหม?', emoji: '❤️', category: 'body' },
  { id: 'q9', textThai: 'ดื่มน้ำและรับประทานอาหารได้เพียงพอวันนี้ไหม?', emoji: '🍵', category: 'body' },
]

interface CheckInAnswers {
  q1: boolean
  q2: boolean
  q3: boolean
  q4: boolean
  q5: boolean
  q6: boolean
  q7: boolean
  q8: boolean
  q9: boolean
}

const initialAnswers: CheckInAnswers = {
  q1: false,
  q2: false,
  q3: false,
  q4: false,
  q5: false,
  q6: false,
  q7: false,
  q8: false,
  q9: false,
}

interface CheckInFlowProps {
  onComplete: (answers: CheckInAnswers) => void
  onBack: () => void
}

export function CheckInFlow({ onComplete, onBack }: CheckInFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<CheckInAnswers>(initialAnswers)

  const currentQuestion = questions[currentStep]
  const totalSteps = questions.length

  // Get category label in Thai
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'sleep': return 'การนอนหลับ'
      case 'balance': return 'การทรงตัว'
      case 'body': return 'ร่างกาย'
      default: return ''
    }
  }

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
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={handleBack}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 transition-colors active:scale-95"
          aria-label="ย้อนกลับ"
        >
          <ChevronLeft className="h-8 w-8 text-gray-700" />
        </button>
        <div className="text-center">
          <span className="text-xl font-bold text-gray-900">
            {currentStep + 1} / {totalSteps}
          </span>
          <p className="text-sm text-gray-500">{getCategoryLabel(currentQuestion.category)}</p>
        </div>
        <div className="w-14" />
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex flex-1 flex-col px-5">
        {/* Large Emoji */}
        <div className="flex justify-center py-8">
          <span className="text-[100px]">{currentQuestion.emoji}</span>
        </div>

        {/* Question Text - Large Thai */}
        <div className="mb-8 text-center px-2">
          <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
            {currentQuestion.textThai}
          </h2>
        </div>

        {/* Extra Large Answer Buttons */}
        <div className="mt-auto flex flex-col gap-5 pb-8">
          {/* Yes Button */}
          <button
            onClick={() => handleAnswer(true)}
            className="flex w-full items-center justify-center gap-4 rounded-3xl bg-emerald-500 px-8 py-8 text-white shadow-lg transition-all active:scale-[0.98] active:bg-emerald-600"
            style={{ minHeight: '160px' }}
          >
            <span className="text-6xl">😊</span>
            <span className="text-5xl font-bold">ใช่</span>
          </button>

          {/* No Button */}
          <button
            onClick={() => handleAnswer(false)}
            className="flex w-full items-center justify-center gap-4 rounded-3xl bg-rose-500 px-8 py-8 text-white shadow-lg transition-all active:scale-[0.98] active:bg-rose-600"
            style={{ minHeight: '160px' }}
          >
            <span className="text-6xl">😔</span>
            <span className="text-5xl font-bold">ไม่ใช่</span>
          </button>
        </div>
      </div>
    </div>
  )
}
