// backend/config/envs.ts
import { config } from 'dotenv';

// Cargar variables de entorno desde el archivo .env
config();

// Verificar que estén cargando correctamente
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);
console.log('PORT:', process.env.PORT);

export const envs = {
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_KEY!,
  port: process.env.PORT!
};
