import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';
import {
  Text,
  Button,
  Flex,
  Spinner,
  useToast,
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
  Th,
  Td,
  TableCaption,
  Box,
  Stack,
  useMediaQuery,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function UserRequestList() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userRequestIdToDelete, setUserRequestIdToDelete] = useState(null);
  const toast = useToast();
  const token = localStorage.getItem('token');
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const padding = useBreakpointValue({ base: 1, md: 4 });

  const openDeleteModal = (id) => {
    setUserRequestIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/`);
        if (response.status === 200 || response.status === 201) {
          console.log('Fetched data:', response.data); // Add this line to log the data
          setUserData(response.data.user);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data from server', error);
        setIsLoading(false);
      }
    };
    fetchUsersData();
  }, []);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Spinner />
      </Flex>
    );
  }

  const deleteUsersRequestHandler = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/admin/${id}/`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setUserData(userData.filter(request => request._id !== id));
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
  }

  const renderCards = () => {
    return userData.map((userItem) => (
      <Box
        key={userItem._id}
        borderWidth={1}
        borderRadius="lg"
        padding={4}
        margin={2}
      >

        <Stack>
          <Text>ID: {userItem._id}</Text>
          <Text>Username: {userItem.username}</Text>
          <Text>Email: {userItem.email}</Text>

          <Button
            size={fontSize}
            p={padding}
            colorScheme="blue"
            onClick={() => openDeleteModal(userItem._id)}
          >
            Delete
          </Button>
        </Stack>

      </Box>
    ));
  }

  return (
    <>
      <Box minH="100vh" display="flex" flexDirection="column">
        {isMobile ? (<Box>{renderCards()}</Box>) : (
          <Box overflowX="auto">
            <Table variant="simple" size={fontSize}>
              <TableCaption placement="top">User Data</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Username</Th>
                  <Th>Email</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userData.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Button
                        size={fontSize}
                        p={padding}
                        colorScheme="blue"
                        onClick={() => openDeleteModal(user._id)}
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
            Are you sure you want to delete this users?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => deleteUsersRequestHandler(userRequestIdToDelete)}>
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
