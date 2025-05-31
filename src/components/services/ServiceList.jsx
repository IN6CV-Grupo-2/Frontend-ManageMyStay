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
                    <Th>Precio</Th>
                    <Th>Descripción</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Thead>
            <Tbody>
                {services.map((service) => (
                    <Tr key={service._id}>
                        <Td>{service.name}</Td>
                        <Td>Q. {service.price}</Td>
                        <Td>{service.description}</Td>
                        <Td>
                            <IconButton
                                size="sm"
                                colorScheme="yellow"
                                icon={<EditIcon />}
                                mr={2}
                                onClick={() => onEdit(service)}
                                aria-label="Editar servicio"
                            />
                            <IconButton
                                size="sm"
                                colorScheme="red"
                                icon={<DeleteIcon />}
                                onClick={() => onDelete(service._id)}
                                aria-label="Eliminar servicio"
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default ServiceList;