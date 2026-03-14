import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://indsorfjcozlnpgijamo.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZHNvcmZqY296bG5wZ2lqYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTk1MjAsImV4cCI6MjA4OTA3NTUyMH0.upc8ooD0ndrWnQV0qnCyO04hMgBqTAepYAud_52OoBU"

export const supabase = createClient(supabaseUrl, supabaseKey)