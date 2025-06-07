'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Users, Star, Clock, MapPin } from 'lucide-react'

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const [selectedTab, setSelectedTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="/machu-picchu.jpg"
          alt="Machu Picchu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto h-full flex items-end pb-12">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Machu Picchu</h1>
              <p className="text-lg">Ancient Incan citadel set high in the Andes Mountains</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b">
                <nav className="flex -mb-px">
                  {['overview', 'details', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`py-4 px-6 text-sm font-medium capitalize ${
                        selectedTab === tab
                          ? 'border-b-2 border-blue-500 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {selectedTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Explore the magnificent ruins of Machu Picchu, an ancient Incan city set high in the Andes Mountains.
                      This UNESCO World Heritage site offers breathtaking views and rich historical significance.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Duration: 2-3 days</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Location: Peru</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'details' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Tour Highlights</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Guided tour of the ancient ruins</li>
                      <li>Sunrise viewing opportunity</li>
                      <li>Traditional Peruvian lunch</li>
                      <li>Professional photography spots</li>
                      <li>Local expert guides</li>
                    </ul>
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-0">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4 ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            John Doe • 2 weeks ago
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Amazing experience! The views were breathtaking and our guide was very knowledgeable.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Book Your Trip</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dates
                  </label>
                  <div className="flex items-center border rounded-md p-2">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="flex-1 border-0 focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <div className="flex items-center border rounded-md p-2">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <select className="flex-1 border-0 focus:ring-0">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Price per person</span>
                    <span>$299</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$299</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 