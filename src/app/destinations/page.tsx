'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Destination {
  id: string
  slug: string
  name: string
  location: string
  description: string
  image_url: string
  price: number
  duration: string
  highlights: string[]
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState("All")

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('name')

        if (error) {
          console.error('Error fetching destinations:', error)
        } else {
          console.log('Fetched destinations:', data)
          setDestinations(data || [])
        }
      } catch (error) {
        console.error('Error in fetchDestinations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  const locations = ["All", ...Array.from(new Set(destinations.map(dest => dest.location)))]

  const filteredDestinations = selectedLocation === "All"
    ? destinations
    : destinations.filter(dest => dest.location === selectedLocation)

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24">
        <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-4xl font-bold">Popular Destinations</h1>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Popular Destinations</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {locations.map(location => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`rounded-full px-6 py-2 transition-colors ${
                selectedLocation === location
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
        
        {/* Destinations Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="col-span-full text-sm text-gray-500 mb-4">
              Total destinations: {destinations.length} | Filtered: {filteredDestinations.length}
            </div>
          )}
          {filteredDestinations.map((destination) => (
            <Link 
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="group overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={destination.image_url}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">{destination.name}</h2>
                  <span className="text-sm font-medium text-blue-600">${destination.price}</span>
                </div>
                <p className="mb-2 text-sm text-gray-600">{destination.location}</p>
                <p className="text-sm text-gray-600 mb-3">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">
                    {destination.duration}
                  </span>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDestinations.length === 0 && !loading && (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600">Try selecting a different location filter.</p>
          </div>
        )}
      </div>
    </main>
  )
} 