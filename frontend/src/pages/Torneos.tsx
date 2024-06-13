import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa'; // Importa el ícono de enlace externo
import CostaBlanca from "../assets/CostaBlanca.jpg";
import Donosti from "../assets/DonostiCup.jpg";
import Mediterranean from "../assets/MediterraneanCup.jpeg";
import NavBar from '../components/NavBar';

const PersonalCard: React.FC<{ imgSrc: string; title: string; description: string; website: string }> = ({ imgSrc, title, description, website }) => {
    return (
        <Col md={6} lg={6}>
            <Card>
                <Card.Img
                    variant="top"
                    src={imgSrc}
                    alt={title} style={{ maxHeight: '600px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title className="card-title">
                        {title}
                        <a href={website} className="external-link" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /></a> {/* Enlace al sitio web con el ícono de enlace externo */}
                    </Card.Title>
                    <Card.Text className="card-description">{description}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

const Torneos: React.FC = () => {
    return (
        <div className="Torneos-Titulo">
            <div className="containerTitulo">
                <h1>Torneos</h1>
                <div className="form-nav-container">
                    <NavBar />
                </div>
            </div>
            <div className="Torneos-Info">
                <Row>
                    <PersonalCard
                        imgSrc={CostaBlanca}
                        title="Costa Blanca Cup"
                        description="Descripción de la Costa Blanca Cup"
                        website="https://www.costablancacup.com/es/"
                    />
                </Row>
                <Row>
                    <PersonalCard
                        imgSrc={Donosti}
                        title="Donosti Cup"
                        description="Descripción de la Donosti Cup"
                        website="https://www.donosticup.com/es"
                    />
                </Row>
                <Row>
                    <PersonalCard
                        imgSrc={Mediterranean}
                        title="Mediterranean International Cup"
                        description="Descripción de la Mediterranean International Cup"
                        website="https://eseievents.com/es/torneos-de-futbol/"
                    />
                </Row>
            </div>
        </div>
    );
}

export default Torneos;
