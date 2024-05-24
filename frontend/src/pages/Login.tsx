import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import NavBar from '../components/NavBar';

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState<string>('');

  const handleChangeCorreoElectronico = (event: ChangeEvent<HTMLInputElement>) => {
    setCorreoElectronico(event.target.value);
  };

  const handleChangeContrasena = (event: ChangeEvent<HTMLInputElement>) => {
    setContrasena(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correoElectronico, contrasena }),
      });
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
      const data = await response.json();

      console.log('Token JWT:', data.token);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error');
      }
    }
  };

  return (
    <div className="login-container py-4">
      <div className="row g-0 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: 'blur(30px)' }}>
            <div className="card-body p-5 shadow-5 text-center">
              <h3 className="fw-bold mb-5">Iniciar Sesión</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="email"
                      id="correo"
                      className="form-control"
                      value={correoElectronico}
                      onChange={handleChangeCorreoElectronico}
                      required
                    />
                    <label className="form-label" htmlFor="correo">Correo Electrónico</label>
                  </div>
                </div>

                <div className="mb-3">
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="password"
                      id="contrasena"
                      className="form-control"
                      value={contrasena}
                      onChange={handleChangeContrasena}
                      required
                    />
                    <label className="form-label" htmlFor="contrasena">Contraseña</label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar Sesión</button>
                {error && <div className="error-message">{error}</div>}
                <div className="registrarse-link">
                  ¿No tienes una cuenta? <Link to="/registro">Registrarse</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="form-nav-container">
        <NavBar />
      </div>
    </div>
  );
}

export default Login;
