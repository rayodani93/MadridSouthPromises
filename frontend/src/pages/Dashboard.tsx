import React, { useState, FormEvent } from 'react';
import supabase from '../config/supabaseClient';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [categoriaEquipo, setCategoriaEquipo] = useState('');
  const [nombreStaff, setNombreStaff] = useState('');
  const [apellidosStaff, setApellidosStaff] = useState('');
  const [telefonoStaff, setTelefonoStaff] = useState('');
  const [puestoStaff, setPuestoStaff] = useState('');
  const [equipoIdStaff, setEquipoIdStaff] = useState<number | null>(null);
  const [nombreJugador, setNombreJugador] = useState('');
  const [apellidosJugador, setApellidosJugador] = useState('');
  const [fechaNacimientoJugador, setFechaNacimientoJugador] = useState('');
  const [dniJugador, setDniJugador] = useState('');
  const [equipoIdJugador, setEquipoIdJugador] = useState<number | null>(null);

  const handleSubmitEquipo = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('equipos')
      .insert([{ nombre: nombreEquipo, categoria: categoriaEquipo }]);
    if (error) {
      console.error(error);
      alert('Error al añadir el equipo');
    } else {
      setNombreEquipo('');
      setCategoriaEquipo('');
      alert('Equipo añadido con éxito');
    }
  };

  const handleSubmitStaff = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('staff')
      .insert([{ 
        nombre: nombreStaff, 
        apellidos: apellidosStaff, 
        telefonomovil: telefonoStaff || null, // Asegúrate de enviar null si el campo está vacío
        puesto: puestoStaff, 
        equipoid: equipoIdStaff // Usa el nombre exacto de la columna como está en la base de datos
      }]);
    if (error) {
      console.error('Error al añadir miembro del staff:', error);
      alert('Error al añadir miembro del staff');
    } else {
      setNombreStaff('');
      setApellidosStaff('');
      setTelefonoStaff('');
      setPuestoStaff('');
      setEquipoIdStaff(null);
      alert('Miembro del staff añadido con éxito');
    }
  };

  const handleSubmitJugador = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('jugadores')
      .insert([{ 
        nombre: nombreJugador, 
        apellidos: apellidosJugador, 
        fechanacimiento: fechaNacimientoJugador, 
        dni: dniJugador, 
        equipoid: equipoIdJugador // Usa el nombre exacto de la columna como está en la base de datos
      }]);
    if (error) {
      console.error('Error al añadir jugador:', error);
      alert('Error al añadir jugador');
    } else {
      setNombreJugador('');
      setApellidosJugador('');
      setFechaNacimientoJugador('');
      setDniJugador('');
      setEquipoIdJugador(null);
      alert('Jugador añadido con éxito');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <form onSubmit={handleSubmitEquipo}>
        <h2>Añadir Equipo</h2>
        <input
          type="text"
          placeholder="Nombre del equipo"
          value={nombreEquipo}
          onChange={(e) => setNombreEquipo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoría del equipo"
          value={categoriaEquipo}
          onChange={(e) => setCategoriaEquipo(e.target.value)}
          required
        />
        <button type="submit">Añadir Equipo</button>
      </form>

      <form onSubmit={handleSubmitStaff}>
        <h2>Añadir Miembro del Staff</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombreStaff}
          onChange={(e) => setNombreStaff(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellidos"
          value={apellidosStaff}
          onChange={(e) => setApellidosStaff(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono Móvil"
          value={telefonoStaff}
          onChange={(e) => setTelefonoStaff(e.target.value)}
        />
        <input
          type="text"
          placeholder="Puesto"
          value={puestoStaff}
          onChange={(e) => setPuestoStaff(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="ID del Equipo"
          value={equipoIdStaff !== null ? equipoIdStaff : ''}
          onChange={(e) => setEquipoIdStaff(e.target.value ? parseInt(e.target.value) : null)}
        />
        <button type="submit">Añadir Staff</button>
      </form>

      <form onSubmit={handleSubmitJugador}>
        <h2>Añadir Jugador</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombreJugador}
          onChange={(e) => setNombreJugador(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellidos"
          value={apellidosJugador}
          onChange={(e) => setApellidosJugador(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={fechaNacimientoJugador}
          onChange={(e) => setFechaNacimientoJugador(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="DNI"
          value={dniJugador}
          onChange={(e) => setDniJugador(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="ID del Equipo"
          value={equipoIdJugador !== null ? equipoIdJugador : ''}
          onChange={(e) => setEquipoIdJugador(e.target.value ? parseInt(e.target.value) : null)}
        />
        <button type="submit">Añadir Jugador</button>
      </form>
    </div>
  );
};

export default Dashboard;
