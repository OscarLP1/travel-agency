-- Drop existing tables if they exist
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TYPE IF EXISTS appointment_status CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;
DROP TYPE IF EXISTS booking_status CASCADE;

-- Create custom types
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled', 'pending');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE booking_status AS ENUM ('active', 'completed', 'cancelled', 'pending');

-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table (extends Clerk user data)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone_number TEXT,
    address TEXT,
    bio TEXT,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create bookings table (for travel bookings)
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) NOT NULL,
    destination TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    number_of_people INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status booking_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create appointments table (for consultations/meetings)
CREATE TABLE appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    status appointment_status DEFAULT 'pending',
    meeting_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create payments table
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) NOT NULL,
    booking_id UUID REFERENCES bookings(id),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status payment_status DEFAULT 'pending',
    stripe_payment_id TEXT,
    payment_method TEXT,
    billing_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create services table
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- duration in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies
-- User Profiles policies
CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    USING (id = auth.uid());

-- Bookings policies
CREATE POLICY "Users can view own bookings"
    ON bookings FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can create own bookings"
    ON bookings FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own bookings"
    ON bookings FOR UPDATE
    USING (user_id = auth.uid());

-- Appointments policies
CREATE POLICY "Users can view own appointments"
    ON appointments FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can create own appointments"
    ON appointments FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own appointments"
    ON appointments FOR UPDATE
    USING (user_id = auth.uid());

-- Payments policies
CREATE POLICY "Users can view own payments"
    ON payments FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can create own payments"
    ON payments FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Services policies
CREATE POLICY "Services are viewable by everyone."
  ON services FOR SELECT
  USING (true);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 