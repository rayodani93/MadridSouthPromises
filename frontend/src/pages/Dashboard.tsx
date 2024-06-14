import React, { useState, useEffect, FormEvent } from 'react';
import supabase from '../config/supabaseClient';
import FormComponent from '../components/FormComponent';
import NavBar from '../components/NavBar';


//Definimos el Dashboard creando estados para todos los campos de 
//los formularios y para el estado de carga 

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
  const [isLoading, setIsLoading] = useState(false);
  const [equipos, setEquipos] = useState<Array<{ id: number; nombre: string }>>([]);
  const [staff, setStaff] = useState<Array<{ id: number; nombre: string; apellidos: string }>>([]);
  const [jugadores, setJugadores] = useState<Array<{ id: number; nombre: string; apellidos: string }>>([]);
  const [selectedEquipoId, setSelectedEquipoId] = useState<number | null>(null);
  const [selectedJugadorId, setSelectedJugadorId] = useState<number | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);

  // useEffect para obtener los datos de los equipos, staff y jugadores
  useEffect(() => {
    const fetchData = async () => {
      const equiposData = await supabase.from('equipos').select('id, nombre');
      const staffData = await supabase.from('staff').select('id, nombre, apellidos');
      const jugadoresData = await supabase.from('jugadores').select('id, nombre, apellidos');

      if (equiposData.error || staffData.error || jugadoresData.error) {
        console.error('Error fetching data:', equiposData.error, staffData.error, jugadoresData.error);
      } else {
        setEquipos(equiposData.data);
        setStaff(staffData.data);
        setJugadores(jugadoresData.data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (
    e: FormEvent,
    type: 'equipo' | 'staff' | 'jugador',
    data: any,
    resetForm: () => void
  ) => {
    e.preventDefault();
    setIsLoading(true);

    let table = '';
    switch (type) {
      case 'equipo':
        table = 'equipos';
        break;
      case 'staff':
        table = 'staff';
        break;
      case 'jugador':
        table = 'jugadores';
        break;
      default:
        return;
    }

    const { error } = await supabase.from(table).insert([data]);

    setIsLoading(false);

    if (error) {
      console.error(`Error al añadir ${type}:`, error);
      alert(`Error al añadir ${type}`);
    } else {
      resetForm();
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} añadido con éxito`);
      // Actualizamos datos tras una inserción
      const fetchData = async () => {
        const equiposData = await supabase.from('equipos').select('id, nombre');
        const staffData = await supabase.from('staff').select('id, nombre, apellidos');
        const jugadoresData = await supabase.from('jugadores').select('id, nombre, apellidos');

        if (equiposData.error || staffData.error || jugadoresData.error) {
          console.error('Error fetching data:', equiposData.error, staffData.error, jugadoresData.error);
        } else {
          setEquipos(equiposData.data);
          setStaff(staffData.data);
          setJugadores(jugadoresData.data);
        }
      };
      fetchData();
    }
  };

  const handleDelete = async (
    type: 'equipo' | 'staff' | 'jugador',
    id: number | null
  ) => {
    if (id === null) return;

    setIsLoading(true);

    let table = '';
    switch (type) {
      case 'equipo':
        table = 'equipos';
        break;
      case 'staff':
        table = 'staff';
        break;
      case 'jugador':
        table = 'jugadores';
        break;
      default:
        return;
    }

    const { error } = await supabase.from(table).delete().eq('id', id);

    setIsLoading(false);

    if (error) {
      console.error(`Error al eliminar ${type}:`, error);
      alert(`Error al eliminar ${type}`);
    } else {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} eliminado con éxito`);
      if (type === 'equipo') setSelectedEquipoId(null);
      if (type === 'staff') setSelectedStaffId(null);
      if (type === 'jugador') setSelectedJugadorId(null);
      // Actualizamos datos tras una eliminación
      const fetchData = async () => {
        const equiposData = await supabase.from('equipos').select('id, nombre');
        const staffData = await supabase.from('staff').select('id, nombre, apellidos');
        const jugadoresData = await supabase.from('jugadores').select('id, nombre, apellidos');

        if (equiposData.error || staffData.error || jugadoresData.error) {
          console.error('Error fetching data:', equiposData.error, staffData.error, jugadoresData.error);
        } else {
          setEquipos(equiposData.data);
          setStaff(staffData.data);
          setJugadores(jugadoresData.data);
        }
      };
      fetchData();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <div className="form-nav-container">
        <NavBar />
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h3>Añadir equipo</h3>
        </div>
        <div className="card-body">
          <FormComponent
            title=""
            fields={[
              { placeholder: 'Nombre del equipo', value: nombreEquipo, onChange: (e) => setNombreEquipo(e.target.value), required: true },
              { placeholder: 'Categoría del equipo', value: categoriaEquipo, onChange: (e) => setCategoriaEquipo(e.target.value), required: true },
            ]}
            onSubmit={(e) => handleSubmit(e, 'equipo', { nombre: nombreEquipo, categoria: categoriaEquipo }, () => {
              setNombreEquipo('');
              setCategoriaEquipo('');
            })}
            isLoading={isLoading}
          />
          <div className="mt-3">
            <h3>Eliminar equipo</h3>
            <FormComponent
              title=""
              fields={[
                { type: 'select', placeholder: 'Seleccionar Equipo', value: selectedEquipoId !== null ? selectedEquipoId : '', onChange: (e) => setSelectedEquipoId(parseInt(e.target.value)), options: equipos.map(e => ({ value: e.id, label: e.nombre })) },
              ]}
              onSubmit={(e) => { e.preventDefault(); handleDelete('equipo', selectedEquipoId); }}
              buttonText="Eliminar"
              buttonClass="btn btn-danger" 
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h3>Añadir miembro Staff</h3>
        </div>
        <div className="card-body">
          <FormComponent
            title=""
            fields={[
              { placeholder: 'Nombre', value: nombreStaff, onChange: (e) => setNombreStaff(e.target.value), required: true },
              { placeholder: 'Apellidos', value: apellidosStaff, onChange: (e) => setApellidosStaff(e.target.value), required: true },
              { placeholder: 'Teléfono Móvil', value: telefonoStaff, onChange: (e) => setTelefonoStaff(e.target.value) },
              { placeholder: 'Puesto', value: puestoStaff, onChange: (e) => setPuestoStaff(e.target.value), required: true },
              { type: 'select', placeholder: 'Seleccionar Equipo', value: equipoIdStaff !== null ? equipoIdStaff : '', onChange: (e) => setEquipoIdStaff(parseInt(e.target.value)), options: equipos.map(e => ({ value: e.id, label: e.nombre })) },
            ]}
            onSubmit={(e) => handleSubmit(e, 'staff', { nombre: nombreStaff, apellidos: apellidosStaff, telefonomovil: telefonoStaff || null, puesto: puestoStaff, equipoid: equipoIdStaff }, () => {
              setNombreStaff('');
              setApellidosStaff('');
              setTelefonoStaff('');
              setPuestoStaff('');
              setEquipoIdStaff(null);
            })}
            isLoading={isLoading}
          />

          <div className="mt-3">
            <h3>Eliminar miembro Staff</h3>
            <FormComponent
              title=""
              fields={[
                { type: 'select', placeholder: 'Seleccionar Staff', value: selectedStaffId !== null ? selectedStaffId : '', onChange: (e) => setSelectedStaffId(parseInt(e.target.value)), options: staff.map(s => ({ value: s.id, label: `${s.nombre} ${s.apellidos}` })) },
              ]}
              onSubmit={(e) => { e.preventDefault(); handleDelete('staff', selectedStaffId); }}
              buttonText="Eliminar"
              buttonClass="btn btn-danger" 
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h3>Añadir jugador</h3>
        </div>
        <div className="card-body">
          <FormComponent
            title=""
            fields={[
              { placeholder: 'Nombre', value: nombreJugador, onChange: (e) => setNombreJugador(e.target.value), required: true },
              { placeholder: 'Apellidos', value: apellidosJugador, onChange: (e) => setApellidosJugador(e.target.value), required: true },
              { type: 'date', placeholder: 'Fecha de Nacimiento', value: fechaNacimientoJugador, onChange: (e) => setFechaNacimientoJugador(e.target.value), required: true },
              { placeholder: 'DNI', value: dniJugador, onChange: (e) => setDniJugador(e.target.value), required: true },
              { type: 'select', placeholder: 'Seleccionar Equipo', value: equipoIdJugador !== null ? equipoIdJugador : '', onChange: (e) => setEquipoIdJugador(parseInt(e.target.value)), options: equipos.map(e => ({ value: e.id, label: e.nombre })) },
            ]}
            onSubmit={(e) => handleSubmit(e, 'jugador', { nombre: nombreJugador, apellidos: apellidosJugador, fechanacimiento: fechaNacimientoJugador, dni: dniJugador, equipoid: equipoIdJugador }, () => {
              setNombreJugador('');
              setApellidosJugador('');
              setFechaNacimientoJugador('');
              setDniJugador('');
              setEquipoIdJugador(null);
            })}
            isLoading={isLoading}
          />
          <div className="mt-3">
            <h3>Eliminar jugador</h3>
            <FormComponent
              title=""
              fields={[
                { type: 'select', placeholder: 'Seleccionar Jugador', value: selectedJugadorId !== null ? selectedJugadorId : '', onChange: (e) => setSelectedJugadorId(parseInt(e.target.value)), options: jugadores.map(j => ({ value: j.id, label: `${j.nombre} ${j.apellidos}` })) },
              ]}
              onSubmit={(e) => { e.preventDefault(); handleDelete('jugador', selectedJugadorId); }}
              buttonText="Eliminar"
              buttonClass="btn btn-danger" 
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
