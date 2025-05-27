import {
    Box,
    Heading,
    Button,
    useDisclosure,
    Flex,
    Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useServices } from "../shared/hooks/useServices.jsx";
import ServiceList from "../components/services/ServiceList.jsx";
import ServiceForm from "../components/services/ServiceForm.jsx";

const ServicesPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        services,
        isLoading,
        getServices,
        createService,
        editService,
        removeService,
    } = useServices();

    const [searchTerm, setSearchTerm] = useState("");
    const [serviceToEdit, setServiceToEdit] = useState(null);

    const handleCreateClick = () => {
        setServiceToEdit(null);
        onOpen();
    };

    const handleEditClick = (service) => {
        setServiceToEdit(service);
        onOpen();
    };

    const handleSubmit = async ({ serviceId, formData }) => {
        if (serviceId) {
            await editService(serviceId, formData);
        } else {
            await createService(formData);
        }
    };

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box p={6}>
            <Heading mb={4}>Gestión de Servicios</Heading>

            <Flex mb={4} justify="space-between" gap={4} direction={["column", "row"]}>
                <Input
                    placeholder="Buscar servicio"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    maxW="400px"
                />
                <Button colorScheme="blue" onClick={handleCreateClick}>
                    Crear Servicio
                </Button>
            </Flex>

            <ServiceList
                services={filteredServices}
                isLoading={isLoading}
                onEdit={handleEditClick}
                onDelete={removeService}
            />

            <ServiceForm
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                serviceToEdit={serviceToEdit}
            />
        </Box>
    );
};

export default ServicesPage;