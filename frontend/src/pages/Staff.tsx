import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import YoCoordinador from "../assets/YoCoordinador.jpeg";
import YoSeseña from "../assets/YoSeseña.jpeg";
import YoSitioJuv from "../assets/YoSitioJuv.jpeg";
import Fisioterapeuta from "../assets/MarioFisio.jpg";
import  '../styles/Staff.css';
import NavBar from '../components/NavBar';

const PersonalCard: React.FC<{ imgSrc: string; title: string; description: string }> = ({ imgSrc, title, description }) => {
    return (
        <Col md={6} lg={6}>
            <Card>
                <Card.Img 
                variant="top" 
                src={imgSrc} 
                alt={title} style={{ maxHeight: '600px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title className="card-title">{title}</Card.Title>
                    <Card.Text className="card-description">{description}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

const Staff: React.FC = () => {
    return (
        <div className="Staff-container">
            <div className="containerTitulo">
            <h1>Staff</h1>
            <NavBar />    
            </div>        
            <div className="director-deportivo"> 
                <h2>Director Deportivo</h2>
                <Row>
                    <PersonalCard
                        imgSrc={YoCoordinador}
                        title="Director Deportivo"
                        description="Mario Campos, quiromasajista y osteópata, actualmente en el equipo
                        World Tour Bahrain Victorius, con 10 años de experiencia en la élite
                        del ciclismo en equipos como UAE emirates, mejor equipo del mundo en
                        2023 y en la selección Española de ciclismo también actualmente."
                    />
                </Row>
            </div>
            <div className="entrenadores">
                <h2>Entrenadores</h2>
                <Row className="justify-content-center">
                    <PersonalCard
                        imgSrc={YoSeseña}
                        title="Entrenador 1"
                        description="Mario Campos, quiromasajista y osteópata, actualmente en el equipo
                        World Tour Bahrain Victorius, con 10 años de experiencia en la élite
                        del ciclismo en equipos como UAE emirates, mejor equipo del mundo en
                        2023 y en la selección Española de ciclismo también actualmente."
                    />
                    <PersonalCard
                        imgSrc={YoSitioJuv}
                        title="Entrenador 2"
                        description="Mario Campos, quiromasajista y osteópata, actualmente en el equipo
                        World Tour Bahrain Victorius, con 10 años de experiencia en la élite
                        del ciclismo en equipos como UAE emirates, mejor equipo del mundo en
                        2023 y en la selección Española de ciclismo también actualmente."
                    />
                    <PersonalCard
                        imgSrc={YoSeseña}
                        title="Entrenador 3"
                        description="Mario Campos, quiromasajista y osteópata, actualmente en el equipo
                        World Tour Bahrain Victorius, con 10 años de experiencia en la élite
                        del ciclismo en equipos como UAE emirates, mejor equipo del mundo en
                        2023 y en la selección Española de ciclismo también actualmente."
                    />
                    <PersonalCard
                        imgSrc={YoSitioJuv}
                        title="Entrenador 4"
                        description="Mario Campos, quiromasajista y osteópata, actualmente en el equipo
                        World Tour Bahrain Victorius, con 10 años de experiencia en la élite
                        del ciclismo en equipos como UAE emirates, mejor equipo del mundo en
                        2023 y en la selección Española de ciclismo también actualmente."
                    />
                </Row>
            </div>
            <div className="fisioterapeutas">
                <h2>Fisioterapeutas</h2>
                <Row>
                    <PersonalCard
                        imgSrc={Fisioterapeuta}
                        title="Fisioterapeuta"
                        description="Mario Campos, quiromasajista y osteópata, actualmente en el equipo
                        World Tour Bahrain Victorius, con 10 años de experiencia en la élite
                        del ciclismo en equipos como UAE emirates, mejor equipo del mundo en
                        2023 y en la selección Española de ciclismo también actualmente."
                    />
                </Row>
            </div>
        </div>
    );
}

export default Staff;
