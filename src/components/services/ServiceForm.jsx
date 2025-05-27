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
import { useEffect, useState } from "react";

const ServiceForm = ({ isOpen, onClose, onSubmit, serviceToEdit = null }) => {
    const [form, setForm] = useState({ name: "", description: "", price: "" });
    const toast = useToast();

    useEffect(() => {
        if (serviceToEdit) {
            setForm({
                name: serviceToEdit.name || "",
                description: serviceToEdit.description || "",
                price: serviceToEdit.price?.toString() || "",
            });
        } else {
            setForm({ name: "", description: "", price: "" });
        }
    }, [serviceToEdit, isOpen]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.description || !form.price) {
            toast({
                title: "Campos requeridos",
                description: "Todos los campos son obligatorios.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        await onSubmit({ ...form, price: Number(form.price) }, serviceToEdit?._id);
        onClose();
        setForm({ name: "", description: "", price: "" });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{serviceToEdit ? "Editar Servicio" : "Crear Servicio"}</ModalHeader>
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
                    <FormControl mb={3}>
                        <FormLabel>Descripción</FormLabel>
                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe el servicio"
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Precio</FormLabel>
                        <Input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder=""
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        {serviceToEdit ? "Actualizar" : "Guardar"}
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ServiceForm;