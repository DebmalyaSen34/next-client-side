import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supbaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supbase = createClient(supabaseUrl, supbaseKey);