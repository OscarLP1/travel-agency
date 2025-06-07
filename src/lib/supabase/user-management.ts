import { supabase } from '../supabase'
import { User } from '@clerk/nextjs/server'

export async function ensureUserExists(clerkUser: any) {
  if (!clerkUser) return null

  try {
    // First, check if user exists in clerk_users table
    const { data: existingUser, error: fetchError } = await supabase
      .from('clerk_users')
      .select('*')
      .eq('id', clerkUser.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new users
      console.error('Error checking user existence:', fetchError)
      return null
    }

    // If user exists, return the existing user
    if (existingUser) {
      return existingUser
    }

    // If user doesn't exist, create them
    const newUser = {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress,
      full_name: clerkUser.fullName || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
      avatar_url: clerkUser.imageUrl,
    }

    const { data: createdUser, error: createError } = await supabase
      .from('clerk_users')
      .insert(newUser)
      .select()
      .single()

    if (createError) {
      console.error('Error creating user:', createError)
      return null
    }

    console.log('User created successfully:', createdUser.id)
    return createdUser

  } catch (error) {
    console.error('Error in ensureUserExists:', error)
    return null
  }
}

export async function updateUserProfile(userId: string, updates: {
  phone?: string
  address?: string
  bio?: string
}) {
  try {
    const { data, error } = await supabase
      .from('clerk_users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateUserProfile:', error)
    return null
  }
}

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('clerk_users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    return null
  }
} 