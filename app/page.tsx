'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
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
  device_id?: string
  last_checkin_at?: string
  isNewUser?: boolean
}

// Generate a unique device ID for this browser
function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return ''
  
  const storageKey = 'dhamma_daily_device_id'
  let deviceId = localStorage.getItem(storageKey)
  
  if (!deviceId) {
    // Generate a unique ID using timestamp and random string
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem(storageKey, deviceId)
  }
  
  return deviceId
}

export default function DhammaDailyApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<Track | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deviceId, setDeviceId] = useState<string>('')

  // Memoize Supabase client to prevent recreation on every render
  const supabase = useMemo(() => createClient(), [])

  // Initialize device ID on client side
  useEffect(() => {
    const id = getOrCreateDeviceId()
    setDeviceId(id)
  }, [])

  // Fetch patient data by device ID
  const fetchPatient = useCallback(async () => {
    if (!deviceId) return
    
    try {
      const response = await fetch(`/api/patient?deviceId=${encodeURIComponent(deviceId)}`)
      const data = await response.json()
      
      if (response.ok) {
        setPatient(data)
      }
    } catch (error) {
      console.error('Failed to fetch patient:', error)
    }
    setIsLoading(false)
  }, [deviceId])

  // Set up realtime subscription
  useEffect(() => {
    if (!deviceId) return
    
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
          filter: `device_id=eq.${deviceId}`,
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
  }, [supabase, fetchPatient, deviceId])

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
        body: JSON.stringify({ answers, deviceId }),
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
            isSubmitting={isSubmitting}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsScreen
            treeLevel={checkInResult?.treeLevel || treeLevel}
            alertLevel={checkInResult?.alertLevel || 'good'}
            patientMessage={checkInResult?.patientMessage || 'วันนี้คุณดูแลตัวเองได้ดีมาก'}
            onHome={handleGoHome}
            onPlayPodcast={(podcast) => {
              // Go directly to playing the recommended podcast
              setCurrentTrack({
                id: podcast.id,
                nameThai: podcast.nameThai,
                nameEnglish: podcast.nameThai,
                teacher: podcast.teacher,
                duration: '15:00',
                image: podcast.image,
              })
              setCurrentScreen('nowplaying')
            }}
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
