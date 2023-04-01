import React from 'react'
import ServiceRequestList from './ServiceRequestList'
import UserRequestList from './UserRequestList';
import {
    Container,
    Box,
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Flex,
    VStack,
    Tab,
    TabPanel,
    useColorModeValue,
} from '@chakra-ui/react';

export default function AdminDashboard() {

    const bgColor = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'gray.200');
    return (

        <Container maxW="container.xl">
            <Box
                my={10}
                bg={bgColor}
                p={8}
                borderRadius="lg"
                boxShadow="xl"
                borderColor="gray.200"
                borderWidth={1}
            >
                <VStack align="start" spacing={8}>
                    <Heading as="h1" size="2xl" color={textColor}>
                        Admin Dashboard
                    </Heading>
                    <Tabs isFitted variant="enclosed" colorScheme="blue">
                        <TabList mb="1em" borderBottom="1px solid" borderColor="blue.200">
                            <Tab _selected={{ color: 'white', bg: 'blue.600' }}>Service Requests</Tab>
                            <Tab _selected={{ color: 'white', bg: 'blue.600' }}>Users</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ServiceRequestList />
                            </TabPanel>
                            <TabPanel>
                                <UserRequestList />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Box>
        </Container>
    );
}
