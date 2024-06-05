import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSession } from '@supabase/auth-helpers-react';
import supabase from '../config/supabaseClient';
import { Modal, Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import estadio from '../assets/Estadio.jpg'; // Importación ESModules
import NavBar from '../components/NavBar';

interface Reservation {
    id?: number;
    title: string;
    start_time: string;
    end_time: string;
    user_id: string;
}

const Tecnificacion: React.FC = () => {
    const session = useSession();
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
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
    }, []);

    const handleDateChange = (value: Date | Date[] | null) => {
        const selectedDate = Array.isArray(value) ? value[0] : value;
        if (selectedDate && session) {
            if ([0, 2, 4].includes(selectedDate.getDay())) { // 0: Sunday, 2: Tuesday, 4: Thursday
                setDate(selectedDate);
                setShowModal(true);
            } else {
                setError('Las clases solo están disponibles los domingos, martes y jueves.');
            }
        } else {
            setError('Debe iniciar sesión para reservar una clase.');
        }
    };

    const getAvailableTimes = () => {
        if (!date) return [];

        const day = date.getDay();
        if (day === 0) { // Sunday
            return [
                { start: '09:00', end: '10:30', description: 'Benjamines y Femenino' },
                { start: '10:30', end: '12:00', description: 'Infantiles y Alevines' },
                { start: '12:00', end: '13:30', description: 'Juveniles y Cadetes' }
            ];
        } else if (day === 2 || day === 4) { // Tuesday and Thursday
            return [
                { start: '18:00', end: '19:20', description: 'Benjamines y Femenino' },
                { start: '19:20', end: '20:40', description: 'Infantiles y Alevines' },
                ...(day === 4 ? [{ start: '20:40', end: '22:00', description: 'Juveniles y Cadetes' }] : [])
            ];
        }
        return [];
    };

    const handleCreateReservation = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date || !session) return;

        const selectedTime = getAvailableTimes().find(t => t.description === time);
        if (!selectedTime) return;

        const start_time = new Date(date);
        const [startHour, startMinute] = selectedTime.start.split(':');
        start_time.setHours(parseInt(startHour), parseInt(startMinute));

        const end_time = new Date(date);
        const [endHour, endMinute] = selectedTime.end.split(':');
        end_time.setHours(parseInt(endHour), parseInt(endMinute));

        const newReservation: Reservation = {
            title,
            start_time: start_time.toISOString(),
            end_time: end_time.toISOString(),
            user_id: session.user.id,
        };

        const { data, error } = await supabase
            .from('reservas')
            .insert([newReservation])
            .select('*'); // Agregamos select para obtener los datos insertados

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
        setTime('');
        setTitle('');
        setError(null);
        setSuccess(null);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'time') {
            setTime(value);
        }
    };

    const tileDisabled = ({ date }: { date: Date }) => {
        return ![0, 2, 4].includes(date.getDay()); // Disable all days except Sunday, Tuesday, Thursday
    };

    return (
        <Container className="mt-4">
            <h1>Reserva de Clases de Tecnificación</h1>
            <div className="form-nav-container">
                <NavBar />
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Row>
                <Col md={8} className="mx-auto">
                    <Calendar
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
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Horario</Form.Label>
                            <Form.Control
                                as="select"
                                name="time"
                                value={time}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar horario</option>
                                {getAvailableTimes().map((timeOption) => (
                                    <option key={timeOption.description} value={timeOption.description}>
                                        {timeOption.start} - {timeOption.end} {timeOption.description}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" className="mt-3">Reservar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <div className="text-center mt-4">
                <img src={estadio} alt="Estadio" className="img-fluid rounded" />
            </div>
        </Container>
    );
};

export default Tecnificacion;
