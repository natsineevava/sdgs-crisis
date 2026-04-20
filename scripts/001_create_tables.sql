-- Dhamma Daily - Parkinson's Care Tracker Database Schema
-- This script creates all tables for the daily check-in system

-- 1. Patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tree_level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Daily check-ins table (raw answers)
CREATE TABLE IF NOT EXISTS daily_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
  checkin_time TIME NOT NULL DEFAULT CURRENT_TIME,
  -- 9 questions with boolean answers (true = positive/good, false = concerning)
  q1_sleep_well BOOLEAN,
  q2_sleep_talking BOOLEAN,
  q3_vivid_dreams BOOLEAN,
  q4_feel_steady BOOLEAN,
  q5_stumble BOOLEAN,
  q6_need_help_standing BOOLEAN,
  q7_dizzy BOOLEAN,
  q8_fatigue_heartbeat BOOLEAN,
  q9_eat_drink_well BOOLEAN,
  -- Additional fields
  caregiver_action_taken TEXT,
  podcast_used TEXT,
  doctor_review_flag TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Daily check-in results table (calculated/derived values)
CREATE TABLE IF NOT EXISTS daily_checkin_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checkin_id UUID NOT NULL UNIQUE REFERENCES daily_checkins(id) ON DELETE CASCADE,
  -- Sleep category scores
  sleep_score INTEGER DEFAULT 0,
  sleep_state TEXT,
  -- Balance category scores
  balance_score INTEGER DEFAULT 0,
  balance_state TEXT,
  -- Body regulation category scores
  body_score INTEGER DEFAULT 0,
  body_state TEXT,
  -- Overall scores
  total_score INTEGER DEFAULT 0,
  red_flag_count INTEGER DEFAULT 0,
  -- Alert levels: 'good' (green), 'monitor' (yellow), 'attention' (red)
  alert_level TEXT DEFAULT 'good',
  -- Messages
  patient_message TEXT,
  caregiver_message TEXT,
  -- Recommended podcast theme based on answers
  recommended_podcast TEXT,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Lookup table for question scoring
CREATE TABLE IF NOT EXISTS question_scoring (
  id SERIAL PRIMARY KEY,
  question_id TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- 'sleep', 'balance', 'body'
  question_thai TEXT NOT NULL,
  question_english TEXT NOT NULL,
  concerning_answer BOOLEAN NOT NULL, -- What answer indicates concern
  score_if_concerning INTEGER DEFAULT 1,
  is_red_flag BOOLEAN DEFAULT FALSE
);

-- 5. Lookup table for alert routing
CREATE TABLE IF NOT EXISTS alert_routing (
  id SERIAL PRIMARY KEY,
  red_flag_count_min INTEGER NOT NULL,
  red_flag_count_max INTEGER NOT NULL,
  total_score_min INTEGER,
  total_score_max INTEGER,
  alert_level TEXT NOT NULL,
  patient_message_thai TEXT NOT NULL,
  caregiver_message_thai TEXT NOT NULL,
  recommended_action TEXT
);

-- 6. Podcast recommendations based on categories
CREATE TABLE IF NOT EXISTS podcast_recommendations (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL, -- 'sleep', 'balance', 'body', 'general'
  podcast_name TEXT NOT NULL,
  podcast_description TEXT,
  audio_url TEXT
);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_checkin_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_scoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_routing ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_recommendations ENABLE ROW LEVEL SECURITY;

-- For now, allow public read/write access (can be restricted later with auth)
CREATE POLICY "Allow public access to patients" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to daily_checkins" ON daily_checkins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to daily_checkin_results" ON daily_checkin_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read on question_scoring" ON question_scoring FOR SELECT USING (true);
CREATE POLICY "Allow public read on alert_routing" ON alert_routing FOR SELECT USING (true);
CREATE POLICY "Allow public read on podcast_recommendations" ON podcast_recommendations FOR SELECT USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_checkins_patient_id ON daily_checkins(patient_id);
CREATE INDEX IF NOT EXISTS idx_checkins_date ON daily_checkins(checkin_date);
CREATE INDEX IF NOT EXISTS idx_results_checkin_id ON daily_checkin_results(checkin_id);
CREATE INDEX IF NOT EXISTS idx_results_alert_level ON daily_checkin_results(alert_level);
