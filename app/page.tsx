'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { HomeScreen } from '@/components/home-screen'
import { CheckInFlow } from '@/components/checkin-flow'
import { ResultsScreen } from '@/components/results-screen'
import { PodcastScreen } from '@/components/podcast-screen'
import { PlaylistScreen } from '@/components/playlist-screen'
import { NowPlayingScreen } from '@/components/now-playing-screen'

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
  image?: string
  imageUrl?: string
  audioUrl?: string
}

interface CheckInResult {
  alertLevel: 'good' | 'monitor' | 'attention'
  patientMessage: string
  scores: {
    sleep: number
    balance: number
    body: number
    total: number
    redFlags: number
  }
  treeLevel: number
}

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

interface Patient {
  id: string
  name: string
  tree_level: number
}

const DEMO_PATIENT_ID = '00000000-0000-0000-0000-000000000001'

export default function DhammaDailyApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<Track | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  // Fetch patient data
  const fetchPatient = useCallback(async () => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', DEMO_PATIENT_ID)
      .single()

    if (!error && data) {
      setPatient(data)
    }
    setIsLoading(false)
  }, [supabase])

  // Set up realtime subscription
  useEffect(() => {
    fetchPatient()

    // Subscribe to patient changes (tree level updates)
    const patientChannel = supabase
      .channel('patient-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patients',
          filter: `id=eq.${DEMO_PATIENT_ID}`,
        },
        (payload) => {
          if (payload.new) {
            setPatient(payload.new as Patient)
          }
        }
      )
      .subscribe()

    // Subscribe to new check-in results
    const checkinChannel = supabase
      .channel('checkin-results')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'daily_checkin_results',
        },
        () => {
          // Refresh patient data when a new check-in result is inserted
          fetchPatient()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(patientChannel)
      supabase.removeChannel(checkinChannel)
    }
  }, [supabase, fetchPatient])

  const treeLevel = patient?.tree_level || 1

  const handleNavigate = (screen: 'listen' | 'checkin') => {
    setCurrentScreen(screen)
  }

  const handleCheckInComplete = async (answers: CheckInAnswers) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })

      const data = await response.json()

      if (data.success) {
        setCheckInResult({
          alertLevel: data.alertLevel,
          patientMessage: data.patientMessage,
          scores: data.scores,
          treeLevel: data.treeLevel,
        })
        // Update local patient state with new tree level
        setPatient(prev => prev ? { ...prev, tree_level: data.treeLevel } : prev)
        setCurrentScreen('results')
      } else {
        console.error('Check-in failed:', data.error)
        // Still show results even if DB fails
        setCurrentScreen('results')
      }
    } catch (error) {
      console.error('Check-in error:', error)
    } finally {
      setIsSubmitting(false)
    }
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
          <HomeScreen onNavigate={handleNavigate} userName={patient?.name} />
        )}

        {currentScreen === 'checkin' && (
          <CheckInFlow
            onComplete={handleCheckInComplete}
            onBack={handleGoHome}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsScreen
            treeLevel={checkInResult?.treeLevel || treeLevel}
            alertLevel={checkInResult?.alertLevel || 'good'}
            patientMessage={checkInResult?.patientMessage || 'วันนี้คุณดูแลตัวเองได้ดีมาก'}
            onHome={handleGoHome}
            onPodcast={() => setCurrentScreen('listen')}
          />
        )}

        {currentScreen === 'listen' && (
          <PodcastScreen
            onBack={handleGoHome}
            onPlay={handlePlayTrack}
            onSelectAlbum={handleSelectAlbum}
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
