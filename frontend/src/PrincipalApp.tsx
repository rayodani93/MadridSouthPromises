import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaInicio from './pages/PaginaInicio'; 
import Login from './pages/Login'; 
import Registro from './pages/Registro';
import Staff from './pages/Staff';
import Torneos from './pages/Torneos';
import Equipos from './pages/Equipos';
import EquipoDetalle from './pages/EquipoDetalle'; // Importa el componente EquipoDetalle
import VerificarCorreo from './pages/verifyEmail';
import Dashboard from './pages/Dashboard'; // Importa el componente Dashboard

function PrincipalApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/registro" element={<Registro />} /> 
        <Route path="/staff" element={<Staff />} />
        <Route path="/torneos" element={<Torneos />} /> 
        <Route path="/equipos" element={<Equipos />} /> 
        <Route path="/equipos/:id" element={<EquipoDetalle />} /> 
        <Route path="/verify-email" element={<VerificarCorreo />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> {/* Añade la ruta para Dashboard */}
      </Routes>
    </BrowserRouter>
  );
}

export default PrincipalApp;
