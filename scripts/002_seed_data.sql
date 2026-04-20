-- Seed question scoring data based on the 9 questions
-- Category 1: Sleep Quality (REM Sleep Behavior Disorder) - Questions 1-3
-- Category 2: Balance & Movement (Postural Instability) - Questions 4-6
-- Category 3: Body Regulation (Autonomic Dysfunction) - Questions 7-9

INSERT INTO question_scoring (question_id, category, question_thai, question_english, concerning_answer, score_if_concerning, is_red_flag)
VALUES
  -- Sleep Category
  ('q1_sleep_well', 'sleep', 'คืนที่ผ่านมาหลับพักผ่อนได้ดีไหม?', 'Did you sleep well last night?', false, 1, false),
  ('q2_sleep_talking', 'sleep', 'มีคนสังเกตว่าคุณพูดหรือขยับตัวขณะหลับไหม?', 'Did anyone notice you talking or moving during sleep?', true, 1, true),
  ('q3_vivid_dreams', 'sleep', 'ตื่นนอนมาพร้อมความฝันที่วุ่นวายหรือน่ากลัวไหม?', 'Did you wake from a vivid or frightening dream?', true, 1, true),
  
  -- Balance Category
  ('q4_feel_steady', 'balance', 'รู้สึกมั่นคงขณะเดินหรือยืนวันนี้ไหม?', 'Did you feel steady while walking or standing today?', false, 1, false),
  ('q5_stumble', 'balance', 'มีการเซหรือเกือบล้มวันนี้ไหม?', 'Did you stumble or nearly fall today?', true, 2, true),
  ('q6_need_help_standing', 'balance', 'ต้องการความช่วยเหลือในการลุกขึ้นจากที่นั่งไหม?', 'Did you need help getting up from a seat?', true, 1, true),
  
  -- Body Regulation Category
  ('q7_dizzy', 'body', 'รู้สึกมึนหัวหรือเวียนศีรษะเมื่อลุกขึ้นยืนไหม?', 'Did you feel dizzy or lightheaded when standing up?', true, 2, true),
  ('q8_fatigue_heartbeat', 'body', 'รู้สึกอ่อนเพลียผิดปกติหรือหัวใจเต้นผิดจังหวะวันนี้ไหม?', 'Did you feel unusually fatigued or notice an irregular heartbeat?', true, 2, true),
  ('q9_eat_drink_well', 'body', 'ดื่มน้ำและรับประทานอาหารได้เพียงพอวันนี้ไหม?', 'Did you drink enough water and eat well today?', false, 1, false)
ON CONFLICT (question_id) DO NOTHING;

-- Seed alert routing rules
INSERT INTO alert_routing (red_flag_count_min, red_flag_count_max, total_score_min, total_score_max, alert_level, patient_message_thai, caregiver_message_thai, recommended_action)
VALUES
  -- Good state - no red flags
  (0, 0, 0, 2, 'good', 
   'วันนี้สุขภาพดีมากค่ะ ขอให้มีความสุขกับการฟังธรรมะนะคะ', 
   'ผู้ป่วยมีสุขภาพดีวันนี้ ไม่มีสิ่งที่น่ากังวล',
   'ไม่ต้องดำเนินการ'),
  
  -- Monitor state - some concerns
  (1, 2, 3, 5, 'monitor', 
   'วันนี้มีบางอย่างที่ต้องระวังนิดหน่อยนะคะ พักผ่อนให้เพียงพอ', 
   'มีบางอาการที่ควรติดตาม กรุณาสังเกตอาการในวันถัดไป',
   'ติดตามอาการ'),
  
  -- Attention state - needs attention
  (3, 9, 6, 15, 'attention', 
   'วันนี้มีหลายอย่างที่ต้องดูแลค่ะ กรุณาพักผ่อนและแจ้งผู้ดูแล', 
   'มีหลายอาการที่น่ากังวล กรุณาติดต่อผู้ป่วยหรือนัดพบแพทย์',
   'ติดต่อผู้ป่วย/นัดพบแพทย์')
ON CONFLICT DO NOTHING;

-- Seed podcast recommendations
INSERT INTO podcast_recommendations (category, podcast_name, podcast_description, audio_url)
VALUES
  ('sleep', 'ปล่อยวางใจ ก่อนนอน', 'ธรรมะเพื่อการนอนหลับอย่างสงบ ผ่อนคลายจิตใจ', '/audio/sleep-meditation.mp3'),
  ('sleep', 'สมาธิก่อนนอน', 'ฝึกสมาธิเบื้องต้นเพื่อจิตใจสงบ', '/audio/bedtime-meditation.mp3'),
  ('balance', 'สติในชีวิตประจำวัน', 'ฝึกสติในการเคลื่อนไหวและการเดิน', '/audio/mindful-movement.mp3'),
  ('balance', 'ลมหายใจแห่งความสงบ', 'ฝึกหายใจเพื่อความมั่นคงและสงบ', '/audio/breathing-calm.mp3'),
  ('body', 'พลังแห่งความกตัญญู', 'สร้างพลังบวกผ่านความกตัญญู', '/audio/gratitude.mp3'),
  ('body', 'เมตตาภาวนา', 'แผ่เมตตาเพื่อสุขภาพกายใจ', '/audio/loving-kindness.mp3'),
  ('general', 'ธรรมะยามเช้า', 'เริ่มต้นวันใหม่ด้วยธรรมะอันสงบ', '/audio/morning-dhamma.mp3'),
  ('general', 'นิทานธรรมะ', 'เรื่องเล่าธรรมะสำหรับผู้สูงอายุ', '/audio/dhamma-stories.mp3')
ON CONFLICT DO NOTHING;

-- Create a default patient for demo
INSERT INTO patients (id, name, tree_level)
VALUES ('00000000-0000-0000-0000-000000000001', 'คุณยายสิริวรรณ', 1)
ON CONFLICT (id) DO NOTHING;
