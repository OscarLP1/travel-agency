'use client'

import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    bio: ''
  })

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-100">
        {/* Basic Information */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{user?.fullName || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user?.primaryEmailAddress?.emailAddress || 'Not set'}</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="+1 (555) 000-0000"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{formData.phone || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter your address"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{formData.address || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Tell us a bit about yourself..."
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{formData.bio || 'Not set'}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="email_notifications"
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="email_notifications" className="font-medium text-gray-700">
                Email Notifications
              </label>
              <p className="text-gray-500">Receive email updates about your bookings and appointments</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="marketing_emails"
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="marketing_emails" className="font-medium text-gray-700">
                Marketing Emails
              </label>
              <p className="text-gray-500">Receive emails about special offers and promotions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 