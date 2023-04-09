import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Box, VStack, Heading, Link, Text, Button } from "@chakra-ui/react";
export default function BookingCTA() {
    return (
        <Box padding="2rem" background="white">
            <VStack spacing={8} alignItems="center">
                <Heading as="h2" size="2xl" color="blue.700">
                    Ready to Capture Your Story?
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                    Book a session with our photographer today and let us help you create lasting memories.
                </Text>

                <Link as={RouterLink} to='/service'>
                    <Button colorScheme="blue">Book a Session</Button>
                </Link>
            </VStack>
        </Box>
    )
}