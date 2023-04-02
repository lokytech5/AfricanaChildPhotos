import React from 'react'


import {
  Text,
  Button,
  Flex,
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
  Th,
  Td,
  TableCaption,
  Box,
  Stack,
  useMediaQuery,
  useBreakpointValue,

} from '@chakra-ui/react';

export default function ServiceRequestList({ serviceData = [], isLoading }) {
  console.log('Service data in ServiceRequestList:', serviceData);
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const padding = useBreakpointValue({ base: 1, md: 4 });
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  if (serviceData.isLoading) {
    return (
      <h1>
        Loading ....
        {console.log(serviceData.isLoading)}
      </h1>

    )
  }

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
          <Text>Status: {dataItem.status}</Text>
          <Button
            size={fontSize}
            p={padding}
            colorScheme="blue"
          >
            Delete
          </Button>
        </Stack>
      </Box>
    ));
  };

  return (
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
                  <Td>{dataItem.status}</Td>
                  <Td>
                    <Button
                      size={fontSize}
                      p={padding}
                      colorScheme="blue"
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

  )
}
