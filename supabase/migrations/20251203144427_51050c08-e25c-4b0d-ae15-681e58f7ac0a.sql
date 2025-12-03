-- Create the bookings table for sports court reservations
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sport_name TEXT NOT NULL,
  court_name TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  user_id TEXT NOT NULL,
  booked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure no duplicate bookings for same court, date, and time slot
  UNIQUE(sport_name, court_name, date, time_slot)
);

-- Enable Row Level Security (public read/write for this simple app)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read bookings (to see availability)
CREATE POLICY "Anyone can view bookings" 
ON public.bookings 
FOR SELECT 
USING (true);

-- Allow anyone to create bookings (simplified - no auth required)
CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for bookings table
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;