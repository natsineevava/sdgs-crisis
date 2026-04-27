'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type GameState = 'waiting' | 'ready' | 'go' | 'early' | 'result'

interface ReactionGameResult {
  reactionTime: number | null
  earlyTaps: number
  status: 'perfect' | 'good' | 'slow' | 'early'
}

interface ReactionGameProps {
  onComplete: (result: ReactionGameResult) => void
  onBack: () => void
}

export function ReactionGame({ onComplete, onBack }: ReactionGameProps) {
  const [gameState, setGameState] = useState<GameState>('waiting')
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [earlyTaps, setEarlyTaps] = useState(0)
  const [round, setRound] = useState(1)
  const [results, setResults] = useState<number[]>([])
  const goTimeRef = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const totalRounds = 3

  const startRound = useCallback(() => {
    setGameState('ready')
    setReactionTime(null)
    
    // Random delay between 2-5 seconds
    const delay = 2000 + Math.random() * 3000
    
    timeoutRef.current = setTimeout(() => {
      setGameState('go')
      goTimeRef.current = Date.now()
    }, delay)
  }, [])

  const handleTap = useCallback(() => {
    if (gameState === 'waiting') {
      startRound()
      return
    }
    
    if (gameState === 'ready') {
      // Tapped too early!
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setEarlyTaps(prev => prev + 1)
      setGameState('early')
      
      // Reset after showing message
      setTimeout(() => {
        setGameState('waiting')
      }, 1500)
      return
    }
    
    if (gameState === 'go') {
      const time = Date.now() - goTimeRef.current
      setReactionTime(time)
      setResults(prev => [...prev, time])
      setGameState('result')
      
      // Move to next round or complete
      setTimeout(() => {
        if (round < totalRounds) {
          setRound(prev => prev + 1)
          setGameState('waiting')
        } else {
          // Calculate final result
          const avgTime = results.length > 0 
            ? [...results, time].reduce((a, b) => a + b, 0) / (results.length + 1)
            : time
          
          let status: ReactionGameResult['status']
          if (earlyTaps >= 2) {
            status = 'early'
          } else if (avgTime < 300) {
            status = 'perfect'
          } else if (avgTime < 500) {
            status = 'good'
          } else {
            status = 'slow'
          }
          
          onComplete({
            reactionTime: Math.round(avgTime),
            earlyTaps,
            status,
          })
        }
      }, 1500)
    }
  }, [gameState, startRound, round, results, earlyTaps, onComplete])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'waiting':
        return 'bg-gradient-to-b from-blue-400 to-blue-600'
      case 'ready':
        return 'bg-gradient-to-b from-rose-500 to-rose-700'
      case 'go':
        return 'bg-gradient-to-b from-emerald-400 to-emerald-600'
      case 'early':
        return 'bg-gradient-to-b from-amber-400 to-amber-600'
      case 'result':
        return 'bg-gradient-to-b from-purple-400 to-purple-600'
      default:
        return 'bg-gradient-to-b from-gray-400 to-gray-600'
    }
  }

  const getMessage = () => {
    switch (gameState) {
      case 'waiting':
        return {
          title: 'แตะเพื่อเริ่ม',
          subtitle: `รอบที่ ${round} / ${totalRounds}`,
          emoji: '👆',
        }
      case 'ready':
        return {
          title: 'รอ...',
          subtitle: 'รอจังหวะที่เหมาะสม',
          emoji: '🔴',
        }
      case 'go':
        return {
          title: 'แตะเลย!',
          subtitle: 'ตอนนี้!',
          emoji: '🟢',
        }
      case 'early':
        return {
          title: 'ใจรีบไป',
          subtitle: 'รอให้เขียวก่อนนะ',
          emoji: '😅',
        }
      case 'result':
        const time = reactionTime || 0
        if (time < 300) {
          return {
            title: `${time} มิลลิวินาที`,
            subtitle: 'เร็วมาก! สติดี',
            emoji: '⚡',
          }
        } else if (time < 500) {
          return {
            title: `${time} มิลลิวินาที`,
            subtitle: 'ดีมาก! จังหวะพอดี',
            emoji: '✨',
          }
        } else {
          return {
            title: `${time} มิลลิวินาที`,
            subtitle: 'ค่อยๆ มานะ',
            emoji: '💪',
          }
        }
      default:
        return { title: '', subtitle: '', emoji: '' }
    }
  }

  const message = getMessage()

  return (
    <div className={`flex min-h-screen flex-col ${getBackgroundColor()} transition-colors duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-all active:scale-95"
        >
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-lg font-bold text-white">{round} / {totalRounds}</p>
          <p className="text-sm text-white/80">เกมส์วัดสติ</p>
        </div>
        <div className="w-12" />
      </div>

      {/* Game Area */}
      <button
        onClick={handleTap}
        className="flex flex-1 flex-col items-center justify-center px-8"
      >
        <span className="mb-6 text-9xl">{message.emoji}</span>
        <h1 className="mb-2 text-4xl font-bold text-white">{message.title}</h1>
        <p className="text-xl text-white/90">{message.subtitle}</p>
      </button>

      {/* Progress dots */}
      <div className="flex justify-center gap-3 pb-8">
        {Array.from({ length: totalRounds }).map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full transition-all ${
              index < results.length
                ? 'bg-white'
                : index === round - 1 && gameState !== 'waiting'
                ? 'bg-white/50 animate-pulse'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Early tap counter */}
      {earlyTaps > 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <p className="text-sm text-white/70">กดก่อนเวลา: {earlyTaps} ครั้ง</p>
        </div>
      )}
    </div>
  )
}
