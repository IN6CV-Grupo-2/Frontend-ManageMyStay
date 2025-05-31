import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Box,
    IconButton,
    HStack,
    useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const BillTable = ({ bills = [], onEdit, onDelete }) => {
    return (
        <Box overflowX="auto" borderRadius="lg" boxShadow="md" bg="white">
            <Table variant="simple" colorScheme="blue">
                <Thead bg="blue.100">
                    <Tr>
                        <Th>Fecha</Th>
                        <Th>Cliente</Th>
                        <Th>Detalles</Th>
                        <Th>Total</Th>
                        <Th>Estado</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {bills.map((bill) => (
                        <Tr key={bill._id}>
                            <Td>{format(new Date(bill.emitionDate), 'dd/MM/yyyy')}</Td>
                            <Td>{bill.costumer?.name || 'Desconocido'}</Td>
                            <Td>{bill.details}</Td>
                            <Td>Q {Number(bill.total || 0).toFixed(2)}</Td>
                            <Td>
                                <Badge colorScheme={bill.status ? 'green' : 'red'}>
                                    {bill.status ? 'Activa' : 'Inactiva'}
                                </Badge>
                            </Td>
                            <Td>
                                <HStack spacing={2}>
                                    
                                    <IconButton
                                        icon={<DeleteIcon />}
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => onDelete(bill._id)}
                                    />
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default BillTable;