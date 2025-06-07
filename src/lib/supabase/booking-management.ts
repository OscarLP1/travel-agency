import { supabase } from '../supabase'

export interface BookingData {
  user_id: string
  destination_id: string
  check_in: string // Date string
  check_out: string // Date string
  guests: number
  total_amount: number
  notes?: string
  status?: string
  payment_intent_id?: string
}

export async function createBooking(bookingData: BookingData) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...bookingData,
        status: bookingData.status || 'pending'
      })
      .select(`
        *,
        destinations (
          id,
          name,
          location,
          image_url,
          price
        )
      `)
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in createBooking:', error)
    return null
  }
}

export async function getUserBookings(userId: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        destinations (
          id,
          name,
          location,
          image_url,
          price,
          duration
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user bookings:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getUserBookings:', error)
    return null
  }
}

export async function getBookingById(bookingId: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        destinations (
          id,
          name,
          location,
          image_url,
          price,
          duration,
          description
        ),
        clerk_users (
          id,
          full_name,
          email
        )
      `)
      .eq('id', bookingId)
      .single()

    if (error) {
      console.error('Error fetching booking:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getBookingById:', error)
    return null
  }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single()

    if (error) {
      console.error('Error updating booking status:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateBookingStatus:', error)
    return null
  }
}

export async function getDestinationById(destinationId: string) {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', destinationId)
      .single()

    if (error) {
      console.error('Error fetching destination:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getDestinationById:', error)
    return null
  }
}

export async function getDestinationBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching destination by slug:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getDestinationBySlug:', error)
    return null
  }
} 