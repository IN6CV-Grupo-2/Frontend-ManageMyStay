import { Box, Heading, Button, useDisclosure } from "@chakra-ui/react";
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

    return (
        <Box p={6}>
            <Heading mb={4}>Gestión de Servicios</Heading>
            <Button colorScheme="blue" onClick={onOpen} mb={4}>
                Crear Servicio
            </Button>

            <ServiceList
                services={services}
                isLoading={isLoading}
                onEdit={editService}
                onDelete={removeService}
            />

            <ServiceForm isOpen={isOpen} onClose={onClose} onSubmit={createService} />
        </Box>
    );
};

export default ServicesPage;