-- Create the messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read messages
CREATE POLICY "Anyone can read messages"
  ON messages
  FOR SELECT
  USING (true);

-- Allow anyone to insert messages
CREATE POLICY "Anyone can insert messages"
  ON messages
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to delete messages
CREATE POLICY "Anyone can delete messages"
  ON messages
  FOR DELETE
  USING (true);
