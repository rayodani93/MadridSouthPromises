// frontend/src/pages/EquipoDetalle.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import '../styles/EquipoDetalle.css';

interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
}

const EquipoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('equipos')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setError('Error al cargar la información del equipo');
          console.error('Error al cargar la información del equipo:', error);
        } else {
          setEquipo(data);
        }
      } catch (error) {
        setError('Error al cargar la información del equipo');
        console.error('Error al cargar la información del equipo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipo();
  }, [id]);

  if (loading) {
    return <div>Cargando información del equipo...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!equipo) {
    return <div>Equipo no encontrado</div>;
  }

  return (
    <div className="equipo-detalle-container">
      <h1>{equipo.nombre}</h1>
      <p>Categoría: {equipo.categoria}</p>
      
    </div>
  );
};

export default EquipoDetalle;
