import { Request, Response, Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

// Inicializar el cliente de Supabase con la URL y la API Key proporcionadas
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router();

router.post('/registro', async (req: Request, res: Response) => {
    const { nombre, apellidos, correoElectronico, contrasena } = req.body;

    try {
        // Verificar si el correo electrónico ya está en uso
        const { data: existingUser, error: existingUserError } = await supabase.from('familiares')
            .select('*')
            .eq('correo_electronico', correoElectronico);

        if (existingUserError) {
            console.error('Error al consultar la base de datos:', existingUserError);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (existingUser && existingUser.length > 0) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
        }

        // Validar la contraseña
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(contrasena)) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una minúscula y un número.' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertar el usuario en la tabla "familiares"
        const { error: insertionError } = await supabase.from('familiares').insert([
            { nombre, apellidos, correo_electronico: correoElectronico, contrasena: hashedPassword }
        ]);

        if (insertionError) {
            console.error('Error al insertar el usuario en la base de datos:', insertionError);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
