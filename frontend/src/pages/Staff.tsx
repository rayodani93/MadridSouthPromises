import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import YoCoordinador from "../assets/YoCoordinador.jpeg";
import YoSeseña from "../assets/YoSeseña.jpeg";
import YoSitioJuv from "../assets/YoSitioJuv.jpeg";
import Fisioterapeuta from "../assets/MarioFisio.jpg";
import VictorMata from "../assets/VictorMata.jpg";
import JesusNieva from "../assets/JesusNieva.jpg";
import '../styles/Staff.css';
import NavBar from '../components/NavBar';

const PersonalCard: React.FC<{ imgSrc: string; title: string; description: string }> = ({ imgSrc, title, description }) => {
    return (
        <Col md={6} lg={6}>
            <Card>
                <Card.Img
                    variant="top"
                    src={imgSrc}
                    alt={title} style={{ maxHeight: '750px', objectFit: 'cover' }} />
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
                <div className="form-nav-container">
                    <NavBar />
                </div>
            </div>
            <div className="director-deportivo">
                <h2>Director Deportivo</h2>
                <Row>
                    <PersonalCard
                        imgSrc={YoCoordinador}
                        title="Daniel de la Fuente Campos"
                        description="Entrenador UEFA B, 31 años actualmnente y desde los 16 años 
                        ejerciendo como entrenador, desde benjamines hasta juvenil autonómica. Como jugador
                        estuvo 3 años en las inferiores del Rayo Vallecano y a nivel local ha vestido los colores
                        de AD Áncora, Cd Sitio de Aranjuez y Real Aranjuez CF. Además ha sido coordinador de la cantera
                        del Real Aranjuez CF y actualmente milita en el CD Arancetano como entrenador del Cadete A
                        "
                    />
                </Row>
            </div>
            <div className="entrenadores">
                <h2>Entrenadores</h2>
                <Row className="justify-content-center">
                    <PersonalCard
                        imgSrc={VictorMata}
                        title="Victor Mata Galiano"
                        description="Entrenador UEFA B, 16 años como jefe de prensa de un histórico del fútbol madrileño
                        como es el Real Aranjuez CF. Además en los últimos años ha sido coordinador general de la cantera
                        además de ejercer como entrenador en primera división autonómica infantil y en Juvenil Preferente.
                        Actualmente es el entrenador del infantil preferente del Parla Escuela, una de las academias más 
                        grandes de la Comunidad de Madrid"
                    />
                    <PersonalCard
                        imgSrc={JesusNieva}
                        title="Jesus Nieva Serrano"
                        description="Entrenador UEFA B, a sus 33 años de edad podemos decir que es uno de los buques insignias
                        del CD Galaxy Sitio de Aranjuez, tras toda su vida ligada al club de sus amores, donde militó como futbolista
                        pasando por todas las categorías para posteriormente hacer lo mismo como entrenador.
                        Cofundador de FutCamp Aranjuez, el primer campus de futbol de nuestra localidad."
                    />
                    <PersonalCard
                        imgSrc={YoSitioJuv}
                        title="Vicente Contreras"
                        description="Entrenador UEFA B, tras una vida ligada al fútbol como jugador, fue la pasión de sus hijos por el mismo
                        lo que le llevó a dar el salto a los banquillos. Tras dos temporadas en el Aranjuez y tras salvar al Juvenil B del descenso
                        tras hacerse cargo del equipo a mitad de temporada, la próxima campaña dirigirá el Juvenil A del CD Arancetano.
                        "
                    />
                    <PersonalCard
                        imgSrc={YoSitioJuv}
                        title="Vicente Contreras"
                        description="Entrenador UEFA B, tras una vida ligada al fútbol como jugador, fue la pasión de sus hijos por el mismo
                        lo que le llevó a dar el salto a los banquillos. Tras dos temporadas en el Aranjuez y tras salvar al Juvenil B del descenso
                        tras hacerse cargo del equipo a mitad de temporada, la próxima campaña dirigirá el Juvenil A del CD Arancetano.
                        "
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
