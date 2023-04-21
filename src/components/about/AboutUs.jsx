import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Link,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa';

export default function AboutUs() {

  return (
    <Container maxW="container.xl">
      <VStack spacing={10} my={10}>
        <Box textAlign="center">
          <Image
            src={require('../../assets/images/photoG1.jpg')}
            alt="Your Image"
            borderRadius="full"
            objectFit="cover"
            boxSize="250px"
            mx="auto"
            mb={4}
          />
          <Heading as="h1" size="2xl">
            Adekunle Adeola
          </Heading>
          <Text fontSize="xl">
            Professional Photographer
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="xl" textAlign="center" mb={4}>
            About Me
          </Heading>
          <Text fontSize="lg" textAlign="center">
            I am a professional photographer with over 10 years of experience in various fields such as portrait, wedding, and event photography. My passion for photography started at a young age, and since then, I've been committed to capturing the beauty of the world around me. My goal is to create stunning visual memories that my clients can cherish for a lifetime.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="xl" textAlign="center" mb={4}>
            Photography Services
          </Heading>
          <Text fontSize="lg" textAlign="center">
            I offer a range of photography services including portrait, wedding, event, and product photography. My versatile skills and expertise allow me to adapt my style to meet the unique needs of each client, ensuring that their vision is brought to life through stunning images.
          </Text>
        </Box>

        <Heading as="h2" size="xl" marginTop={8}>
          My Equipment
        </Heading>
        <Text maxW="2xl" textAlign="center">
          I use top-quality equipment to ensure the best results for my clients. My current setup includes a Canon EOS R5, various lenses (24-70mm f/2.8, 50mm f/1.2, 70-200mm f/2.8), and professional lighting gear.
        </Text>

        <Heading as="h2" size="xl" marginTop={8}>
          My Photography Style
        </Heading>
        <Text maxW="2xl" textAlign="center">
          I am known for my vibrant, timeless, and emotive photography style. My goal is to create a visual narrative that tells your unique story. I am constantly inspired by the people and moments I capture, and I strive to make every image a work of art.
        </Text>

        <Box marginTop={8}>
          <Button colorScheme="blue" size="lg" marginRight={4}>
            Book Now
          </Button>
          <Button colorScheme="blue" variant="outline" size="lg">
            Schedule a Session
          </Button>
        </Box>

        <HStack spacing={4} marginTop={8}>
          <Link href="https://www.instagram.com/yourusername" isExternal>
            <Icon as={FaInstagram} boxSize={8} />
          </Link>
          <Link href="https://www.facebook.com/yourusername" isExternal>
            <Icon as={FaFacebook} boxSize={8} />
          </Link>
          <Link href="https://www.pinterest.com/yourusername" isExternal>
            <Icon as={FaPinterest} boxSize={8} />
          </Link>
        </HStack>

        <VStack mt={10} alignItems="center" spacing={5}>
          <Heading as="h2" size="lg">
            Get in Touch
          </Heading>
          <Text textAlign="center" maxW="600px">
            For inquiries or to book a session, please contact us using the information
            below or visit our contact page.
          </Text>
          <HStack spacing={6}>
            <Text>Email: info@example.com</Text>
            <Text>Phone: (555) 123-4567</Text>
          </HStack>
          <HStack spacing={4}>
            {/* Add social media icons with links here */}
          </HStack>
        </VStack>
      </VStack>
    </Container>
  );
};