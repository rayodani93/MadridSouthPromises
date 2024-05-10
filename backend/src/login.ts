import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const router = Router();

// misma URL y API key que en el registro, para inicializar el cliente de Supabase
const supabaseUrl = 'https://vlaxpqwrogvnccqbvukg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsYXhwcXdyb2d2bmNjcWJ2dWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5ODk1MzUsImV4cCI6MjAzMDU2NTUzNX0.u8cYyTGeHIHGPNJAo2uCDw-nn6Rm5VtcSrly4vV_xCc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta para el inicio de sesión
router.post('/login', async (req: Request, res: Response) => {
  const { correoElectronico, contrasena } = req.body;

  try {
    // Consultar el usuario en la base de datos de Supabase
    const { data: usuarios, error } = await supabase
      .from('usuarios')
      .select('id, correo_electronico, contrasena')
      .eq('correo_electronico', correoElectronico)
      .single();

    // Si hay un error al consultar la base de datos, devolver un error de servidor
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    // Si no se encuentra el usuario, enviar un error de autenticación
    if (!usuarios) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(contrasena, usuarios.contrasena);

    // Si la contraseña no coincide, enviar un error de autenticación
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Si las credenciales son válidas, generar un token JWT
    const token = jwt.sign({ correoElectronico: usuarios.correo_electronico }, 'RAYito657569484', { expiresIn: '1h' });

    // Devolver el token JWT como respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

export default router;
