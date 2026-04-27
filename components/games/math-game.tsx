'use client'

import { useState, useEffect, useCallback } from 'react'

interface MathQuestion {
  num1: number
  num2: number
  operator: '+' | '-'
  correctAnswer: number
  options: number[]
}

interface MathGameResult {
  correct: number
  total: number
  avgTime: number
  times: number[]
}

interface MathGameProps {
  onComplete: (result: MathGameResult) => void
  onBack: () => void
}

function generateQuestion(): MathQuestion {
  const num1 = Math.floor(Math.random() * 9) + 1
  const num2 = Math.floor(Math.random() * 9) + 1
  const operator = Math.random() > 0.5 ? '+' : '-'
  
  let correctAnswer: number
  let actualNum1 = num1
  let actualNum2 = num2
  
  if (operator === '-') {
    // Ensure no negative answers
    actualNum1 = Math.max(num1, num2)
    actualNum2 = Math.min(num1, num2)
    correctAnswer = actualNum1 - actualNum2
  } else {
    correctAnswer = num1 + num2
  }
  
  // Generate 4 options including the correct answer
  const options = new Set<number>([correctAnswer])
  while (options.size < 4) {
    const offset = Math.floor(Math.random() * 5) - 2
    const wrongAnswer = correctAnswer + offset
    if (wrongAnswer >= 0 && wrongAnswer !== correctAnswer) {
      options.add(wrongAnswer)
    }
  }
  
  // Shuffle options
  const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5)
  
  return {
    num1: actualNum1,
    num2: actualNum2,
    operator,
    correctAnswer,
    options: shuffledOptions,
  }
}

export function MathGame({ onComplete, onBack }: MathGameProps) {
  const [questions] = useState<MathQuestion[]>(() => 
    Array.from({ length: 5 }, () => generateQuestion())
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<{ correct: boolean; time: number }[]>([])
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [timeLeft, setTimeLeft] = useState(5)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const currentQuestion = questions[currentIndex]

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setStartTime(Date.now())
      setTimeLeft(5)
      setIsAnswered(false)
      setSelectedAnswer(null)
    } else {
      // Game complete
      const correct = results.filter(r => r.correct).length
      const times = results.map(r => r.time)
      const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0
      
      onComplete({
        correct,
        total: questions.length,
        avgTime: Math.round(avgTime * 100) / 100,
        times,
      })
    }
  }, [currentIndex, questions.length, results, onComplete])

  const handleAnswer = useCallback((answer: number) => {
    if (isAnswered) return
    
    const timeTaken = (Date.now() - startTime) / 1000
    const isCorrect = answer === currentQuestion.correctAnswer
    
    setSelectedAnswer(answer)
    setIsAnswered(true)
    setResults(prev => [...prev, { correct: isCorrect, time: timeTaken }])
    
    // Auto advance after short delay
    setTimeout(() => {
      handleNextQuestion()
    }, 800)
  }, [isAnswered, startTime, currentQuestion.correctAnswer, handleNextQuestion])

  // Timer countdown
  useEffect(() => {
    if (isAnswered) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - mark as wrong
          handleAnswer(-999) // Invalid answer
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isAnswered, handleAnswer])

  // Reset timer when question changes
  useEffect(() => {
    setStartTime(Date.now())
    setTimeLeft(5)
  }, [currentIndex])

  const getButtonStyle = (option: number) => {
    if (!isAnswered) {
      return 'bg-white border-2 border-gray-200 text-gray-900 active:scale-95 active:bg-gray-50'
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-emerald-500 border-2 border-emerald-500 text-white'
    }
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return 'bg-rose-500 border-2 border-rose-500 text-white'
    }
    return 'bg-gray-100 border-2 border-gray-200 text-gray-400'
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-white">
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
          <p className="text-lg font-bold text-gray-900">{currentIndex + 1} / {questions.length}</p>
          <p className="text-sm text-purple-600">เกมส์บวกเลข</p>
        </div>
        <div className="w-12" />
      </div>

      {/* Timer */}
      <div className="px-5 pb-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              timeLeft <= 2 ? 'bg-rose-500' : 'bg-purple-500'
            }`}
            style={{ width: `${(timeLeft / 5) * 100}%` }}
          />
        </div>
        <p className="mt-1 text-center text-sm text-gray-500">{timeLeft} วินาที</p>
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col items-center justify-center px-5">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-center text-6xl font-bold text-gray-900">
            {currentQuestion.num1} {currentQuestion.operator} {currentQuestion.num2} = ?
          </p>
        </div>

        {/* Options - 2x2 Grid */}
        <div className="grid w-full max-w-sm grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`rounded-2xl p-6 text-4xl font-bold shadow-md transition-all ${getButtonStyle(option)}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 pb-8">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              index < results.length
                ? results[index]?.correct
                  ? 'bg-emerald-500'
                  : 'bg-rose-500'
                : index === currentIndex
                ? 'bg-purple-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
