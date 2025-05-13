// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cfwyzybtrpjkulwrzeae.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmd3l6eWJ0cnBqa3Vsd3J6ZWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMTMwNjgsImV4cCI6MjA2MjU4OTA2OH0.cytMvoVbkgSRrxZoo3fI4DuV3jayJvM7X09_6cTe3_o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
