import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://odqcbgwakcysfluoinmn.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcWNiZ3dha2N5c2ZsdW9pbm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MTcxNzIsImV4cCI6MjA3MDE5MzE3Mn0.2xvinXJBSLBAs_rXxvIhMgSFFJNJGkMlEO6EcFbx1iE';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side client with service role key (for admin operations)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcWNiZ3dha2N5c2ZsdW9pbm1uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDYxNzE3MiwiZXhwIjoyMDcwMTkzMTcyfQ.CxABycRE9h852apONV3SRWUXXr2n5jKfeVWxwcXWq24'
);