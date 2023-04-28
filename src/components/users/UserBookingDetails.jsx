import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { API_BASE_URL } from '../../config/config';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useBreakpointValue,
  Button,
  useToast,
  Heading,
  Text,
  Table,
  Tbody,
  Thead,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Grid,
  FormErrorMessage,
  useMediaQuery,
  Tr,
  Td,
  Th,
  Select,
} from "@chakra-ui/react";

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


export default function UserBookingDetails() {
  //*UserBooking, Delete and Update state from the server
  const [userBooking, setUserBooking] = useState([]);
  const [userRequestIdToDelete, setUserRequestIdToDelete] = useState(null);
  const [bookingToUpdate, setBookingToUpdate] = useState(null);
  const [updatedBooking, setUpdatedBooking] = useState(null);

  //*Loading State 
  const [isLoading, setIsLoading] = useState(true);

  //*Modal State for delete and update
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  //*Getting Token from localStorage and Getting userId from Redux store
  const token = localStorage.getItem('token');
  const reduxUserId = useSelector((state) => state.user.id);
  const userId = reduxUserId || localStorage.getItem("userId");

  //*Getting the current id from redux and setting it to localStorage
  if (reduxUserId) {
    localStorage.setItem("userId", reduxUserId);
  }
  console.log("userId:", userId); // Debugging line

  //*Toast from chakraUI
  const toast = useToast()

  const fontSize = useBreakpointValue({ base: 'sm', md: 'sm' });
  const padding = useBreakpointValue({ base: 1, md: 4 });
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  //*Initializing useForm here
  const { register,
    handleSubmit,
    formState: { errors }, } = useForm({
      resolver: zodResolver(formValidationSchema),
      defaultValues: updatedBooking,
    });

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  //*Function for opening update Modal state.
  const openUpdateModal = (booking) => {
    setBookingToUpdate(booking);
    setUpdatedBooking({ ...booking });
    setIsUpdateModalOpen(true);
  };
  //*function for Closing Update Modal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };


  //*Function for Openning Modal when delete button is click on table
  const openDeleteModal = (id) => {
    setUserRequestIdToDelete(id);
    setIsDeleteModalOpen(true);

  };
  //*Function for closing modal when delete button is click on table
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


  //*Fetching UserBooking by userId
  useEffect(() => {
    const fetchUserBookingData = async (userId) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/booking/${userId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        if (response.status === 200 || response.status === 201) {
          console.log('Fetched data:', response.data);
          setUserBooking(response.data);
        }

      } catch (error) {
        console.error('Error fetching data from server', error);
      }

    };
    if (userId) {
      fetchUserBookingData(userId);
      setIsLoading(false);
    }
  }, [userId, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //*Updating / Modfiying Userbooking by id.
  const updateBookingHandler = handleSubmit(async (formData) => {
    try {

      const response = await axios.put(`${API_BASE_URL}/users/booking/${bookingToUpdate._id}`, updatedBooking, {
        headers: {
          'x-auth-token': token,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setUserBooking(
          userBooking.map((booking) =>
            booking._id === bookingToUpdate._id ? updatedBooking : booking
          )
        );
        closeUpdateModal();

        toast({
          title: 'Success!',
          description: 'Booking updated successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: 'Error!',
        description: 'Error updating booking.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });



  //*delete Userbooking by id
  const deleteUserBookingDataHandler = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/booking/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      setUserBooking(userBooking.filter(request => request._id !== id));
      closeDeleteModal();
      // Show success toast
      toast({
        title: 'Success!',
        description: 'Booking deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Error deleting service request:', error);
      // Show error toast
      toast({
        title: 'Error!',
        description: 'Error deleting Booking.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const renderCards = () => {

    if (userBooking.length === 0) {
      return (
        <Text fontSize="xl" textAlign="center">
          No bookings have been made yet.
        </Text>
      );
    }
    return userBooking.map((bookingItem) => (
      <Box
        key={bookingItem._id}
        borderWidth={2}
        borderRadius="lg"
        padding={6}
        margin={2}
      >

        <Stack>
          <Text>Name: {bookingItem.name}</Text>
          <Text>Email: {bookingItem.email}</Text>
          <Text>Phone: {bookingItem.phoneNumber}</Text>
          <Text>Service Type: {bookingItem.serviceType}</Text>
          <Text>Date: {bookingItem.date}</Text>
          <Text>Time: {bookingItem.time}</Text>
          <Text>Address: {bookingItem.address}</Text>

          <Text>Status: {bookingItem.status}</Text>

          <Button
            size={fontSize}
            p={padding}
            colorScheme="blue"
            onClick={() => openUpdateModal(bookingItem)}>
            Update
          </Button>


          <Button
            size={fontSize}
            p={padding}
            colorScheme="red"
            onClick={() => openDeleteModal(bookingItem._id)}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    ));
  };

  return (
    <>
      <Box mb={6}>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Booking
        </Heading>
      </Box>

      <Box>
        {isLoading ? (
          <Box textAlign="center">
            <CircularProgress isIndeterminate color="blue.300" />
          </Box>
        ) : isMobile ? (<Box> {renderCards()}</Box>) : (
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Service Type</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Address</Th>
                <Th>Message</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userBooking && userBooking.length === 0 ? (
                <Tr>
                  {/* Condition rendering if no booking have been made */}
                  <Td colSpan="10">
                    <Text fontSize="xl" textAlign="center">
                      No bookings have been made yet.
                    </Text>
                  </Td>
                </Tr>
              ) : (
                userBooking.map((bookingItem) => (
                  <Tr key={bookingItem._id}
                    _hover={{ bg: 'blue.600', cursor: 'pointer' }}>
                    <Td>{bookingItem.name}</Td>
                    <Td>{bookingItem.email}</Td>
                    <Td>{bookingItem.phoneNumber}</Td>
                    <Td>{bookingItem.serviceType}</Td>
                    <Td>{bookingItem.date}</Td>
                    <Td>{bookingItem.time}</Td>
                    <Td>{bookingItem.address}</Td>
                    <Td>{bookingItem.message}</Td>
                    <Td> {bookingItem.status}</Td>
                    <Td>
                      <Box display="block" textAlign="center">
                        <Button
                          size="sm"
                          colorScheme="blue"
                          mb={2}
                          onClick={() => openUpdateModal(bookingItem)}
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => openDeleteModal(bookingItem._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* Delete modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Service Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this users?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => deleteUserBookingDataHandler(userRequestIdToDelete)}>
              Yes, Delete
            </Button>
            <Button variant="ghost" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* Update modal */}
      <Modal isOpen={isUpdateModalOpen} onClose={closeUpdateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {bookingToUpdate && (
              <form onSubmit={updateBookingHandler}>
                <Stack spacing={4}>
                  <FormControl id="name" isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      {...register('name')}
                      type="text"
                      placeholder={updatedBooking.name}
                      onChange={(e) =>
                        setUpdatedBooking({ ...updatedBooking, name: e.target.value })
                      }
                    />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl id="email" isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder={updatedBooking.email}
                      onChange={(e) =>
                        setUpdatedBooking({ ...updatedBooking, email: e.target.value })
                      }
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>

                  {/* Phone NUmber */}
                  <FormControl id="phoneNumber" isInvalid={errors.phoneNumber}>
                    <FormLabel>PhoneNumber</FormLabel>
                    <Input
                      {...register('phoneNumber')}
                      type="text"
                      placeholder={updatedBooking.phoneNumber}
                      onChange={(e) =>
                        setUpdatedBooking({ ...updatedBooking, phoneNumber: e.target.value })
                      }
                    />
                    <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
                  </FormControl>

                  {/* ServiceType */}
                  <FormControl id="serviceType" isInvalid={errors.serviceType}>
                    <FormLabel>Service Type</FormLabel>
                    <Select placeholder="Select service type"
                      {...register('serviceType')}
                      onChange={(e) =>
                        setUpdatedBooking({ ...updatedBooking, serviceType: e.target.value })
                      }
                    >
                      <option value={updatedBooking.serviceType}>Portrait</option>
                      <option value={updatedBooking.serviceType}>Event</option>
                      <option value={updatedBooking.serviceType}>Wedding</option>
                    </Select>
                    <FormErrorMessage>{errors.serviceType?.message}</FormErrorMessage>
                  </FormControl>

                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    {/* Date */}
                    <FormControl id="date" isInvalid={errors.date}>
                      <FormLabel>Date</FormLabel>
                      <Input
                        {...register('date')}
                        type="date"

                        placeholder={updatedBooking.date}
                        min={getTodayDate()}
                        onChange={(e) =>
                          setUpdatedBooking({ ...updatedBooking, date: e.target.value })
                        }
                      />
                      <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
                    </FormControl>

                    {/* Time */}
                    <FormControl id="time" isInvalid={errors.time}>
                      <FormLabel>Time</FormLabel>
                      <Input
                        {...register('time')}
                        type="time"
                        min="06:00"
                        max="18:00"

                        placeholder={updatedBooking.time}
                        onChange={(e) =>
                          setUpdatedBooking({ ...updatedBooking, time: e.target.value })
                        }
                      />
                      <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
                    </FormControl>
                  </Grid>

                  {/* Address */}
                  <FormControl id="address" isInvalid={errors.address}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      {...register('address')}
                      type="text"
                      placeholder={updatedBooking.address}
                      onChange={(e) =>
                        setUpdatedBooking({ ...updatedBooking, address: e.target.value })
                      }
                    />
                    <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
                  </FormControl>

                </Stack>
                <ModalFooter>
                  <Button
                    colorScheme="blue" mr={3} onClick={updateBookingHandler}>
                    Update
                  </Button>
                  <Button variant="ghost" onClick={closeUpdateModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>


    </>
  )
}
