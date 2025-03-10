import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase configuration error: EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_KEY is missing. Check your .env file."
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Supabase Auth Event:", event, "Session:", session);
});

export default supabase;