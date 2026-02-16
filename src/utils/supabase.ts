import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://rmoscsxrcilyzdfzvqdj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtb3Njc3hyY2lseXpkZnp2cWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDYzODAsImV4cCI6MjA3MDkyMjM4MH0.kz9nDN2IXNNISRESl0sn9mHgaMfhzHN2cy-Pj0W1RaA"
);
