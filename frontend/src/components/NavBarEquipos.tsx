
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import '../styles/NavBarEquipos.css';

interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
}

const NavBarEquipos: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('equipos')
          .select('id, nombre, categoria');

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
    <div className="navbar-equipos">
      {loading && <p>Cargando equipos...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul className="equipos-list">
          {equipos.map((equipo) => (
            <li key={equipo.id} className="equipo-item">
              <Link to={`/equipos/${equipo.id}`}>{equipo.nombre}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBarEquipos;
