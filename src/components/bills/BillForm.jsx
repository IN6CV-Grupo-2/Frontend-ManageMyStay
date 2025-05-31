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
    Select,
    useToast,
    VStack,
    SlideFade,
    Spinner,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useBills } from '../../hooks/useBills.jsx';
import { getReservationByHotel } from '../../services/reservationService.js';

const BillForm = ({ isOpen, onClose }) => {
    const [selectedReservation, setSelectedReservation] = useState('');
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();
    const { createAutoBill } = useBills();

    useEffect(() => {
        const fetchReservations = async () => {
            setIsLoading(true);
            const res = await getReservationByHotel();
            if (res.error) {
                setError(res.e?.response?.data?.msg || "Error al obtener reservaciones");
            } else {
                setReservations(res || []);
                setError(null);
            }
            setIsLoading(false);
        };

        if (isOpen) {
            fetchReservations();
        }
    }, [isOpen]);

    const handleGenerate = async () => {
        if (!selectedReservation) {
            toast({
                title: 'Selecciona una reservación',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        await createAutoBill(selectedReservation);
        setSelectedReservation('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Generar Factura Automática</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SlideFade in={isOpen} offsetY="20px">
                        <VStack spacing={4}>
                            {isLoading ? (
                                <Spinner />
                            ) : error ? (
                                <Text color="red.500">Error: {error}</Text>
                            ) : (
                                <FormControl>
                                    <FormLabel>Selecciona una Reservación</FormLabel>
                                    <Select
                                        placeholder="Selecciona una reservación"
                                        value={selectedReservation}
                                        onChange={(e) => setSelectedReservation(e.target.value)}
                                    >
                                        {reservations.map((res) => (
                                            <option key={res._id} value={res._id}>
                                                {res.code || `Reservación ${res._id}`}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </VStack>
                    </SlideFade>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>
                        Cancelar
                    </Button>
                    <Button colorScheme="blue" onClick={handleGenerate} isDisabled={isLoading || error}>
                        Generar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BillForm;