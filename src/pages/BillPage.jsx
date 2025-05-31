import {
    Box,
    Heading,
    Button,
    Spinner,
    Text,
    useDisclosure,
    Flex,
} from '@chakra-ui/react';
import { useBills } from '../hooks/useBills.jsx';
import BillTable from '../components/bills/BillTable.jsx';
import BillForm from '../components/bills/BillForm.jsx';

const BillPage = () => {
    const { bills, isLoading, error } = useBills();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box p={8} bg="gray.50" minH="100vh">
            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Gestión de Facturas</Heading>
                <Button colorScheme="blue" onClick={onOpen}>
                    Generar Factura desde Reservación
                </Button>
            </Flex>

            {isLoading ? (
                <Spinner size="xl" />
            ) : error ? (
                <Text color="red.500">Error: {error}</Text>
            ) : (
                <BillTable bills={bills} />
            )}

            <BillForm isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export default BillPage;