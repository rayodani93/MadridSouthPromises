import { useState, ChangeEvent, FormEvent } from 'react';
import balonEstadio from "../assets/fotoRegistro.jpg";
import './styles/Registro.css';
import NavBar from './NavBar';


  // permite añadir el estado de react a un componente de funcion para que pueda tener estado y otras caracteristicas de las clases
function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');


    // handle son funciones de react que se utilizan para manejar eventos, en este caso, el evento de cambio en los campos del formulario
  const handleChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleChangeApellidos = (event: ChangeEvent<HTMLInputElement>) => {
    setApellidos(event.target.value);
  };

  const handleChangeCorreoElectronico = (event: ChangeEvent<HTMLInputElement>) => {
    setCorreoElectronico(event.target.value);
  };

  const handleChangeContrasena = (event: ChangeEvent<HTMLInputElement>) => {
    setContrasena(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Datos de registro en el backend, console.log para mostrar los datos en la consola y asegurar que los datos se capturan bien
    console.log('Datos del formulario de registro:', nombre, apellidos, correoElectronico, contrasena);
  };

  return (
    
      <div className="registro-container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: 'blur(30px)' }}>
              <div className="card-body p-5 shadow-5 text-center">
                <h3 className="fw-bold mb-5">Registrarse</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="text"
                          id="nombre"
                          className="form-control"
                          value={nombre}
                          onChange={handleChangeNombre}
                          required
                        />
                        <label className="form-label" htmlFor="nombre">Nombre</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="text"
                          id="apellidos"
                          className="form-control"
                          value={apellidos}
                          onChange={handleChangeApellidos}
                          required
                        />
                        <label className="form-label" htmlFor="apellidos">Apellidos</label>
                      </div>
                    </div>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
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

                  <div data-mdb-input-init className="form-outline mb-4">
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

                  <button type="submit" className="btn btn-primary btn-block mb-4">Registrarse</button>

                  <div className="text-center">                   
                    <p>¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="balon-container">
          <img src={balonEstadio} alt="balonEstadio" className="balon-estadio" />
          </div>
        </div>
        <div className="form-nav-container">
        <NavBar />
      </div>
      </div>
    
  );
}

export default Registro;
