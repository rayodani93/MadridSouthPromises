import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Alert, Modal, Button } from 'react-bootstrap';
import supabase from '../config/supabaseClient';
import estadio from '../assets/Estadio.jpg'; // Asegúrate de que la ruta es correcta
import '../styles/Equipos.css';
import NavBar from '../components/NavBar';

interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
}

interface Jugador {
  id: number;
  nombre: string;
  apellidos: string;
}

interface Staff {
  id: number;
  nombre: string;
  apellidos: string;
  puesto: string;
}

interface EquipoDetalleProps {
  equipo: Equipo | null;
  show: boolean;
  handleClose: () => void;
}

const EquipoDetalle: React.FC<EquipoDetalleProps> = ({ equipo, show, handleClose }) => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (equipo) {
      const fetchDetalles = async () => {
        setLoading(true);

        // Obtener jugadores del equipo
        const { data: jugadoresData, error: jugadoresError } = await supabase
          .from('jugadores')
          .select('*')
          .eq('equipoid', equipo.id);

        if (jugadoresError) {
          console.error('Error al cargar los jugadores:', jugadoresError);
        } else {
          setJugadores(jugadoresData || []);
        }

        // Obtener staff del equipo
        const { data: staffData, error: staffError } = await supabase
          .from('staff')
          .select('*')
          .eq('equipoid', equipo.id);

        if (staffError) {
          console.error('Error al cargar el staff:', staffError);
        } else {
          setStaff(staffData || []);
        }

        setLoading(false);
      };

      fetchDetalles();
    }
  }, [equipo]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{equipo?.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <div>
            <p><strong>Categoría:</strong> {equipo?.categoria}</p>
            <h5>Jugadores</h5>
            {jugadores.length > 0 ? (
              <ul>
                {jugadores.map(jugador => (
                  <li key={jugador.id}>{jugador.nombre} {jugador.apellidos}</li>
                ))}
              </ul>
            ) : (
              <p>No hay jugadores en este equipo.</p>
            )}
            <h5>Staff</h5>
            {staff.length > 0 ? (
              <ul>
                {staff.map(staffMember => (
                  <li key={staffMember.id}>{staffMember.nombre} {staffMember.apellidos} - {staffMember.puesto}</li>
                ))}
              </ul>
            ) : (
              <p>No hay miembros del staff en este equipo.</p>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Equipos: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEquipo, setSelectedEquipo] = useState<Equipo | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('equipos')
          .select('*');

        if (error) {
          setError('Error al cargar los equipos');
          console.error('Error al cargar los equipos:', error);
        } else {
          setEquipos(data);
        }
      } catch (error) {
        setError('Error al cargar los equipos');
        console.error('Error al cargar los equipos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  const handleEquipoClick = (equipo: Equipo) => {
    setSelectedEquipo(equipo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEquipo(null);
  };

  return (
    <Container className="equipos-container mt-4">
      <h1 className="my-4">Equipos</h1>
      <NavBar />
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {!loading && !error && equipos.map((equipo) => (
          <Col md={4} key={equipo.id} className="mb-4">
            <Card className="equipo-card shadow" onClick={() => handleEquipoClick(equipo)}>
              <Card.Body>
                <Card.Title>{equipo.nombre}</Card.Title>
                <Card.Text>Categoría: {equipo.categoria}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedEquipo && (
        <EquipoDetalle
          equipo={selectedEquipo}
          show={showModal}
          handleClose={handleCloseModal}
        />
      )}
      <Row className="mt-4">
        <Col>
          <div className="text-center">
            <img src={estadio} alt="Estadio" className="img-fluid estadio-img" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Equipos;
4