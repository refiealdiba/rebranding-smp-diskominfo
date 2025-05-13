import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lbvxwdzkjhleiksqzohx.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxidnh3ZHpramhsZWlrc3F6b2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNjU1OTYsImV4cCI6MjA2MTY0MTU5Nn0.v-by6K-ILxHeg9Lk-65PVNZ5rNAlXVtBZF3bwoN-M7Q";
export const supabase = createClient(supabaseUrl, supabaseKey);
