'use client'

import { Calendar, MapPin, Users } from 'lucide-react'

export default function BookingsPage() {
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
          <select className="rounded-md border-gray-300 text-sm">
            <option>All Statuses</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <input
            type="date"
            className="rounded-md border-gray-300 text-sm"
            placeholder="Filter by date"
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {/* Sample Booking Card */}
        {[1, 2, 3].map((booking) => (
          <div
            key={booking}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold">Machu Picchu Adventure</h3>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Mar 15 - Mar 18, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>2 Guests</span>
                  </div>
                </div>

                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmed
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <p className="text-2xl font-bold text-gray-900">$599</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 