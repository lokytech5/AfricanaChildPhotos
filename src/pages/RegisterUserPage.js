import React, { useState } from 'react'
import RegisterUserForm from '../components/users/RegisterUserForm'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

import {
    useToast,
    Flex,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
}
    from '@chakra-ui/react';


export default function RegisterUserPage() {

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    const handleClose = () => {
        setRegistrationSuccess(false);
        navigate("/login");
    };

    const addRegisterUserHandler = async (registerUserData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users', registerUserData);
            console.log("Response status:", response.status);
            if (response.status === 200) {
                console.log('Booking Successfully:', response.data);
                setRegistrationSuccess(true);
            } else {
                console.error('Error while sending form data to the backend:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error while sending form data to the backend:', error.response.data);

            let errorMessage = "Error while sending form data to the backend";

            if (error.response && error.response.data && error.response.data.msg && error.response.data.msg === 'user already exists') {
                errorMessage = 'A user with this email already exists'
            }
            // Handle error, e.g., show an error message
            toast({
                title: 'Error!',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });

        }
    };

    return (
        <>
            <RegisterUserForm onAddRegisterUser={addRegisterUserHandler} />
            <Modal isOpen={registrationSuccess} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Registration successful!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        You have successfully registered. You will be redirected to the login page.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}
