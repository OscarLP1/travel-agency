'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const destinations = [
  {
    id: 1,
    name: "Machu Picchu",
    location: "Peru",
    description: "Ancient Incan city set high in the Andes Mountains.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&auto=format&fit=crop&q=60",
    price: "From $1,299",
    category: "Historical",
  },
  {
    id: 2,
    name: "Serengeti National Park",
    location: "Tanzania",
    description: "Vast plains teeming with wildlife and the great migration.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=60",
    price: "From $2,499",
    category: "Safari",
  },
  {
    id: 3,
    name: "Northern Lights",
    location: "Iceland",
    description: "Witness the magical aurora borealis in the Arctic sky.",
    image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&auto=format&fit=crop&q=60",
    price: "From $1,899",
    category: "Nature",
  },
  // Add more destinations as needed
]

const categories = ["All", "Historical", "Safari", "Nature"]

export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredDestinations = selectedCategory === "All"
    ? destinations
    : destinations.filter(dest => dest.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container py-8">
        <h1 className="mb-8 text-4xl font-bold">Popular Destinations</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Destinations Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <Link 
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="group overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{destination.name}</h2>
                  <span className="text-sm font-medium text-primary">{destination.price}</span>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">{destination.location}</p>
                <p className="text-sm text-muted-foreground">{destination.description}</p>
                <div className="mt-4">
                  <span className="rounded-full bg-secondary/50 px-3 py-1 text-xs">
                    {destination.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 