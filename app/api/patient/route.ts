import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const DEFAULT_PATIENT_ID = '00000000-0000-0000-0000-000000000001'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: patient, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', DEFAULT_PATIENT_ID)
      .single()

    if (error) {
      // If patient doesn't exist, create one
      if (error.code === 'PGRST116') {
        const { data: newPatient, error: insertError } = await supabase
          .from('patients')
          .insert({
            id: DEFAULT_PATIENT_ID,
            name: 'คุณยาย',
            tree_level: 1,
          })
          .select()
          .single()

        if (insertError) {
          return NextResponse.json({ error: insertError.message }, { status: 500 })
        }

        return NextResponse.json(newPatient)
      }

      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(patient)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
