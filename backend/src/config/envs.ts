import path from 'path';
import dotenv from 'dotenv';
import { get } from 'env-var';

// Cargar variables de entorno desde el archivo .env en la carpeta raíz del proyecto
const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });


export const envs = {
  PORT: get('PORT').required().asInt(),
  SUPABASE_URL: get('SUPABASE_URL').required().asString(),
  SUPABASE_KEY: get('SUPABASE_KEY').required().asString(),
};

// Comprobar que las variables se cargan correctamente
console.log('SUPABASE_URL:', envs.SUPABASE_URL);
console.log('SUPABASE_KEY:', envs.SUPABASE_KEY);
console.log('PORT:', envs.PORT);
