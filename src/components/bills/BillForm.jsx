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
import { getReservationByUser } from '../../services/reservationService.js';
import { useDecodedAuth } from '@/context/AuthContext.jsx';

const BillForm = ({ isOpen, onClose }) => {
    const [selectedReservation, setSelectedReservation] = useState('');
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();
    const { createAutoBill } = useBills();

    const {auth} = useDecodedAuth()

    useEffect(() => {
        const fetchReservations = async (id) => {
            setIsLoading(true);

            const res = await getReservationByUser(id);

            if (res.error) {
                setError(res?.e?.response?.data?.msg || 'Error al obtener reservaciones');
            } else {
                setReservations(res || []);
                setError(null);
            }

            setIsLoading(false);
        };

        if (isOpen) {
            setSelectedReservation('');
            fetchReservations(auth.uid);
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

        try {
            await createAutoBill(selectedReservation);
            toast({
                title: 'Factura generada exitosamente',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setSelectedReservation('');
            onClose();
        } catch (error) {
            toast({
                title: 'Error al generar la factura',
                description: error?.response?.data?.msg || 'Intenta nuevamente',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
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
                            ) : reservations.length === 0 ? (
                                <Text>No hay reservaciones disponibles.</Text>
                            ) : (
                                <FormControl isRequired>
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
                    <Button
                        colorScheme="blue"
                        onClick={handleGenerate}
                        isDisabled={
                            isLoading ||
                            error ||
                            !selectedReservation ||
                            reservations.length === 0
                        }
                    >
                        Generar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BillForm;