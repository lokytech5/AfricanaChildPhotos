import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ServiceBooking from '../components/booking/ServiceBooking'

import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react';
export default function ServiceBookingPage() {

  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [hasBooking, setHasBooking] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/profile');
  }


  const addServiceBookingHandler = async (serviceData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/services', serviceData, {
        headers: {
          'x-auth-token': token,
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Booking Successfully:', response.data);
        setFormData(serviceData);
        setIsModalOpen(true);
        setHasBooking(true);
      } else {
        console.error('Error while sending form data to the backend:', response.status, response.statusText);
        // Handle error, e.g., show an error message
        toast({
          title: 'Error!',
          description: 'Error while sending form data to the backend.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error while sending form data to the backend:', error);
      // Handle error, e.g., show an error message
      toast({
        title: 'Error!',
        description: 'Error while sending form data to the backend.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <>
      <ServiceBooking
        onAddService={addServiceBookingHandler} />

      {formData && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Booking Confirmed</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
                Thank you, {formData.name}! Your service booking has been successfully
                confirmed. We will send a confirmation email to {formData.email} with the
                details of your booking.
              </p>
              <p>
                If you have any questions or need to make changes to your booking, please
                contact our customer support.
              </p>
              {/* Display the submitted data here */}
              <ul>
                {Object.entries(formData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key[0].toUpperCase() + key.slice(1)}:</strong> {value}
                  </li>
                ))}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
