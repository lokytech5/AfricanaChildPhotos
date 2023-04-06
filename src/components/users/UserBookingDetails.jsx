import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
  Text,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";


export default function UserBookingDetails() {
  const [userBooking, setUserBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const reduxUserId = useSelector((state) => state.user.id);
  const userId = reduxUserId || localStorage.getItem("userId");

  console.log("userId:", userId); // Debugging line

  if (reduxUserId) {
    localStorage.setItem("userId", reduxUserId);
  }

  useEffect(() => {
    const fetchUserBookingData = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/booking/${userId}`, {
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

  return (
    <Box>
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
          {userBooking &&
            userBooking.map((bookingItem) => (
              <Tr key={bookingItem._id}>
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
                  {/* Status and other elements can be added here */}
                </Td>
                <Td>
                  <Box display="flex" justifyContent="center">
                    <Button size="sm" colorScheme="red">
                      Delete Booking
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  )
}
