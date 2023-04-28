import React, { useEffect, useState } from 'react'
import axios from 'axios';

//*Form Validation import
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { API_BASE_URL } from '../../config/config';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Flex,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Divider,
    Heading,
    VStack,
    FormErrorMessage,
} from '@chakra-ui/react';

//*Handling validation errors for each input type
const formValidationSchema = z.object({
    username: z.string().nonempty().min(5, "Username must be at least 5 characters long"),
    email: z.string().nonempty().email("Invalid email address"),
});

export default function ProfileManagement() {
    const [profile, setProfile] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateProfile, setUpdateProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [setIsUpdating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customError, setCustomError] = useState("");
    const [formData, setFormData] = useState({});

    const { register,
        handleSubmit,
        formState: { errors }, getValues, reset } = useForm({
            resolver: zodResolver(formValidationSchema)
        });

    const token = localStorage.getItem('token');

    //* Fetching users by Id
    useEffect(() => {
        const fetchProfile = async () => {
            setIsUpdating(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/users/me`, {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                if (response.status === 200 || response.status === 201) {
                    // console.log('Fetched data:', response.data);
                    setProfile(response.data.user);
                    setIsLoading(false);
                    setUpdateProfile(false);
                }
            } catch (error) {
                console.error('Error fetching data from server', error);
            } finally {
                setIsLoading(false);

            }
        };
        fetchProfile();
    }, [updateProfile])

    if (isLoading) {
        return (
            <Flex justifyContent="center" alignItems="center" minH="100vh">
                <Spinner />
            </Flex>
        );
    }

    //* Updating users details by ID
    const updateUsersProfile = async (data) => {
        setIsUpdating(true);
        try {
            const response = await axios.put(`${API_BASE_URL}/users/me`, data, {
                headers: {
                    'x-auth-token': token,
                },
            });
            if (response.status === 200 || response.status === 201) {
                setIsUpdating(false);
                return response.data.user;
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdateConfirmation = async () => {
        setIsSubmitting(true);
        setIsModalOpen(false);
        reset();
        const updatedProfile = await updateUsersProfile(formData);
        setIsSubmitting(false);
        setProfile(updatedProfile);
        setUpdateProfile((prevState) => !prevState);
    };

    //*Submitting form after Validation
    const handleFormSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
            console.error('Validation errors:', errors);
            return;
        }
        const updatedData = {
            ...(data.username !== "" && { username: data.username }),
            ...(data.email !== "" && { email: data.email }),
        };
        if (Object.keys(updatedData).length > 0) {
            setFormData(updatedData); // Save the updatedData for use in the modal
            setIsModalOpen(true); // Open the modal
        } else {
            console.log("No fields to update");
        }
        setFormData(data);
        setIsModalOpen(true);
    };

    const checkFields = () => {
        const values = getValues();
        if (!values.username || !values.email) {
            setCustomError("Both fields should be filled.");
        } else {
            setCustomError("");
        }
    };


    return (
        <Flex
            alignItems="center"
            justifyContent="center"

            flexDirection="column"

        >

            <Heading mb={8} color="white">
                Update Your Details
            </Heading>
            <VStack spacing={6} align="stretch">
                <Stack spacing={8}>
                    <Text fontSize='2xl'>Username: {profile?.username}</Text>
                    <Text fontSize='2xl'>Email: {profile?.email}</Text>
                </Stack>

                <Divider />

                <Stack spacing={4}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>

                        <FormControl id='username' mb={4} isInvalid={errors.username}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                {...register('username')}
                                name="username"
                                type='text'
                                placeholder={profile?.username || ""}
                                onChange={checkFields}
                            />
                            <FormErrorMessage>
                                {errors.username?.message}
                                {customError}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id='email' mb={4} isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                {...register('email')}
                                name="email"
                                type="email"
                                placeholder={profile?.email || ""}
                                onChange={checkFields}
                            />
                            <FormErrorMessage>
                                {errors.email?.message}
                                {customError}
                            </FormErrorMessage>
                        </FormControl>
                        <Button type="submit" colorScheme="teal" mb={4} width="100%"
                            isLoading={isSubmitting}
                            spinner={<Spinner />}>
                            Update Profile
                        </Button>
                    </form>
                </Stack>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirm Update</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure you want to update your profile with the entered information?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleUpdateConfirmation}>
                                Update
                            </Button>
                            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </VStack>
        </Flex>
    );

}
