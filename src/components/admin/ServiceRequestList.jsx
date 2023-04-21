import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../config/config';
import {
  Text,
  Button,
  Flex,
  Select,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Spinner,
  Th,
  Td,
  useToast,
  TableCaption,
  Box,
  Stack,
  useMediaQuery,
  useBreakpointValue,

} from '@chakra-ui/react';

export default function ServiceRequestList() {
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceRequestIdToDelete, setServiceRequestIdToDelete] = useState(null);

  const fontSize = useBreakpointValue({ base: 'sm', md: 'sm' });
  const padding = useBreakpointValue({ base: 1, md: 4 });
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const toast = useToast();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/services/`);
        if (response.status === 200 || response.status === 201) {
          console.log('Fetched data:', response.data); // Add this line to log the data
          setServiceData(response.data.serviceRequest);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data from server', error);
        setIsLoading(false);
      }
    };
    fetchServiceData();
  }, []);


  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Spinner />
      </Flex>
    );
  }

  const openDeleteModal = (id) => {
    setServiceRequestIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  //*Deleteing a Particular Service Request.
  const token = localStorage.getItem('token');
  const deleteServiceRequestHandler = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/services/admin/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setServiceData(serviceData.filter(request => request._id !== id));
      closeDeleteModal();
      // Show success toast
      toast({
        title: 'Success!',
        description: 'Service request deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting service request:', error);
      // Show error toast
      toast({
        title: 'Error!',
        description: 'Error deleting service request.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  //*Updating the status for a service request.
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_BASE_URL}/services/admin/${id}`,
        { status },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setServiceData(
        serviceData.map((request) =>
          request._id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error('Error updating service request status:', error);
    }
  };



  const renderCards = () => {
    return serviceData.map((dataItem) => (
      <Box
        key={dataItem._id}
        borderWidth={1}
        borderRadius="lg"
        padding={4}
        margin={2}
      >
        <Stack>
          <Text>Name: {dataItem.name}</Text>
          <Text>Email: {dataItem.email}</Text>
          <Text>Phone: {dataItem.phoneNumber}</Text>
          <Text>Service Type: {dataItem.serviceType}</Text>
          <Text>Date: {dataItem.date}</Text>
          <Text>Time: {dataItem.time}</Text>
          <Text>Address: {dataItem.address}</Text>
          <Text>Message: {dataItem.message}</Text>
          <Text>Status:</Text>
          <select
            value={dataItem.status}
            onChange={(e) => updateStatus(dataItem._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>

          <Button
            size={fontSize}
            p={padding}
            colorScheme="blue"
            onClick={() => openDeleteModal(dataItem._id)}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    ));
  };

  return (
    <>
      <Box minH="100vh" display="flex" flexDirection="column">
        {isMobile ? (<Box>{renderCards()}</Box>) : (
          <Box overflowX="auto">
            <Table variant="simple" size={fontSize}>
              <TableCaption placement="top">Service Data</TableCaption>
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
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {serviceData.map((dataItem) => (
                  <Tr key={dataItem._id}>
                    <Td>{dataItem.name}</Td>
                    <Td>{dataItem.email}</Td>
                    <Td>{dataItem.phoneNumber}</Td>
                    <Td>{dataItem.serviceType}</Td>
                    <Td>{dataItem.date}</Td>
                    <Td>{dataItem.time}</Td>
                    <Td>{dataItem.address}</Td>
                    <Td>{dataItem.message}</Td>
                    <Td>
                      <Select
                        value={dataItem.status}
                        onChange={(e) => updateStatus(dataItem._id, e.target.value)}
                        width="130px"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                      </Select>
                    </Td>
                    <Td>
                      <Button
                        size={fontSize}
                        p={padding}
                        colorScheme="blue"
                        onClick={() => openDeleteModal(dataItem._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Service Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this service request?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => deleteServiceRequestHandler(serviceRequestIdToDelete)}>
              Yes, Delete
            </Button>
            <Button variant="ghost" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}
