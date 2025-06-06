'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'

export function HeroSection() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
  }

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-gradient-to-br from-primary/90 to-primary">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=60')" 
        }} 
      />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
          Your Next Adventure Awaits
        </h1>
        <p className="mb-8 max-w-2xl text-lg md:text-xl">
          Discover extraordinary destinations and unique experiences. Let us guide you to your perfect journey.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
          <div className="flex items-center rounded-full bg-white/90 p-2 shadow-lg">
            <Search className="ml-3 h-6 w-6 text-gray-500" />
            <input
              type="text"
              placeholder="Where would you like to go?"
              className="w-full bg-transparent px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
            <button 
              type="submit"
              className="rounded-full bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-primary/90"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/destinations/popular" className="rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
            Popular Destinations
          </Link>
          <Link href="/experiences" className="rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
            Unique Experiences
          </Link>
          <Link href="/deals" className="rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
            Special Deals
          </Link>
        </div>
      </div>
    </div>
  )
} 