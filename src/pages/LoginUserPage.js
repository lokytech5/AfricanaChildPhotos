import React, { useState } from 'react'
import LoginUserForm from '../components/users/LoginUserForm'
import { useNavigate } from 'react-router-dom';
import { useToast, Text } from '@chakra-ui/react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { API_BASE_URL } from '../config/config';

import { useSelector, useDispatch } from 'react-redux';
import { login, setIsAuthenticated } from '../redux/userSlice'

export default function LoginUserPage() {

  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addLoginHandler = async (loginData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth`, loginData);

      if (response.status === 200 || response.status === 201) {
        console.log("Token stored in local storage:", localStorage.getItem('token'));
        setFormData(loginData);
        const token = response.data.token;
        const userId = response.data.userId;
        const username = response.data.username;
        console.log('Setting token in local storage:', token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);


        //Decode the JWT token
        const decodedToken = jwt_decode(token);

        // Save userRole in localStorage
        const userRole = decodedToken.isAdmin ? 'admin' : 'user';
        localStorage.setItem('userRole', userRole);

        // Dispatch login action
        dispatch(login({
          id: decodedToken._id,
          role: decodedToken.isAdmin ? 'admin' : 'user',
          username: response.data.username
        }));

        // Dispatch setIsAuthenticated action
        dispatch(setIsAuthenticated(true));

        // Show success toast
        toast({
          title: 'Success!',
          description: `Logged in successfully as ${response.data.username}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        navigate('/')
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
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <LoginUserForm
      onAddLogin={addLoginHandler}
      isLoading={isLoading} />
  )
}
