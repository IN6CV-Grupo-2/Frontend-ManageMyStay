import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react";

const RoomForm = ({ isOpen, onClose, onSave, initialData, hotelId }) => {
  const [formData, setFormData] = useState({
    number: "",
    type: "",
    ability: "",
    priceNight: "",
    status: true,
    hotel: "",
    _id: "",
  });

  useEffect(() => {
    if (initialData) {
      const hotelIdResolved =
        typeof initialData.hotel === "object"
          ? initialData.hotel._id
          : initialData.hotel;

      setFormData({
        number: initialData.number || "",
        type: initialData.type || "",
        ability: initialData.ability || "",
        priceNight: initialData.priceNight || "",
        status: initialData.status ?? true,
        hotel: hotelIdResolved || hotelId,
        _id: initialData._id || "",
      });
    } else {
      setFormData({
        number: "",
        type: "",
        ability: "",
        priceNight: "",
        status: true,
        hotel: hotelId,
        _id: "",
      });
    }
  }, [initialData, isOpen, hotelId]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {

    const roomId = formData._id;
    const { _id, ...rest } = formData;

    const dataToSend = {
      ...rest,
      hotel: typeof rest.hotel === 'object' ? rest.hotel._id : rest.hotel,
      priceNight: Number(rest.priceNight)
    };

    onSave(dataToSend, roomId);
    onClose();
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formData._id ? "Edit Room" : "Add Room"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Number</FormLabel>
            <Input
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Type</FormLabel>
            <Input
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Ability</FormLabel>
            <Input
              name="ability"
              value={formData.ability}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Price per Night</FormLabel>
            <Input
              name="priceNight"
              value={formData.priceNight}
              onChange={handleChange}
              type="number"
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" mb={3}>
            <FormLabel mb="0">Available</FormLabel>
            <Switch
              name="status"
              isChecked={formData.status}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            {formData._id ? "Save Changes" : "Add Room"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RoomForm;