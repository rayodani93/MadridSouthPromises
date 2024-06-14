import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../pages/AuthProvider';
import supabase from '../config/supabaseClient';
import { Modal, Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import entrenamiento from '../assets/entrenamientoEspaña.jpg';
import NavBar from '../components/NavBar';
import '../styles/tecnificacion.css';

interface Reservation {
    id?: number;
    nombre: string;
    start_time: string;
    end_time: string;
    user_id: string;
    categoria: string;
}

const Tecnificacion: React.FC = () => {
    const { session, user } = useAuth();
    const [date, setDate] = useState<Date | null>(null);
    const [categoria, setCategoria] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        console.log('Session:', session);
        console.log('User:', user);

        const fetchReservations = async () => {
            const { data, error } = await supabase
                .from('reservas')
                .select('*');
            if (error) {
                console.error('Error fetching reservations:', error);
            } else {
                setReservations(data ?? []);
            }
        };

        fetchReservations();
    }, [session, user]);

    const handleDateChange = (value: Date | Date[] | null) => {
        const selectedDate = Array.isArray(value) ? value[0] : value;
        if (selectedDate && session) {
            if ([0, 2, 4].includes(selectedDate.getDay())) { 
                setDate(selectedDate);
                setShowModal(true);
                setError(null); 
            } else {
                setError('Las clases solo están disponibles los domingos, martes y jueves.');
            }
        } else {
            setError('Debe iniciar sesión para reservar una clase.');
        }
    };

    const getAvailableTimes = () => {
        if (!date) return [];

        return [
            { categoria: 'Benjamines', time: '09:00 - 10:30' },
            { categoria: 'Femenino', time: '09:00 - 10:30' },
            { categoria: 'Infantiles', time: '10:30 - 12:00' },
            { categoria: 'Alevines', time: '10:30 - 12:00' },
            { categoria: 'Cadetes', time: '12:00 - 13:30' },
            { categoria: 'Juveniles', time: '12:00 - 13:30' }
        ];
    };

    const handleCreateReservation = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date || !session || !user) {
            setError('Debe iniciar sesión para reservar una clase.');
            return;
        }

        const selectedTime = getAvailableTimes().find(t => t.categoria === categoria);
        if (!selectedTime) return;

        const start_time = new Date(date);
        const [startHour, startMinute] = selectedTime.time.split(' - ')[0].split(':');
        start_time.setHours(parseInt(startHour), parseInt(startMinute));

        const end_time = new Date(date);
        const [endHour, endMinute] = selectedTime.time.split(' - ')[1].split(':');
        end_time.setHours(parseInt(endHour), parseInt(endMinute));

        // Mirar si ya hay 16 reservas para la categoría seleccionada en la fecha seleccionada
        const { count } = await supabase
            .from('reservas')
            .select('*', { count: 'exact' })
            .eq('categoria', categoria)
            .gte('start_time', start_time.toISOString().split('T')[0])
            .lt('end_time', end_time.toISOString().split('T')[0]);

        if ((count ?? 0) >= 16) {
            setError(`No se pueden hacer más reservas para la categoría ${categoria} en esta fecha.`);
            return;
        }

        const newReservation: Reservation = {
            nombre,
            start_time: start_time.toISOString(),
            end_time: end_time.toISOString(),
            user_id: user.id,
            categoria,
        };

        const { data, error } = await supabase
            .from('reservas')
            .insert([newReservation])
            .select('*'); 

        if (error) {
            setError('Error al reservar la clase.');
            console.error('Error creating reservation:', error);
        } else if (data && data.length > 0) {
            const newEvent = data[0];
            setSuccess('Clase reservada con éxito.');
            setReservations([...reservations, { ...newReservation, id: newEvent.id }]);
            setShowModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDate(null);
        setCategoria('');
        setNombre('');
        setError(null);
        setSuccess(null);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'nombre') {
            setNombre(value);
        } else if (name === 'categoria') {
            setCategoria(value);
        }
    };

    const tileDisabled = ({ date }: { date: Date }) => {
        return ![0, 2, 4].includes(date.getDay()); // Para que no se pueda reservar en días que no hay clases
    };

    return (
        <Container className="mt-4">
            <h1>Tecnificación</h1>
            <div className="form-nav-container">
                <NavBar />
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Row className='RowCalendar'>
                <Col md={5}  className="ColCalendar">
                    <Calendar className="Calendar"
                        onChange={handleDateChange as any}
                        value={date}
                        tileDisabled={tileDisabled}
                    />
                </Col>
            </Row>
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservar Clase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateReservation}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoria"
                                value={categoria}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                {getAvailableTimes().map((timeOption) => (
                                    <option key={timeOption.categoria} value={timeOption.categoria}>
                                        {timeOption.categoria} ({timeOption.time})
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" className="mt-3">Reservar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <div className="text-center mt-4">
                <img src={entrenamiento} alt="Estadio" className="img-fluid rounded" />
            </div>
        </Container>
    );
};

export default Tecnificacion;
