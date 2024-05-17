
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaInicio from './components/PaginaInicio'; 
import Login from './components/Login'; 
import Registro from './components/Registro';
import Staff from './components/Staff';
import Torneos from './components/Torneos';

function PrincipalApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/registro" element={<Registro />} /> 
        <Route path="/staff" element={<Staff />} />
        <Route path="/torneos" element={<Torneos />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default PrincipalApp;
