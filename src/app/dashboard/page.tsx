'use client'

import { useUser } from "@clerk/nextjs"
import { Calendar, Clock, CreditCard } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName || 'User'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening with your account.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Calendar className="h-10 w-10 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold text-gray-900">0</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Clock className="h-10 w-10 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Bookings</p>
              <h3 className="text-2xl font-bold text-gray-900">0</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <CreditCard className="h-10 w-10 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <h3 className="text-2xl font-bold text-gray-900">$0.00</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/dashboard/appointments"
            className="block p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-500 transition-colors"
          >
            <h3 className="text-base font-semibold text-gray-900">View Appointments</h3>
            <p className="mt-1 text-sm text-gray-600">Check your upcoming and past appointments</p>
          </Link>

          <Link 
            href="/dashboard/bookings"
            className="block p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-500 transition-colors"
          >
            <h3 className="text-base font-semibold text-gray-900">Manage Bookings</h3>
            <p className="mt-1 text-sm text-gray-600">View and manage your travel bookings</p>
          </Link>

          <Link 
            href="/dashboard/profile"
            className="block p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-500 transition-colors"
          >
            <h3 className="text-base font-semibold text-gray-900">Update Profile</h3>
            <p className="mt-1 text-sm text-gray-600">Keep your information up to date</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 text-center text-gray-500">
            No recent activity to show
          </div>
        </div>
      </div>
    </div>
  )
} 