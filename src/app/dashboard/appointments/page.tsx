'use client'

import { Calendar, Clock, Video } from 'lucide-react'

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Travel Consultations</h1>
        <p className="mt-1 text-sm text-gray-600">
          Schedule and manage your travel consultation appointments
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
            <Video className="h-5 w-5 mr-2" />
            Schedule New Consultation
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
            <Calendar className="h-5 w-5 mr-2" />
            View Available Slots
          </button>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {[1, 2].map((appointment) => (
            <div
              key={appointment}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-semibold">Travel Planning Session</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>March 20, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>2:30 PM - 3:30 PM</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Upcoming
                  </div>
                </div>

                <div className="mt-4 md:mt-0 space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Join Meeting
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Appointments */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Past Appointments</h2>
        <div className="space-y-4">
          {[1, 2].map((appointment) => (
            <div
              key={appointment}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-600">Travel Planning Session</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>March 10, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>1:00 PM - 2:00 PM</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Completed
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View Summary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 