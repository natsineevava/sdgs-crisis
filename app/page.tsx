'use client'

import { useState, useEffect } from 'react'
import { HomeScreen } from '@/components/home-screen'
import { CheckInFlow } from '@/components/checkin-flow'
import { ResultsScreen } from '@/components/results-screen'
import { PodcastScreen } from '@/components/podcast-screen'
import { PlaylistScreen } from '@/components/playlist-screen'
import { NowPlayingScreen } from '@/components/now-playing-screen'
import {
  calculateCheckInResult,
  type CheckInAnswers,
  type CheckInResult,
} from '@/lib/store'

type Screen =
  | 'home'
  | 'checkin'
  | 'results'
  | 'listen'
  | 'playlist'
  | 'nowplaying'

interface Track {
  id: string
  nameThai: string
  nameEnglish: string
  teacher: string
  duration: string
  color?: string
}

export default function DhammaDailyApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<Track | null>(null)
  const [treeLevel, setTreeLevel] = useState(1) // 1-21 levels

  // Load persisted data on mount
  useEffect(() => {
    const savedTreeLevel = localStorage.getItem('dhamma-tree-level')
    const savedLastCheckIn = localStorage.getItem('dhamma-last-checkin')
    const savedResult = localStorage.getItem('dhamma-today-result')

    if (savedTreeLevel) {
      setTreeLevel(parseInt(savedTreeLevel))
    }
    
    if (savedResult) {
      const result = JSON.parse(savedResult)
      const today = new Date().toDateString()
      if (new Date(result.date).toDateString() === today) {
        setCheckInResult(result)
      }
    }

    // Check if it's a new day - allow check-in again
    if (savedLastCheckIn) {
      const lastDate = new Date(savedLastCheckIn).toDateString()
      const today = new Date().toDateString()
      if (lastDate !== today) {
        // New day - user can check in again
        localStorage.removeItem('dhamma-today-result')
        setCheckInResult(null)
      }
    }
  }, [])

  const handleNavigate = (screen: 'listen' | 'checkin') => {
    setCurrentScreen(screen)
  }

  const handleCheckInComplete = (answers: CheckInAnswers) => {
    const result = calculateCheckInResult(answers)
    setCheckInResult(result)

    // Increase tree level (max 21)
    const newLevel = Math.min(treeLevel + 1, 21)
    setTreeLevel(newLevel)
    localStorage.setItem('dhamma-tree-level', newLevel.toString())

    // Save today's result and check-in date
    localStorage.setItem('dhamma-today-result', JSON.stringify(result))
    localStorage.setItem('dhamma-last-checkin', new Date().toISOString())

    setCurrentScreen('results')
  }

  const handleSelectAlbum = (track: Track) => {
    setSelectedAlbum(track)
    setCurrentScreen('playlist')
  }

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track)
    setCurrentScreen('nowplaying')
  }

  const handleGoHome = () => {
    setCurrentScreen('home')
  }

  // Mobile container wrapper
  const MobileContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto min-h-screen w-full max-w-md bg-white shadow-xl">
      {children}
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-100">
      <MobileContainer>
        {currentScreen === 'home' && (
          <HomeScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'checkin' && (
          <CheckInFlow
            onComplete={handleCheckInComplete}
            onBack={handleGoHome}
          />
        )}

        {currentScreen === 'results' && checkInResult && (
          <ResultsScreen
            result={checkInResult}
            treeLevel={treeLevel}
            onHome={handleGoHome}
            onPodcast={() => setCurrentScreen('listen')}
          />
        )}

        {currentScreen === 'listen' && (
          <PodcastScreen
            onBack={handleGoHome}
            onPlay={handlePlayTrack}
            onSelectAlbum={handleSelectAlbum}
            recommendedTrack={checkInResult?.dhammaRecommendation}
          />
        )}

        {currentScreen === 'playlist' && selectedAlbum && (
          <PlaylistScreen
            album={selectedAlbum}
            onBack={() => setCurrentScreen('listen')}
            onPlay={handlePlayTrack}
          />
        )}

        {currentScreen === 'nowplaying' && currentTrack && (
          <NowPlayingScreen
            track={currentTrack}
            onClose={() => setCurrentScreen(selectedAlbum ? 'playlist' : 'listen')}
          />
        )}
      </MobileContainer>
    </main>
  )
}
