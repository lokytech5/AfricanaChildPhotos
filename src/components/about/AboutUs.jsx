import React from 'react'
import Footer from '../shared/Footer';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  Grid,
  GridItem,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';

export default function AboutUs() {
  const textColor = useColorModeValue('text.light.medium', 'text.dark.medium');
  const bgColor = useColorModeValue('white', 'gray.700');
  return (
    <>

      <Box maxW="7xl" mx="auto" py={12} px={{ base: '4', md: '8' }} bg={bgColor} borderRadius="lg" boxShadow="lg">
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'center', md: 'flex-start' }}
          justifyContent="space-between"
        >
          <VStack spacing={4} maxW={{ md: '50%' }}>
            <Heading as="h2" size="3xl">
              About Me
            </Heading>
            <Text color={textColor} fontSize="lg">
              Hello! I'm John Doe, a professional photographer with over 10 years of experience in the field. I specialize in portrait, landscape, and event photography. My passion for capturing moments and telling stories through my lens has led me to work with a wide range of clients, from individuals to large corporations.
            </Text>
            <Spacer />
            <Text color={textColor} fontSize="lg">
              I believe that every photograph has the power to evoke emotions and preserve memories. My goal as a photographer is to capture the essence of each moment, creating timeless images that my clients will cherish for a lifetime.
            </Text>
            <Spacer />
            <Text color={textColor} fontSize="lg">
              When I'm not behind the camera, I enjoy traveling, exploring new cultures, and sharing my photography tips and experiences on my blog. Feel free to browse through my portfolio and get in touch if you're interested in working together.
            </Text>
          </VStack>
          <Image
            src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg"
            alt="John Doe"
            borderRadius="full"
            objectFit="cover"
            boxSize={{ base: '250px', md: '350px' }}
            ml={{ md: 12 }}
            mb={{ base: 8, md: 0 }}
          />
        </Flex>
      </Box>
      <Footer />
    </>

  )
}
