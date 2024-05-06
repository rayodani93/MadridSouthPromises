import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faUnlockAlt, faTrophy, faTools } from '@fortawesome/free-solid-svg-icons';

interface NavItemProps {
  icon: IconDefinition;
  text: string;
  to?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, to }) => {
  if (to) {
    return (
      <li className="nav-item">
        <Link to={to}>
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </Link>
      </li>
    );
  } else {
    return (
      <li className="nav-item">
        <FontAwesomeIcon icon={icon} />
        <span>{text}</span>
      </li>
    );
  }
}

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <NavItem icon={faHome} text="Inicio" to="/" />
        <NavItem icon={faUsers} text="Staff" to="/staff" />
        <NavItem icon={faUnlockAlt} text="Acceso" to="/login" />
        <NavItem icon={faTrophy} text="Torneos" />
        <NavItem icon={faTools} text="Tecnificación" />       
      </ul>     
    </nav>    
  );
}

export default NavBar;
