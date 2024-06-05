import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaInicio from './pages/PaginaInicio'; 
import Login from './pages/Login'; 
import Registro from './pages/Registro';
import Staff from './pages/Staff';
import Torneos from './pages/Torneos';
import Equipos from './pages/Equipos';
import VerificarCorreo from './pages/verifyEmail';
import Dashboard from './pages/Dashboard'; 
import PrivateRoute from './components/PrivateRoute'; 
import { AuthProvider } from './pages/AuthProvider'; 
import Tecnificacion from './pages/Tecnificacion';

function PrincipalApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/registro" element={<Registro />} /> 
          <Route path="/staff" element={<Staff />} />
          <Route path="/torneos" element={<Torneos />} /> 
          <Route path="/equipos" element={<Equipos />} /> 
          <Route path="/verify-email" element={<VerificarCorreo />} /> 
          <Route path="/tecnificacion" element={<Tecnificacion />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default PrincipalApp;
