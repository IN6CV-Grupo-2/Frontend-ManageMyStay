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
    Input,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const ServiceForm = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState({ name: "", description: "" });
    const toast = useToast();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.description) {
            toast({
                title: "Campos requeridos",
                description: "Nombre y descripción son obligatorios.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        await onSubmit(form);
        setForm({ name: "", description: "" });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Crear Servicio</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={3}>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej: Limpieza"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Descripción</FormLabel>
                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe el servicio"
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ServiceForm;