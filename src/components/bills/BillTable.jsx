import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Box,
} from '@chakra-ui/react';
import { format } from 'date-fns';

const BillTable = ({ bills = [] }) => {
    return (
        <Box overflowX="auto">
            <Table variant="striped" colorScheme="blue">
                <Thead>
                    <Tr>
                        <Th>Fecha</Th>
                        <Th>Cliente</Th>
                        <Th>Detalles</Th>
                        <Th>Total</Th>
                        <Th>Estado</Th>
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
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default BillTable;