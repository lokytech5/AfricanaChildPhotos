import React from 'react'
import { Box, VStack, SimpleGrid, Flex, Heading, Text, Avatar, HStack } from "@chakra-ui/react";

const testimonials = [
    {
        name: 'John Doe',
        role: 'Wedding Client',
        avatarUrl: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
        testimonial:
            'The photos are absolutely amazing! We are extremely happy with the results and would highly recommend this photography service.',
    },
    {
        name: 'Jane Smith',
        role: 'Event Client',
        avatarUrl: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg',
        testimonial:
            'The photographer was professional, friendly, and captured some fantastic moments during our event. Highly recommended!',
    },
    {
        name: 'Emma Brown',
        role: 'Portrait Client',
        avatarUrl: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
        testimonial:
            'The photographer made me feel comfortable during the session, and the results were stunning. I will definitely use their services again.',
    },
    // ... add more testimonials
];

export default function Testimonials() {
    const bg = {
        light: '#F2F2F2',
        dark: '#1A202C',
    }

    const color = {
        dark: '#333333',
        dark: '#F2F2F2',
    }
    return (
        <Box as="section" bg={bg} color={color} py={12} position="relative">
            <Box
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                opacity={0.05}
                bgImage="url('https://source.unsplash.com/random')"
                bgSize="cover"
                bgPosition="center"
                zIndex={-1}
            />
            <VStack align="center" spacing={4} mb={10}>
                <Text fontSize="3xl" fontWeight="bold" color='#2C3E50'>
                    Testimonials
                </Text>
                <Text fontSize="lg" textAlign="center" maxW="2xl">
                    Here's what our clients have to say about our photography services.
                </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} maxW="6xl" mx="auto" px={{ base: 4, md: 8 }}>
                {testimonials.map((testimonial, index) => (
                    <Flex key={index} direction="column" alignItems="center" boxShadow="lg" borderRadius="lg" p={6}
                        bg={('light: #F2F2F2', 'dark: #1A202C')}
                        color={('light: #333333', 'dark: #F2F2F2')}
                    >

                        <Text fontSize="md" textAlign="center" fontStyle="italic" mb={6}>
                            {testimonial.testimonial}
                        </Text>
                        <Avatar src={testimonial.avatarUrl} alt={testimonial.name} mb={4} />
                        <Text fontSize="lg" fontWeight="bold" mb={1}>
                            {testimonial.name}
                        </Text>
                        <Text fontSize="sm" fontStyle="italic" mb={4}>
                            {testimonial.role}
                        </Text>
                    </Flex>
                ))}
            </SimpleGrid>
        </Box>
    )
}
