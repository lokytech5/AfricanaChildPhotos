import React, { useState } from 'react'
import LoginUserForm from '../components/users/LoginUserForm'

import { useToast, Text } from '@chakra-ui/react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice'

export default function LoginUserPage() {

  const [formData, setFormData] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const addLoginHandler = async (loginData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth', loginData);

      if (response.status === 200 || response.status === 201) {
        console.log("Token stored in local storage:", localStorage.getItem('token'));
        setFormData(loginData);
        const token = response.data.token;
        console.log('Setting token in local storage:', token);
        localStorage.setItem('token', token);
        //Decode the JWT token
        const decodedToken = jwt_decode(token);

        // Dispatch login action
        dispatch(login({ id: decodedToken._id, role: decodedToken.isAdmin ? 'admin' : 'user' }));

        // Show success toast
        toast({
          title: 'Success!',
          description: `Logged in successfully as ${response.data.username}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error('Error while sending form data to the backend:', error);
      // Handle error, e.g., show an error message
      if (error.response.status === 400) {
        toast({
          title: 'Error!',
          description: 'Invalid username or password.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error!',
          description: 'Error while sending form data to the backend.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }
  return (
    <LoginUserForm
      onAddLogin={addLoginHandler} />
  )
}
