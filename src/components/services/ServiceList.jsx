import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const ServiceList = ({ services, isLoading, onEdit, onDelete }) => {
    if (isLoading) return <Spinner />;

    return (
        <Table variant="striped" colorScheme="gray">
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th>Descripción</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Thead>
            <Tbody>
                {services.map((service) => (
                    <Tr key={service.uid}>
                        <Td>{service.name}</Td>
                        <Td>{service.description}</Td>
                        <Td>
                            <IconButton
                                size="sm"
                                colorScheme="yellow"
                                icon={<EditIcon />}
                                mr={2}
                                onClick={() => onEdit(service.uid, service)}
                            />
                            <IconButton
                                size="sm"
                                colorScheme="red"
                                icon={<DeleteIcon />}
                                onClick={() => onDelete(service.uid)}
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default ServiceList;