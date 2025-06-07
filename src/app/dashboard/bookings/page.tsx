'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { getUserBookings } from '@/lib/supabase/booking-management'

interface Booking {
  id: string
  check_in: string
  check_out: string
  guests: number
  total_amount: number
  status: string
  created_at: string
  destinations: {
    id: string
    name: string
    location: string
    image_url: string
    price: number
    duration: string
  }
}

export default function BookingsPage() {
  const { user } = useUser()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return
      
      try {
        const bookingsData = await getUserBookings(user.id)
        if (bookingsData) {
          setBookings(bookingsData)
        }
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [user])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status.toLowerCase() === filter.toLowerCase()
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Bookings</h1>
          <p className="mt-1 text-sm text-gray-600">Loading your bookings...</p>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Bookings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your travel bookings and reservations
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? "You haven't made any bookings yet. Start exploring our destinations!" 
                : `No ${filter} bookings found.`
              }
            </p>
            <a 
              href="/destinations" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Explore Destinations
            </a>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-semibold">{booking.destinations.name}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{booking.destinations.duration}</span>
                    </div>
                  </div>

                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <p className="text-2xl font-bold text-gray-900">${booking.total_amount}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Booked {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 