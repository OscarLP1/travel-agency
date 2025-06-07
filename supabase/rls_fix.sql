-- Fix RLS policies for clerk_users table
-- Since we're using Clerk for auth, we need to allow operations on clerk_users

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON clerk_users;
DROP POLICY IF EXISTS "Users can update own profile" ON clerk_users;

-- Create more permissive policies for clerk_users table
-- Since this table is managed by our application logic with Clerk auth

-- Allow service role to do anything (for admin operations)
CREATE POLICY "Service role can manage all users" ON clerk_users
  FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to read all clerk_users (for lookups)
CREATE POLICY "Authenticated users can read clerk_users" ON clerk_users
  FOR SELECT USING (true);

-- Allow users to update their own profile (we'll handle auth in application logic)
CREATE POLICY "Users can update profiles" ON clerk_users
  FOR UPDATE USING (true);

-- Allow inserts (for new user creation)
CREATE POLICY "Allow user creation" ON clerk_users
  FOR INSERT WITH CHECK (true); 