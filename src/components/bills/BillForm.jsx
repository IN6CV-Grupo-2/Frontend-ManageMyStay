import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BillForm = ({ isOpen, onClose, onSubmit }) => {
    const [details, setDetails] = useState('');
    const [costumer, setCostumer] = useState('');
    const [reservations, setReservations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allReservations, setAllReservations] = useState([]);
    const toast = useToast();

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        try {
            const [usersRes, reservationsRes] = await Promise.all([
                axios.get('/api/users'),
                axios.get('/api/reservations'),
            ]);

            console.log("Respuesta de users:", usersRes.data);
            console.log("Respuesta de reservations:", reservationsRes.data);

            // ✅ Si la API devuelve { users: [...] }, accede a esa propiedad
            setAllUsers(usersRes.data.users || []);
            setAllReservations(reservationsRes.data.reservations || []);
        } catch (e) {
            toast({
                title: 'Error al cargar datos',
                description: e.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const handleSubmit = () => {
        if (!costumer || !details || reservations.length === 0) {
            return toast({
                title: 'Campos incompletos',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }

        onSubmit({ costumer, details, reservations });
        setDetails('');
        setCostumer('');
        setReservations([]);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Crear Factura</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={3}>
                        <FormLabel>Cliente</FormLabel>
                        <Select
                            placeholder="Selecciona un cliente"
                            value={costumer}
                            onChange={(e) => setCostumer(e.target.value)}
                        >
                            {allUsers.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb={3}>
                        <FormLabel>Detalles</FormLabel>
                        <Textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={3}>
                        <FormLabel>Reservaciones</FormLabel>
                        <Select
                            placeholder="Selecciona una o más reservaciones"
                            multiple
                            value={reservations}
                            onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                setReservations(selected);
                            }}
                            height="auto"
                        >
                            {allReservations.map((res) => (
                                <option key={res._id} value={res._id}>
                                    {res.code || `Reservación ${res._id}`}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} mr={3}>
                        Cancelar
                    </Button>
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        Guardar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BillForm;