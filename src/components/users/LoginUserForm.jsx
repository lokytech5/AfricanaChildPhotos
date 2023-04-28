import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
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
  FormErrorMessage
} from '@chakra-ui/react';

//*Handling validation errors for each input type

const formValidationSchema = z.object({
  username: z.string().nonempty('Name is required'),
  password: z.string().nonempty('Password is required'),
});

export default function LoginUserForm(props) {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formValidationSchema)
  });

  const navigate = useNavigate();

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.300, blue.500)',
    'linear(to-r, blue.600, blue.800)'
  );

  const formBg = useColorModeValue('white', 'gray.700');

  const handleFormSubmit = (data) => {
    const loginData = {
      username: data.username,
      password: data.password,
    };

    props.onAddLogin(loginData)

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
        <Heading mb={8} color="white" fontFamily="Playfair Display, serif">
          Login
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
            <FormControl id="usename" mb={4} isInvalid={errors.username}>
              <FormLabel>UserName</FormLabel>
              <Input
                {...register('username')}
                type="text"
                placeholder="Enter your userName" />
              <FormErrorMessage>
                {errors.username?.message}
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
            <Button type="submit" colorScheme="blue" mb={4} width="100%" isLoading={props.isLoading}>
              Login
            </Button>
            <Link as={RouterLink} to="/register" color="blue.500">
              Don't have an account? Register
            </Link>
          </form>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
