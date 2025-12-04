import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// *** DEBUGGING LOGS (Truth Serum) ***
console.log("------------------------------------------------");
console.log("🔌 SUPABASE CONNECTION DEBUG");
console.log("Target URL:", SUPABASE_URL);
console.log("Key Length:", SUPABASE_PUBLISHABLE_KEY ? SUPABASE_PUBLISHABLE_KEY.length : "MISSING");
console.log("Is New Project?", SUPABASE_URL?.includes('ffoxjeivvhguiiqrasek') ? "✅ YES" : "❌ NO (Using Old/Wrong URL)");
console.log("------------------------------------------------");

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error("🚨 MISSING SUPABASE CREDENTIALS! Check your .env file.");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});