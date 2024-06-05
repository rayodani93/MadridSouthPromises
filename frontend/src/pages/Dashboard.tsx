import React, { useState, useEffect, FormEvent } from 'react';
import supabase from '../config/supabaseClient';
import FormComponent from '../components/FormComponent';
import NavBar from '../components/NavBar';

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

  useEffect(() => {
    const fetchEquipos = async () => {
      const { data, error } = await supabase
        .from('equipos')
        .select('id, nombre');
      if (error) {
        console.error('Error fetching equipos:', error);
      } else {
        setEquipos(data);
      }
    };
    fetchEquipos();
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
