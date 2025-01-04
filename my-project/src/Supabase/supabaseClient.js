import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://alwrvxkphnxmqdxnrytf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsd3J2eGtwaG54bXFkeG5yeXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NTQ5NjEsImV4cCI6MjA0OTEzMDk2MX0.GEorP67PQhnWxhJibyjoubEWyoYFB7_zOyk9SNmHAyI';
export const supabase = createClient(supabaseUrl, supabaseKey);
