// Types for Dhamma Daily app state
export interface CheckInAnswers {
  // Sleep Quality (REM Sleep Behavior Disorder)
  sleep1: boolean | null // Did you sleep well last night?
  sleep2: boolean | null // Did anyone notice you talking or moving during sleep?
  sleep3: boolean | null // Did you wake from a vivid or frightening dream?
  // Balance & Movement (Postural Instability)
  balance1: boolean | null // Did you feel steady while walking or standing today?
  balance2: boolean | null // Did you stumble or nearly fall today?
  balance3: boolean | null // Did you need help getting up from a seat?
  // Body Regulation (Autonomic Dysfunction / Hypotension)
  body1: boolean | null // Did you feel dizzy or lightheaded when standing up?
  body2: boolean | null // Did you feel unusually fatigued or notice an irregular heartbeat?
  body3: boolean | null // Did you drink enough water and eat well today?
}

export type CategoryLevel = 'good' | 'monitor' | 'attention'

export interface CategoryScore {
  level: CategoryLevel
  concerningCount: number
  levelThai: string
}

export interface CheckInResult {
  sleep: CategoryScore
  balance: CategoryScore
  body: CategoryScore
  overallLevel: CategoryLevel
  caregiverMessage: string
  caregiverMessageThai: string
  dhammaRecommendation: DhammaRecommendation | null
  date: string
}

export interface DhammaRecommendation {
  name: string
  nameThai: string
  rationale: string
  teacher: string
  duration: string
}

// Calculate concerning answers for each category
export function calculateCategoryScore(
  answers: boolean[],
  invertFirst?: boolean
): CategoryScore {
  // Count concerning answers
  // For some questions, "No" is concerning, for others "Yes" is concerning
  const concerningCount = answers.filter((a, i) => {
    if (a === null) return false
    // First answer in each category is typically inverted
    if (i === 0 && invertFirst) return !a // "No" is concerning
    return a // "Yes" is concerning for most questions
  }).length

  let level: CategoryLevel
  let levelThai: string

  if (concerningCount === 0) {
    level = 'good'
    levelThai = 'ดี'
  } else if (concerningCount === 1) {
    level = 'monitor'
    levelThai = 'ควรดูแล'
  } else {
    level = 'attention'
    levelThai = 'ต้องใส่ใจ'
  }

  return { level, concerningCount, levelThai }
}

// Sleep: Q1 (No=concerning), Q2 (Yes=concerning), Q3 (Yes=concerning)
export function calculateSleepScore(answers: CheckInAnswers): CategoryScore {
  const concerningCount = [
    answers.sleep1 === false, // No = concerning
    answers.sleep2 === true, // Yes = concerning
    answers.sleep3 === true, // Yes = concerning
  ].filter(Boolean).length

  return getScoreLevel(concerningCount)
}

// Balance: Q4 (No=concerning), Q5 (Yes=concerning), Q6 (Yes=concerning)
export function calculateBalanceScore(answers: CheckInAnswers): CategoryScore {
  const concerningCount = [
    answers.balance1 === false, // No = concerning
    answers.balance2 === true, // Yes = concerning
    answers.balance3 === true, // Yes = concerning
  ].filter(Boolean).length

  return getScoreLevel(concerningCount)
}

// Body: Q7 (Yes=concerning), Q8 (Yes=concerning), Q9 (No=concerning)
export function calculateBodyScore(answers: CheckInAnswers): CategoryScore {
  const concerningCount = [
    answers.body1 === true, // Yes = concerning
    answers.body2 === true, // Yes = concerning
    answers.body3 === false, // No = concerning
  ].filter(Boolean).length

  return getScoreLevel(concerningCount)
}

function getScoreLevel(concerningCount: number): CategoryScore {
  if (concerningCount === 0) {
    return { level: 'good', concerningCount, levelThai: 'ดี' }
  } else if (concerningCount === 1) {
    return { level: 'monitor', concerningCount, levelThai: 'ควรดูแล' }
  } else {
    return { level: 'attention', concerningCount, levelThai: 'ต้องใส่ใจ' }
  }
}

