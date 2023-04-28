import React from 'react'
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux';


import {
    Box,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    useMediaQuery,
    Text,
    Link,
    useColorModeValue,
    FormErrorMessage,
    Stack,
    useColorMode,
    Grid,
    Select,
} from '@chakra-ui/react';

//*Handling validation errors for each input type

const formValidationSchema = z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().nonempty('Email address'),
    phoneNumber: z.string().nonempty('Phone number is required'),
    serviceType: z.enum(['wedding', 'portrait', 'event']),
    date: z.string().nonempty('Date is required'),
    time: z.string().nonempty('Time is required'),
    address: z.string().nonempty('Address is required'),
    message: z.string().optional(),
});

const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
};



export default function ServiceBooking(props) {

    const formBg = useColorModeValue('white', 'gray.700');
    const { colorMode } = useColorMode();
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const { register,
        handleSubmit,
        formState: { errors },
        reset } = useForm({
            resolver: zodResolver(formValidationSchema)
        });

    const handleFormSubmit = (data) => {
        // Handle form submission
        const serviceData = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            serviceType: data.serviceType,
            date: data.date,
            time: data.time,
            address: data.address,
            message: data.message,
        }
        props.onAddService(serviceData);
        reset();
    };


    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            flexDirection="column"
            bgGradient="linear(to-r, blue.300, blue.500)"
        >
            <Heading mb={8} color={colorMode === "light" ? "white" : "white"} fontFamily="Playfair Display, serif">
                Service Booking
            </Heading>

            {isAuthenticated ? (<Box
                maxWidth={isLargerThan768 ? '500px' : '100%'}
                borderWidth={1}
                borderRadius="lg"
                p={8}
                boxShadow="2xl"
                minWidth="320px"
                bg={formBg}
            >
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Stack spacing={4}>

                        <FormControl id="name" mb={4} isInvalid={errors.name}>
                            <FormLabel>Name</FormLabel>
                            <Input {...register('name')} type="text" placeholder="Enter your name" />
                            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="email" mb={4} isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input {...register('email')} type="email" placeholder="Enter your email" />
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="phoneNumber" mb={4} isInvalid={errors.phoneNumber}>
                            <FormLabel>Phone Number</FormLabel>
                            <Input {...register('phoneNumber')} type="text" placeholder="Enter your phone number" />
                            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="serviceType" mb={4} isInvalid={errors.serviceType}>
                            <FormLabel>Service Type</FormLabel>
                            <Select {...register('serviceType')} placeholder="Select service type">
                                <option value="portrait">Portrait</option>
                                <option value="event">Event</option>
                                <option value="wedding">Wedding</option>
                            </Select>
                            <FormErrorMessage>{errors.serviceType?.message}</FormErrorMessage>
                        </FormControl>

                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                            <FormControl id="date" mb={4} isInvalid={errors.date}>
                                <FormLabel>Date</FormLabel>
                                <Input {...register('date')}
                                    type="date"
                                    placeholder="Select date"
                                    min={getTodayDate()} />
                                <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="time" mb={4} isInvalid={errors.time}>
                                <FormLabel>Time</FormLabel>
                                <Input {...register('time')}
                                    type="time"
                                    min="06:00"
                                    max="18:00"
                                    placeholder="Select time" />
                                <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
                            </FormControl>
                        </Grid>

                        <FormControl id="address" mb={4} isInvalid={errors.address}>
                            <FormLabel>Address</FormLabel>
                            <Input {...register('address')} type="text" placeholder="Enter your address" />
                            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="message" mb={4}>
                            <FormLabel>Message (optional)</FormLabel>
                            <Textarea {...register('message')} placeholder="Enter a message if any (optional)" />
                        </FormControl>

                        <Button type="submit" colorScheme="blue" mb={4} width="100%">
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>) : (
                <Box mt={6} textAlign="center">
                    <Text fontSize="lg">
                        Please{' '}
                        <Link color="orange" href="/login">
                            log in
                        </Link>{' '}
                        or{' '}
                        <Link color="orange" href="/register">
                            register
                        </Link>{' '}
                        to book a service.
                    </Text>
                </Box>
            )}

        </Flex>
    )
}
