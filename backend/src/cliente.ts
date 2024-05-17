
import { createClient } from "@supabase/supabase-js";
import { envs } from "../../config/envs";


export const supabase = createClient(envs.supabaseUrl, envs.supabaseKey);
