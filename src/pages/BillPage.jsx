import { useBills } from '../shared/hooks/useBills.jsx';
import {
    Box,
    Heading,
    Button,
    Spinner,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import BillTable from '../components/bills/BillTable.jsx';
import BillForm from '../components/bills/BillForm.jsx';

const BillPage = () => {
    const { bills, isLoading, createBill, error } = useBills();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCreate = async (billData) => {
        await createBill(billData);
        onClose();
    };

    return (
        <Box p={6}>
            <Heading mb={4}>Facturas</Heading>

            <Button colorScheme="blue" onClick={onOpen} mb={4}>
                Crear nueva factura
            </Button>

            {isLoading ? (
                <Spinner />
            ) : error ? (
                <Text color="red.500">Error: {error}</Text>
            ) : (
                <BillTable bills={bills} />
            )}

            <BillForm isOpen={isOpen} onClose={onClose} onSubmit={handleCreate} />
        </Box>
    );
};

export default BillPage;