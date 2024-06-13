
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Variables de entorno de Supabase no encontradas.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log('supabase:', supabase);

export default supabase;



