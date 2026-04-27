'use client'

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

interface GameResultsProps {
  mathResult: MathGameResult | null
  reactionResult: ReactionGameResult | null
  onHome: () => void
}

export function GameResults({ mathResult, reactionResult, onHome }: GameResultsProps) {
  // Calculate overall status
  const getOverallStatus = () => {
    let score = 0
    let maxScore = 0
    
    if (mathResult) {
      maxScore += 2
      if (mathResult.correct >= 4) score += 2
      else if (mathResult.correct >= 3) score += 1
    }
    
    if (reactionResult) {
      maxScore += 2
      if (reactionResult.status === 'perfect') score += 2
      else if (reactionResult.status === 'good') score += 1.5
      else if (reactionResult.status === 'slow') score += 0.5
    }
    
    const percentage = maxScore > 0 ? score / maxScore : 0
    
    if (percentage >= 0.8) {
      return {
        level: 'excellent',
        title: 'ดีมาก',
        message: 'วันนี้คุณมีสติและสมาธิดีมาก ใจนิ่งและพร้อม',
        emoji: '🌟',
        color: 'from-emerald-400 to-emerald-600',
        bgColor: 'bg-emerald-50',
      }
    } else if (percentage >= 0.5) {
      return {
        level: 'good',
        title: 'ปานกลาง',
        message: 'วันนี้อยู่ในจุดที่ดี ลองค่อยๆ ดูแลตัวเองต่อไปนะ',
        emoji: '✨',
        color: 'from-amber-400 to-amber-600',
        bgColor: 'bg-amber-50',
      }
    } else {
      return {
        level: 'rest',
        title: 'ควรพัก',
        message: 'วันนี้อาจเหนื่อยนิดหน่อย ลองพักใจแล้วกลับมาใหม่',
        emoji: '💛',
        color: 'from-blue-400 to-blue-600',
        bgColor: 'bg-blue-50',
      }
    }
  }

  const status = getOverallStatus()

  const getMathInsight = () => {
    if (!mathResult) return null
    
    const accuracy = mathResult.correct / mathResult.total
    const avgTime = mathResult.avgTime
    
    if (accuracy >= 0.8 && avgTime < 3) {
      return { text: 'สมาธิดี คิดเร็วและถูกต้อง', emoji: '🧠' }
    } else if (accuracy >= 0.8) {
      return { text: 'ถูกต้องดี แต่อาจล้าเล็กน้อย', emoji: '💭' }
    } else if (accuracy >= 0.6) {
      return { text: 'พอใช้ได้ ลองพักแล้วมาใหม่', emoji: '🌱' }
    } else {
      return { text: 'วันนี้อาจมีอะไรรบกวนใจ', emoji: '🍃' }
    }
  }

  const getReactionInsight = () => {
    if (!reactionResult) return null
    
    switch (reactionResult.status) {
      case 'perfect':
        return { text: 'มีสติดีมาก ตอบสนองได้เร็ว', emoji: '⚡' }
      case 'good':
        return { text: 'จังหวะพอดี ใจนิ่ง', emoji: '🎯' }
      case 'slow':
        return { text: 'ใจอาจยังไม่พร้อม ค่อยๆ มา', emoji: '🐢' }
      case 'early':
        return { text: 'ใจรีบไปนิด ลองหายใจลึกๆ', emoji: '💨' }
      default:
        return null
    }
  }

  const mathInsight = getMathInsight()
  const reactionInsight = getReactionInsight()

  return (
    <div className={`flex min-h-screen flex-col ${status.bgColor}`}>
      {/* Header */}
      <div className="px-5 py-6">
        <p className="text-center text-lg font-medium text-gray-600">ผลสรุปวันนี้</p>
      </div>

      {/* Main Result */}
      <div className="flex flex-1 flex-col items-center px-5">
        <div className={`mb-6 rounded-3xl bg-gradient-to-br ${status.color} p-8 shadow-xl`}>
          <span className="text-8xl">{status.emoji}</span>
        </div>
        
        <h1 className="mb-2 text-4xl font-bold text-gray-900">{status.title}</h1>
        <p className="mb-8 max-w-xs text-center text-lg text-gray-600">{status.message}</p>

        {/* Detail Cards */}
        <div className="w-full space-y-3">
          {/* Math Result */}
          {mathResult && mathInsight && (
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                <span className="text-2xl">{mathInsight.emoji}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">เกมส์บวกเลข</p>
                <p className="text-sm text-gray-600">{mathInsight.text}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{mathResult.correct}/{mathResult.total}</p>
                <p className="text-xs text-gray-500">เฉลี่ย {mathResult.avgTime}วิ</p>
              </div>
            </div>
          )}

          {/* Reaction Result */}
          {reactionResult && reactionInsight && (
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-100">
                <span className="text-2xl">{reactionInsight.emoji}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">เกมส์วัดสติ</p>
                <p className="text-sm text-gray-600">{reactionInsight.text}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-rose-600">{reactionResult.reactionTime}ms</p>
                {reactionResult.earlyTaps > 0 && (
                  <p className="text-xs text-gray-500">กดเร็ว {reactionResult.earlyTaps} ครั้ง</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Home Button */}
      <div className="px-5 pb-8">
        <button
          onClick={onHome}
          className="w-full rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 py-5 text-xl font-bold text-white shadow-lg transition-all active:scale-[0.98]"
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  )
}
