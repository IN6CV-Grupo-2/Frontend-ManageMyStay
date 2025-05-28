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
    CheckboxGroup,
    Stack,
    Checkbox,
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

    const fetchData = async () => {
        try {
            const [usersRes, reservationsRes] = await Promise.all([
                axios.get('/api/users'),
                axios.get('/api/reservations'),
            ]);
            setAllUsers(usersRes.data);
            setAllReservations(reservationsRes.data);
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

    useEffect(() => {
        if (!isOpen) {
            setDetails('');
            setCostumer('');
            setReservations([]);
        }
    }, [isOpen]);

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
                        <CheckboxGroup
                            colorScheme="blue"
                            value={reservations}
                            onChange={setReservations}
                        >
                            <Stack spacing={2}>
                                {allReservations.map((res) => (
                                    <Checkbox key={res._id} value={res._id}>
                                        {res.code || `Reservación ${res._id}`}
                                    </Checkbox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
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
