import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaInicio from './pages/PaginaInicio'; 
import Login from './pages/Login'; 
import Registro from './pages/Registro';
import Staff from './pages/Staff';
import Torneos from './pages/Torneos';
import VerificarCorreo from './pages/verifyEmail';

function PrincipalApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/registro" element={<Registro />} /> {/* Ruta correspondiente al componente Registro */}
        <Route path="/staff" element={<Staff />} />
        <Route path="/torneos" element={<Torneos />} /> 
        <Route path="/verify-email" element={<VerificarCorreo />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default PrincipalApp;
