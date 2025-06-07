'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'

export function Navigation() {
  const pathname = usePathname()
  const { isSignedIn, isLoaded } = useUser()

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Adventure Travel
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 ${isActive('/')}`}>
                Home
              </Link>
              <Link href="/destinations" className={`inline-flex items-center px-1 pt-1 ${isActive('/destinations')}`}>
                Destinations
              </Link>
              <Link href="/about" className={`inline-flex items-center px-1 pt-1 ${isActive('/about')}`}>
                About
              </Link>
              <Link href="/contact" className={`inline-flex items-center px-1 pt-1 ${isActive('/contact')}`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoaded && (
              isSignedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`inline-flex items-center px-3 py-2 rounded-md ${isActive('/dashboard')}`}
                  >
                    Dashboard
                  </Link>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8"
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <Link 
                    href="/sign-in" 
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/sign-up"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 border-blue-600"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 