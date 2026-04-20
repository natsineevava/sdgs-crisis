import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get device ID from query params or header
    const url = new URL(request.url)
    const deviceId = url.searchParams.get('deviceId')
    
    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID required' }, { status: 400 })
    }

    // Try to find existing patient by device ID
    const { data: existingPatient, error: findError } = await supabase
      .from('patients')
      .select('*')
      .eq('device_id', deviceId)
      .single()

    if (existingPatient) {
      // Existing user found
      return NextResponse.json({
        ...existingPatient,
        isNewUser: false,
      })
    }

    // No existing patient found - create new one
    if (findError && findError.code === 'PGRST116') {
      const { data: newPatient, error: insertError } = await supabase
        .from('patients')
        .insert({
          name: 'คุณ',
          tree_level: 1,
          device_id: deviceId,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Insert patient error:', insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }

      return NextResponse.json({
        ...newPatient,
        isNewUser: true,
      })
    }

    if (findError) {
      console.error('Find patient error:', findError)
      return NextResponse.json({ error: findError.message }, { status: 500 })
    }

    return NextResponse.json({ error: 'Unexpected state' }, { status: 500 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Update patient name
export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const { deviceId, name } = await request.json()

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID required' }, { status: 400 })
    }

    const { data: patient, error } = await supabase
      .from('patients')
      .update({ name })
      .eq('device_id', deviceId)
      .select()
      .single()

    if (error) {
      console.error('Update patient error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(patient)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
