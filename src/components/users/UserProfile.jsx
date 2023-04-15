import React from 'react';
import UserBookingDetails from './UserBookingDetails';
import ProfileManagement from './ProfileManagement';
import Footer from '../shared/Footer';
import {
    Heading,
    Container,
    Tab,
    Tabs,
    TabPanel,
    TabPanels,
    TabList,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";

export default function UserProfile() {

    const bg = useColorModeValue("gray.100", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <>
            <Container maxW="container.xl" py={10} px={{ base: 4, md: 6 }}>
                <VStack spacing={8} align="stretch">
                    <Heading as="h1" fontSize="3xl">
                        User Profile
                    </Heading>
                    <Tabs variant="enclosed" colorScheme="blue">
                        <TabList mb="1em">
                            <Tab>Booking Details</Tab>
                            <Tab>Profile Management</Tab>
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
                                    <UserBookingDetails />
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
                                    <ProfileManagement />
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Container>
            <Footer />
        </>
    );
};

