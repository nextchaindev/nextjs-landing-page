-- Create the table
CREATE TABLE consultations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text,
  contact text,
  phone text,
  message text,
  status text DEFAULT 'new'
);

-- Enable Row Level Security (RLS)
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (submission form)
CREATE POLICY "Enable insert for everyone" 
ON consultations FOR INSERT 
WITH CHECK (true);

-- Policy: Allow only service_role (admin) to view 
-- (Note: Service Role key bypasses RLS automatically, 
-- but if using authenticated admin users, you'd add a policy here.
-- For this simple setup, no read policy implies ONLY service_role can read.)
