import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Footer from '../shared/Footer';

import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  useMediaQuery,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';

//*Handling validation errors for each input type
const formValidationSchema = z.object({
  username: z.string().nonempty('Name is required').min(5, 'Username must be at least 5 characters long'),
  password: z.string().nonempty('Password is required').min(5, 'Password must be at least 5 characters long'),
  email: z.string().nonempty('Email is required'),
  confirmPassword: z.string().nonempty('Confirm Password is required'),
})

export default function RegisterUserForm(props) {

  const { register,
    handleSubmit,
    formState: { errors }, getValues, setError, } = useForm({
      resolver: zodResolver(formValidationSchema)
    });

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.300, blue.500)',
    'linear(to-r, blue.600, blue.800)'
  );

  const formBg = useColorModeValue('white', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.800');

  //*Validating Password
  const validatePassword = () => {
    if (getValues('password') !== getValues('confirmPassword')) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return false;
    }
    return true;
  };

  const handleFormSubmit = (data) => {
    if (!validatePassword()) {
      return;
    }

    const registerUser = {
      username: data.username,
      password: data.password,
      email: data.email,
    }

    props.onAddRegisterUser(registerUser);
  }

  return (
    <>


      <Flex
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        flexDirection="column"
        bgGradient={bgGradient}
      >
        <Heading mb={8} color="white">
          Register
        </Heading>
        <Box
          maxWidth={isLargerThan768 ? '500px' : '100%'}
          borderWidth={1}
          borderRadius="lg"
          p={8}
          boxShadow="2xl"
          minWidth="320px"
          bg={formBg}
        >
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl id="username" mb={4} isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register('username')}
                type="text"
                placeholder="Enter your userName" />
              <FormErrorMessage>
                {errors.username?.message}
              </FormErrorMessage>
            </FormControl>


            <FormControl id="email" mb={4} isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter your email" />
              <FormErrorMessage>
                {errors.email?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="password" mb={4} isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                {...register('password')}
                type="password"
                placeholder="Enter your password" />
              <FormErrorMessage>
                {errors.password?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="confirm-password" mb={4} isInvalid={errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm your password"
              />
              <FormErrorMessage>
                {errors.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>


            <Button type="submit" colorScheme="blue" mb={4} width="100%">
              Register
            </Button>
            <Link as={RouterLink} to="/login" color="blue.500">
              Already have an account? Login
            </Link>
          </form>
        </Box>
      </Flex>

      <Footer />
    </>
  )
}
