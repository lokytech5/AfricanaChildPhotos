import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

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
} from '@chakra-ui/react';

export default function RegisterUserForm() {

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const bgGradient = useColorModeValue(
    'linear(to-r, teal.300, teal.500)',
    'linear(to-r, teal.600, teal.800)'
  );

  return (
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
        bg="white"
      >
        <form>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <FormControl id="confirm-password" mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" mb={4} width="100%">
            Register
          </Button>
          <Link as={RouterLink} to="/login" color="teal.500">
            Already have an account? Login
          </Link>
        </form>
      </Box>
    </Flex>
  )
}
