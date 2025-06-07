-- Drop existing tables if they exist
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;
DROP TABLE IF EXISTS clerk_users CASCADE;

-- Create clerk_users table
CREATE TABLE clerk_users (
  id TEXT PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create destinations table
CREATE TABLE destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  duration TEXT,
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES clerk_users(id),
  destination_id UUID REFERENCES destinations(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES clerk_users(id),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  meeting_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES clerk_users(id),
  booking_id UUID REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES clerk_users(id),
  destination_id UUID REFERENCES destinations(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample destinations
INSERT INTO destinations (slug, name, description, location, price, image_url, duration, highlights) VALUES
('machu-picchu', 'Machu Picchu', 'Ancient Incan citadel set high in the Andes Mountains', 'Peru', 299.00, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80', '2-3 days', ARRAY['Guided tour of ancient ruins', 'Sunrise viewing opportunity', 'Traditional Peruvian lunch', 'Professional photography spots', 'Local expert guides']),
('santorini', 'Santorini', 'Beautiful Greek island with stunning sunsets', 'Greece', 599.00, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', '4-5 days', ARRAY['Sunset viewing in Oia', 'Wine tasting tour', 'Volcanic island exploration', 'Traditional Greek cuisine', 'Beach relaxation']),
('tokyo', 'Tokyo', 'Modern metropolis blending tradition and innovation', 'Japan', 799.00, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', '5-7 days', ARRAY['Traditional temple visits', 'Modern cityscape tours', 'Authentic sushi experience', 'Cherry blossom viewing', 'Cultural workshops']),
('bali', 'Bali', 'Tropical paradise with rich culture and stunning landscapes', 'Indonesia', 449.00, 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80', '5-6 days', ARRAY['Rice terrace exploration', 'Temple and cultural tours', 'Yoga and wellness retreats', 'Traditional Balinese cuisine', 'Beach and water activities']),
('iceland', 'Iceland', 'Land of fire and ice with dramatic natural wonders', 'Iceland', 899.00, 'https://images.unsplash.com/photo-1539066834-39dfce1e4aa7?w=800&q=80', '6-8 days', ARRAY['Northern Lights viewing', 'Glacier and volcano tours', 'Hot springs relaxation', 'Dramatic waterfall visits', 'Unique wildlife spotting']),
('morocco', 'Morocco', 'Exotic destination with vibrant markets and ancient cities', 'Morocco', 549.00, 'https://images.unsplash.com/photo-1489749798305-4fea3ae436d0?w=800&q=80', '4-6 days', ARRAY['Marrakech souks exploration', 'Sahara desert adventure', 'Traditional hammam experience', 'Berber culture immersion', 'Atlas Mountains trekking']);

-- Enable Row Level Security (RLS)
ALTER TABLE clerk_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for clerk_users
CREATE POLICY "Users can view own profile" ON clerk_users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON clerk_users
  FOR UPDATE USING (auth.uid()::text = id);

-- Create policies for destinations (public read)
CREATE POLICY "Destinations are publicly readable" ON destinations
  FOR SELECT USING (true);

-- Create policies for bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Create policies for appointments
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own appointments" ON appointments
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Create policies for payments
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own payments" ON payments
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Create policies for reviews
CREATE POLICY "Reviews are publicly readable" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.clerk_users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to handle updated timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_clerk_users_updated_at
  BEFORE UPDATE ON clerk_users
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_destinations_updated_at
  BEFORE UPDATE ON destinations
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at(); 