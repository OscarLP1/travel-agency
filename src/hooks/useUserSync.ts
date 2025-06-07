import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { ensureUserExists } from '@/lib/supabase/user-management'

export function useUserSync() {
  const { user, isLoaded } = useUser()
  const [isUserSynced, setIsUserSynced] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded) return
      
      if (user) {
        setIsLoading(true)
        try {
          await ensureUserExists(user)
          setIsUserSynced(true)
        } catch (error) {
          console.error('Failed to sync user:', error)
          setIsUserSynced(false)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsUserSynced(false)
        setIsLoading(false)
      }
    }

    syncUser()
  }, [user, isLoaded])

  return {
    isUserSynced,
    isLoading: isLoading || !isLoaded,
    user
  }
} 