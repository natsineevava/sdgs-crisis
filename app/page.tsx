'use client'

import { useState, useEffect } from 'react'
import { HomeScreen } from '@/components/home-screen'
import { CheckInFlow } from '@/components/checkin-flow'
import { ResultsScreen } from '@/components/results-screen'
import { PodcastScreen } from '@/components/podcast-screen'
import { PlaylistScreen } from '@/components/playlist-screen'
import { NowPlayingScreen } from '@/components/now-playing-screen'
import { CaregiverDashboard } from '@/components/caregiver-dashboard'
import {
  calculateCheckInResult,
  type CheckInAnswers,
  type CheckInResult,
  type CategoryLevel,
} from '@/lib/store'

type Screen =
  | 'home'
  | 'checkin'
  | 'results'
  | 'listen'
  | 'playlist'
  | 'nowplaying'
  | 'caregiver'

interface Track {
  id: string
  nameThai: string
  nameEnglish: string
  teacher: string
  duration: string
  color?: string
}

interface DailyStatus {
  date: string
  overallLevel: CategoryLevel
  sleep: CategoryLevel
  balance: CategoryLevel
  body: CategoryLevel
}

export default function DhammaDailyApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<Track | null>(null)
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [history, setHistory] = useState<DailyStatus[]>([])

  // Load persisted data on mount
  useEffect(() => {
    const savedFocusMinutes = localStorage.getItem('dhamma-focus-minutes')
    const savedHistory = localStorage.getItem('dhamma-history')
    const savedResult = localStorage.getItem('dhamma-today-result')

    if (savedFocusMinutes) {
      setFocusMinutes(parseInt(savedFocusMinutes))
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
    if (savedResult) {
      const result = JSON.parse(savedResult)
      const today = new Date().toDateString()
      if (new Date(result.date).toDateString() === today) {
        setCheckInResult(result)
      }
    }
  }, [])

  const handleNavigate = (screen: 'listen' | 'checkin') => {
    setCurrentScreen(screen)
  }

  const handleCheckInComplete = (answers: CheckInAnswers) => {
    const result = calculateCheckInResult(answers)
    setCheckInResult(result)

    // Update focus minutes
    const newMinutes = focusMinutes + 5
    setFocusMinutes(newMinutes)
    localStorage.setItem('dhamma-focus-minutes', newMinutes.toString())

    // Save today's result
    localStorage.setItem('dhamma-today-result', JSON.stringify(result))

    // Add to history
    const newStatus: DailyStatus = {
      date: result.date,
      overallLevel: result.overallLevel,
      sleep: result.sleep.level,
      balance: result.balance.level,
      body: result.body.level,
    }
    const newHistory = [newStatus, ...history].slice(0, 30)
    setHistory(newHistory)
    localStorage.setItem('dhamma-history', JSON.stringify(newHistory))

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

  const handleViewDetail = () => {
    setCurrentScreen('caregiver')
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
            focusMinutes={focusMinutes}
            onViewDetail={handleViewDetail}
            onHome={handleGoHome}
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

        {currentScreen === 'caregiver' && (
          <CaregiverDashboard
            onBack={handleGoHome}
            currentResult={checkInResult}
            history={history}
          />
        )}
      </MobileContainer>
    </main>
  )
}
