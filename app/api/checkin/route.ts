import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

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
  q10: boolean
  q11: boolean
  q12: boolean
}

// Question scoring: which answer is "concerning" for each question
const questionConcerning: Record<string, boolean> = {
  q1: false, // Concerning if NO (didn't sleep well)
  q2: true,  // Concerning if YES (talking/moving in sleep)
  q3: true,  // Concerning if YES (vivid/frightening dreams)
  q4: false, // Concerning if NO (didn't feel steady)
  q5: true,  // Concerning if YES (stumbled/nearly fell)
  q6: true,  // Concerning if YES (needed help)
  q7: true,  // Concerning if YES (dizzy)
  q8: true,  // Concerning if YES (fatigue/irregular heartbeat)
  q9: false, // Concerning if NO (didn't eat/drink well)
  q10: true, // Concerning if YES (hoping for message - longing)
  q11: true, // Concerning if YES (miss family)
  q12: true, // Concerning if YES (worried)
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { answers, deviceId } = await request.json() as { answers: CheckInAnswers; deviceId: string }

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID required' }, { status: 400 })
    }

    // Find patient by device ID
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .eq('device_id', deviceId)
      .single()

    if (patientError || !patient) {
      console.error('Patient not found:', patientError)
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    // Calculate scores
    let sleepScore = 0
    let balanceScore = 0
    let bodyScore = 0
    let mentalScore = 0
    let redFlagCount = 0

    // Sleep category (q1, q2, q3)
    if (answers.q1 === questionConcerning.q1) sleepScore++
    if (answers.q2 === questionConcerning.q2) {
      sleepScore++
      redFlagCount++
    }
    if (answers.q3 === questionConcerning.q3) sleepScore++

    // Balance category (q4, q5, q6)
    if (answers.q4 === questionConcerning.q4) balanceScore++
    if (answers.q5 === questionConcerning.q5) {
      balanceScore++
      redFlagCount++
    }
    if (answers.q6 === questionConcerning.q6) balanceScore++

    // Body category (q7, q8, q9)
    if (answers.q7 === questionConcerning.q7) {
      bodyScore++
      redFlagCount++
    }
    if (answers.q8 === questionConcerning.q8) {
      bodyScore++
      redFlagCount++
    }
    if (answers.q9 === questionConcerning.q9) bodyScore++

    // Mental category (q10, q11, q12)
    const q10Concerning = answers.q10 === questionConcerning.q10
    const q11Concerning = answers.q11 === questionConcerning.q11
    const q12Concerning = answers.q12 === questionConcerning.q12
    
    if (q10Concerning) mentalScore++
    if (q11Concerning) mentalScore++
    if (q12Concerning) mentalScore++

    const totalScore = sleepScore + balanceScore + bodyScore + mentalScore

    // Determine physical alert level
    let alertLevel = 'good'
    let patientMessage = 'วันนี้คุณดูแลตัวเองได้ดีมาก ขอให้มีความสุขนะคะ'
    let caregiverMessage = 'วันนี้ผู้ป่วยมีอาการปกติ ไม่มีสัญญาณเตือน'

    if (redFlagCount >= 2 || (sleepScore + balanceScore + bodyScore) >= 6) {
      alertLevel = 'attention'
      patientMessage = 'วันนี้ควรพักผ่อนและบอกผู้ดูแลด้วยนะคะ'
      caregiverMessage = 'มีอาการที่ต้องเฝ้าระวัง กรุณาติดต่อแพทย์หากอาการไม่ดีขึ้น'
    } else if (redFlagCount >= 1 || (sleepScore + balanceScore + bodyScore) >= 3) {
      alertLevel = 'monitor'
      patientMessage = 'วันนี้มีบางอย่างที่ควรระวังนะคะ พักผ่อนให้เพียงพอ'
      caregiverMessage = 'มีอาการที่ควรติดตาม กรุณาสังเกตอาการเพิ่มเติม'
    }

    // Mental category caregiver message (pattern-based, not just score)
    let mentalCaregiverMessage = ''
    const longingFamily = q10Concerning || q11Concerning
    const worried = q12Concerning

    if (longingFamily && worried) {
      // Both longing and worried
      mentalCaregiverMessage = 'วันนี้ท่านทั้งคิดถึงและมีเรื่องในใจ — นี่คือวันที่การโทรหาสักครั้งมีความหมายมากที่สุด'
    } else if (longingFamily) {
      // Longing for family
      mentalCaregiverMessage = 'วันนี้ท่านรอข้อความจากคุณอยู่'
    } else if (worried) {
      // Worried
      mentalCaregiverMessage = 'วันนี้มีบางอย่างที่ค้างคาใจท่านอยู่'
    } else {
      // All good
      mentalCaregiverMessage = 'วันนี้ท่านสบายใจและไม่มีอะไรค้างคา'
    }

    // Combine caregiver messages
    if (mentalScore > 0) {
      caregiverMessage = caregiverMessage + ' | ' + mentalCaregiverMessage
    }

    // Determine recommended Dhamma based on mental state
    let recommendedDhamma = ''
    if (mentalScore >= 2) {
      if (longingFamily && !worried) {
        recommendedDhamma = 'ปีติภาวนา' // For longing - inner warmth
      } else if (worried) {
        recommendedDhamma = 'เมตตาภาวนา' // For worry - letting go
      }
    }

    // Determine state labels
    const getState = (score: number) => {
      if (score === 0) return 'good'
      if (score === 1) return 'monitor'
      return 'attention'
    }

    // Mental state has special labels
    const getMentalState = (score: number) => {
      if (score === 0) return 'สบายใจดี'
      if (score === 1) return 'ควรใส่ใจ'
      return 'คิดถึงใครบางคน'
    }

    const now = new Date().toISOString()

    // Insert check-in record
    const { data: checkin, error: checkinError } = await supabase
      .from('daily_checkins')
      .insert({
        patient_id: patient.id,
        q1_sleep_well: answers.q1,
        q2_sleep_talking: answers.q2,
        q3_vivid_dreams: answers.q3,
        q4_feel_steady: answers.q4,
        q5_stumble: answers.q5,
        q6_need_help_standing: answers.q6,
        q7_dizzy: answers.q7,
        q8_fatigue_heartbeat: answers.q8,
        q9_eat_drink_well: answers.q9,
        q10_waiting_message: answers.q10,
        q11_miss_family: answers.q11,
        q12_worried: answers.q12,
      })
      .select()
      .single()

    if (checkinError) {
      console.error('Check-in insert error:', checkinError)
      return NextResponse.json({ error: checkinError.message }, { status: 500 })
    }

    // Insert results record
    const { error: resultsError } = await supabase
      .from('daily_checkin_results')
      .insert({
        checkin_id: checkin.id,
        sleep_score: sleepScore,
        sleep_state: getState(sleepScore),
        balance_score: balanceScore,
        balance_state: getState(balanceScore),
        body_score: bodyScore,
        body_state: getState(bodyScore),
        mental_score: mentalScore,
        mental_state: getMentalState(mentalScore),
        total_score: totalScore,
        red_flag_count: redFlagCount,
        alert_level: alertLevel,
        patient_message: patientMessage,
        caregiver_message: caregiverMessage,
        recommended_podcast: recommendedDhamma,
      })

    if (resultsError) {
      console.error('Results insert error:', resultsError)
      return NextResponse.json({ error: resultsError.message }, { status: 500 })
    }

    // Increment tree level (max 21) and update last_checkin_at
    const currentLevel = patient.tree_level || 1
    const newLevel = Math.min(currentLevel + 1, 21)

    const { error: updateError } = await supabase
      .from('patients')
      .update({ 
        tree_level: newLevel,
        last_checkin_at: now,
      })
      .eq('id', patient.id)

    if (updateError) {
      console.error('Patient update error:', updateError)
    }

    return NextResponse.json({
      success: true,
      checkinId: checkin.id,
      treeLevel: newLevel,
      alertLevel,
      patientMessage,
      caregiverMessage,
      mentalCaregiverMessage,
      recommendedDhamma,
      lastCheckinAt: now,
      scores: {
        sleep: sleepScore,
        balance: balanceScore,
        body: bodyScore,
        mental: mentalScore,
        total: totalScore,
        redFlags: redFlagCount,
      },
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
