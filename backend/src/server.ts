import express from 'express';
import registroRouter from './registro';

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Rutas
app.use('/api/registro', registroRouter); // Montar el router en /api/registro

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
