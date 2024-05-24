
import { createClient } from '@supabase/supabase-js'
import { envs } from './envs'

const supabase = createClient(envs.SUPABASE_URL, envs.SUPABASE_KEY)
console.log('supabase:', supabase);

export default supabase;

