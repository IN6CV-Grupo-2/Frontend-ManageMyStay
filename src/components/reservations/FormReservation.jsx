import { Box, Stack,Badge,Heading, Button, FormControl, FormLabel, FormErrorMessage, useToast, VStack, Center, Container,useColorModeValue } from "@chakra-ui/react";
import {  useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

export const ReservationForm = ({ mode = 'create'}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {register,handleSubmit, setValue, control,formState: {errors}} = useForm();
    const toast = useToast();
    //const [services, setServices] = useState([]);
    const services = ['Agua Caliente', 'Snacks', 'Toallas', 'Cobijas'];
    const cardBg = useColorModeValue("#F9F7F2", "#2E2A29");

    const options = services.map(service => ({
        value: service,
        label: service
    }));

    const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";

    useEffect(() => {
        const token = localStorage.getItem('x-token');
        if (token) {
            try {
                const decode = jwtDecode(token);
                setValue('guest', decode.uid);
            } catch (err) {
                console.error('Error al decodificar token', err);
            }
        }

        setValue('rooms', id);
    }, [id,setValue])

    useEffect(() => {
        if(Object.keys(errors).length > 0){
            for(const field in errors){
                toast({
                    title: `Error en ${field}`,
                    description: 
                        errors[field].type === 'required'
                        ? 'This field is required'
                        : 'Error in the field',
                    status:'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
    })

    const onSubmit = (datos) => {
        console.log(datos)
    }

    return (
       <Center minH="100vh" bg={meddleBg} >
         <Container maxW="md" p={8} rounded="lg" shadow="lg" bg={cardBg} >
            <VStack spacing={6} align="stretch">
            <Heading textAlign="center" size="lg" >
                Hotel Room Reservation
            </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={5}>
                        <FormControl isInvalid={errors.checkIn}>
                            <FormLabel>Check In</FormLabel>
                            <Controller
                                control={control}
                                name="checkIn"
                                rules={{required: true}}
                                render={({field}) => (
                                    <DatePicker
                                        placeholderText="Select check-in date"
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={new Date()}
                                        className="chakra-input"
                                    />
                                )}
                            />
                            <FormErrorMessage>Check-in date is required</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.checkOut}>
                            <FormLabel>Check Out</FormLabel>
                            <Controller
                                control={control}
                                name="checkOut"
                                rules={{required: true}}
                                render={({field}) => (
                                    <DatePicker
                                        placeholderText="Select check-out date"
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={new Date()}
                                        className="chakra-input"
                                    />
                                )}
                            />
                            <FormErrorMessage>Check-out date is required</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.service}>
                            <FormLabel>Select a Service</FormLabel>
                            <Controller
                                name="service"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={options}
                                        value={
                                            options.find((option) => option.value === field.value) ||
                                            null
                                        }
                                        onChange={(selected) => field.onChange(selected?.value)}
                                        placeholder="Select a Service"
                                    />
                                )}
                            />
                            <FormErrorMessage>Service is required</FormErrorMessage>
                        </FormControl>
                        <input type="hidden" {...register("guest", { required: true })} />
                        <input type="hidden" {...register("rooms", { required: true })} />

                        <Button type="submit" colorScheme="purple" w="full">
                            Enviar
                        </Button>
                    </VStack>
                </form>
            </VStack>
         </Container>
       </Center>
    )
}