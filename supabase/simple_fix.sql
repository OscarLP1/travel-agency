-- Temporary fix: Disable RLS on clerk_users table
-- This allows our application to manage users without complex RLS policies

ALTER TABLE clerk_users DISABLE ROW LEVEL SECURITY; 