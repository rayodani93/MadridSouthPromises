import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import '../styles/Equipos.css';
import NavBarEquipos from '../components/NavBarEquipos';

interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
}

const Equipos: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('equipos')
          .select('*');

        if (error) {
          setError('Error al cargar los equipos');
          console.error('Error al cargar los equipos:', error);
        } else {
          setEquipos(data);
        }
      } catch (error) {
        setError('Error al cargar los equipos');
        console.error('Error al cargar los equipos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  return (
    <div className="equipos-container">
      <h1 className="my-4">Equipos</h1>
      <NavBarEquipos />
      {loading && <p>Cargando equipos...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="equipos-list">
          {equipos.map((equipo) => (
            <div key={equipo.id} className="equipo-card">
              <h2>{equipo.nombre}</h2>
              <p>Categoría: {equipo.categoria}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Equipos;
