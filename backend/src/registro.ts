import { Request, Response, Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

// Inicializar el cliente de Supabase con la URL y la API Key proporcionadas
const supabaseUrl = 'https://vlaxpqwrogvnccqbvukg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsYXhwcXdyb2d2bmNjcWJ2dWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5ODk1MzUsImV4cCI6MjAzMDU2NTUzNX0.u8cYyTGeHIHGPNJAo2uCDw-nn6Rm5VtcSrly4vV_xCc';
const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router();

// Ruta para el registro de usuarios
router.post('/registro', async (req: Request, res: Response) => {
  const { nombre, apellidos, correoElectronico, contrasena } = req.body;

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el nuevo usuario en la tabla de usuarios de Supabase
    const { data, error } = await supabase.from('usuarios').insert([
      { nombre, apellidos, correo_electronico: correoElectronico, contrasena: hashedPassword }
    ]);

    if (error) {
      console.error('Error al insertar el usuario en la base de datos:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    res.json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

export default router;
