import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../config/supabaseClient';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerificarCorreo = () => {
  const [message, setMessage] = useState('');
  const query = useQuery();

  useEffect(() => {
    const accessToken = query.get('access_token');
    const refreshToken = query.get('refresh_token');

    if (accessToken && refreshToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ error }) => {
        if (error) {
          setMessage('El enlace de verificación es inválido o ha caducado.');
        } else {
          setMessage('¡Correo electrónico verificado con éxito!');
        }
      });
    } else {
      setMessage('El enlace de verificación es inválido o ha caducado.');
    }
  }, [query]);

  return (
    <div>
      <h1>Verificación de Correo Electrónico</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerificarCorreo;