export function getOverallLevel(
  sleep: CategoryScore,
  balance: CategoryScore,
  body: CategoryScore
): CategoryLevel {
  // Worst single category determines overall
  if (
    sleep.level === 'attention' ||
    balance.level === 'attention' ||
    body.level === 'attention'
  ) {
    return 'attention'
  }
  if (
    sleep.level === 'monitor' ||
    balance.level === 'monitor' ||
    body.level === 'monitor'
  ) {
    return 'monitor'
  }
  return 'good'
}

export function getCaregiverMessage(overallLevel: CategoryLevel): {
  message: string
  messageThai: string
} {
  if (overallLevel === 'attention') {
    return {
      message:
        'Some symptoms need closer attention today. If they persist, contact the attending physician. A caregiver should check in in person.',
      messageThai:
        'ครอบครัว / ผู้ดูแล: ควรติดต่อหรือเยี่ยมวันนี้',
    }
  }
  if (overallLevel === 'monitor') {
    return {
      message:
        'There are mild signs worth watching. A warm phone call to check in would mean a lot today.',
      messageThai: 'ครอบครัว / ผู้ดูแล: แจ้งเตือนให้ติดตามอาการ',
    }
  }
  return {
    message:
      'No concerning symptoms today. Thank you for caring for one another.',
    messageThai: 'วันนี้ท่านดูดี — ครอบครัวสามารถสบายใจได้',
  }
}

export function getDhammaRecommendation(
  sleep: CategoryScore,
  balance: CategoryScore,
  body: CategoryScore
): DhammaRecommendation | null {
  // Priority order based on highest-scoring category
  if (sleep.concerningCount >= 2) {
    return {
      name: 'Mindfulness of Breathing',
      nameThai: 'อานาปานสติ',
      rationale:
        'Breath awareness calms the nervous system and prepares the body for rest.',
      teacher: 'หลวงพ่อชา สุภัทโท',
      duration: '15 minutes',
    }
  }
  if (body.concerningCount >= 2) {
    return {
      name: 'Loving-Kindness Meditation',
      nameThai: 'เมตตาภาวนา',
      rationale:
        'Reduces anxiety, cultivates inner warmth, and gently helps regulate the autonomic nervous system.',
      teacher: 'พระอาจารย์มิตซูโอะ คเวสโก',
      duration: '20 minutes',
    }
  }
  if (balance.concerningCount >= 2) {
    return {
      name: 'Body Mindfulness',
      nameThai: 'กายคตาสติ',
      rationale:
        "Rebuilds the patient's trust and awareness in their own body, reducing fear of movement.",
      teacher: 'หลวงปู่เทสก์ เทสรังสี',
      duration: '10 minutes',
    }
  }
  if (
    sleep.level === 'monitor' ||
    balance.level === 'monitor' ||
    body.level === 'monitor'
  ) {
    return {
      name: 'Morning Chanting',
      nameThai: 'บทสวดมนต์เช้า',
      rationale:
        'A gentle daily grounding ritual for mild or early-stage symptom days.',
      teacher: 'วัดอัมพวัน',
      duration: '10 minutes',
    }
  }
  // All good - no recommendation
  return null
}

export function calculateCheckInResult(
  answers: CheckInAnswers
): CheckInResult {
  const sleep = calculateSleepScore(answers)
  const balance = calculateBalanceScore(answers)
  const body = calculateBodyScore(answers)
  const overallLevel = getOverallLevel(sleep, balance, body)
  const { message, messageThai } = getCaregiverMessage(overallLevel)
  const dhammaRecommendation = getDhammaRecommendation(sleep, balance, body)

  return {
    sleep,
    balance,
    body,
    overallLevel,
    caregiverMessage: message,
    caregiverMessageThai: messageThai,
    dhammaRecommendation,
    date: new Date().toISOString(),
  }
}

// Initial empty answers
export const initialAnswers: CheckInAnswers = {
  sleep1: null,
  sleep2: null,
  sleep3: null,
  balance1: null,
  balance2: null,
  balance3: null,
  body1: null,
  body2: null,
  body3: null,
}
