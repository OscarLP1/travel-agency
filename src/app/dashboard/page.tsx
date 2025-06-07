'use client'

import { UserButton, useUser } from "@clerk/nextjs"

export default function DashboardPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.firstName || 'User'}!
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
                <p>ID: {user?.id}</p>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <ul className="space-y-2">
                  <li>
                    <button className="text-blue-600 hover:text-blue-800">
                      Book Appointment
                    </button>
                  </li>
                  <li>
                    <button className="text-blue-600 hover:text-blue-800">
                      View History
                    </button>
                  </li>
                  <li>
                    <button className="text-blue-600 hover:text-blue-800">
                      Update Profile
                    </button>
                  </li>
                </ul>
              </div>

              {/* Stats */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Stats</h2>
                <div className="space-y-2">
                  <p>Upcoming Appointments: 0</p>
                  <p>Past Appointments: 0</p>
                  <p>Total Spent: $0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 