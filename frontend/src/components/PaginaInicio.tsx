import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import fotoInicio from "../assets/FotoInicio.jpeg";
import comedor1 from "../assets/Comedor.jpeg";
import comedor2 from "../assets/Comedor2.jpeg";
import NavBar from './NavBar';
import './styles/PaginaInicio.css';

const PaginaInicio: React.FC = () => {
  return (
    <div className="pagina-inicio">
      <Container className="containerTitulo">
        <h1>Madrid Promises South</h1>        
        <NavBar />
      </Container>
      <Container className="containerBody">
        <Row>
          <Col>
            <Card className="text-center mb-4">
              <Card.Img variant="top" src={fotoInicio} alt="Foto de inicio" className="w-100" />
              <Card.Body>
                <Card.Text className="text">
                  <p>En Madrid Promises South, nos especializamos en la formación de equipos para participar en torneos de fútbol que se llevan a cabo durante periodos vacacionales clave, como verano, Navidad y Semana Santa. Nuestra misión es brindar una oportunidad única a jugadores que no cuentan con competiciones federadas en sus respectivas federaciones durante esos períodos.</p>
                  <p>Durante estos torneos, los participantes tienen la oportunidad de seguir compitiendo de manera divertida y estimulante, además de conocer a otros compañeros de juego. Nuestro objetivo es ofrecer una experiencia en la que los jugadores puedan seguir desarrollando sus habilidades futbolísticas mientras disfrutan del espíritu competitivo en un entorno amigable y colaborativo.</p>
                  <p>Además de participar en estos torneos, también organizamos sesiones de entrenamiento y tecnificación para preparar a los equipos y mejorar el rendimiento de cada jugador. Creemos en la importancia de ofrecer una experiencia integral que promueva el crecimiento personal y deportivo de nuestros jóvenes futbolistas.</p>
                  <p>En Madrid Promises South, estamos comprometidos con la excelencia y la pasión por el fútbol. Además, contamos con un equipo de fisioterapeutas que viajarán con nosotros, ofreciendo asistencia inmediata ante cualquier lesión. Únete a nosotros y sé parte de una comunidad que valora el trabajo en equipo, la superación personal y la diversión en el campo de juego.</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="border-0">
              <Card.Img variant="top" src={comedor1} alt="Comedor 1" className="comedor-image" />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0">
              <Card.Img variant="top" src={comedor2} alt="Comedor 2" className="comedor-image" />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PaginaInicio;