import React, { useEffect, useState } from 'react'
import UserBookingDetails from './UserBookingDetails';
import ProfileManagement from './ProfileManagement';

import {
    Box,
    Flex,
    Heading,
    Container,
    Spacer,
    Tab,
    Tabs,
    TabPanel,
    TabPanels,
    TabList,
    useColorModeValue,
    VStack,
    HStack,
    Divider,
} from "@chakra-ui/react";

export default function UserProfile() {

    const bg = useColorModeValue("gray.100", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <>
            <Container maxW="container.xl" py={10}>
                <VStack spacing={8} align="stretch">
                    <Heading as="h1" fontSize="3xl">
                        User Profile
                    </Heading>
                    <Tabs variant="enclosed" colorScheme="blue">
                        <TabList mb="1em">
                            <Tab>Profile Management</Tab>
                            <Tab>User Booking Details</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack
                                    bg={bg}
                                    p={6}
                                    borderRadius="lg"
                                    borderWidth={1}
                                    borderColor={borderColor}
                                    boxShadow="md"
                                    spacing={10}
                                >
                                    <ProfileManagement />
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack
                                    bg={bg}
                                    p={6}
                                    borderRadius="lg"
                                    borderWidth={1}
                                    borderColor={borderColor}
                                    boxShadow="md"
                                    spacing={10}
                                >
                                    <UserBookingDetails />
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Container>

        </>
    );
};

