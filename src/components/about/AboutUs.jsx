import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import Footer from '../shared/Footer'

export default function AboutUs() {

  return (
    <>


      <Container maxW="container.xl">
        <VStack spacing={10} my={10}>
          <Box textAlign="center">
            <Image
              src={require('../../assets/images/photoG1.jpg')}
              alt="Your Image"
              borderRadius="full"
              objectFit="cover"
              boxSize="300px"
              mx="auto"
              mb={4}
            />
            <Heading as="h1" size="2xl" fontFamily="Playfair Display, serif">
              Adekunle Adeola
            </Heading>
            <Text fontSize="xl" fontFamily="Lato, sans-serif">
              Professional Photographer
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" textAlign="center" mb={4} fontFamily="Playfair Display, serif">
              About Me
            </Heading>
            <Text fontSize="lg" textAlign="center" fontFamily="Lato, sans-serif">
              I am a professional photographer with decade years of experience specialize in various fields such
              as portrait, wedding, corporate, family portraits and event photography.
              My passion for photography started at a
              young age, and since then, I've been
              committed ensuring that cherished memories and moments are capture. My goal is to create
              stunning visual memories that my clients can cherish for a lifetime.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" textAlign="center" mb={4} fontFamily="Playfair Display, serif">
              Photography Services
            </Heading>
            <Text fontSize="lg" textAlign="center" fontFamily="Lato, sans-serif">
              I offer a range of photography services
              including portrait, wedding, event, studio
              and product photography. My versatile
              skills and expertise allow me to adapt my
              style to meet the unique needs of each client,
              ensuring that their vision is brought to life through stunning images.
            </Text>
          </Box>

          <Heading as="h2" size="xl" marginTop={8} fontFamily="Playfair Display, serif">
            My Equipment
          </Heading>
          <Text maxW="2xl" textAlign="center" fontFamily="Lato, sans-serif">

            I use top-quality equipment to ensure
            the best results for my clients. My
            current setup includes Nikon D850, Sony a7ii, Nikon D800, Godox AD600,
            Godox V1 Flash, Godox 300 strobes,HP Elitebook Folio 1040 G3
            various lenses (24-70mm f/2.8, 50mm f/1.2, 70-200mm f/2.8),
            and professional lighting gear.
          </Text>

          <Heading as="h2" size="xl" textAlign="center" marginTop={8} fontFamily="Playfair Display, serif">
            My Photography Style
          </Heading>
          <Text maxW="2xl" textAlign="center" fontFamily="Lato, sans-serif">
            I am known for my vibrant, timeless,
            and emotive photography style. my approach to photography involves
            capturing the essence of your unique moments, allowing
            us to create a lasting portrayal of your precious memories.
            The narratives that truly matter consist of genuine people,
            authentic stories, and heartfelt moments, I strive to make every image a work of art.
          </Text>

          <Box marginTop={8}>
            <Link as={RouterLink} to='/service'>
              <Button colorScheme="blue" size="lg" marginRight={4}>
                Book Now
              </Button>
            </Link>
          </Box>

          <HStack spacing={4} marginTop={8}>
            <Link href="https://instagram.com/africanachild_photography?igshid=ZDdkNTZiNTM=" isExternal>
              <Icon as={FaInstagram} boxSize={8} />
            </Link>
            <Link href="https://www.facebook.com/africanachildphotography?mibextid=ZbWKwL" isExternal>
              <Icon as={FaFacebook} boxSize={8} />
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=23408187329913" isExternal>
              <Icon as={FaWhatsapp} boxSize={8} />
            </Link>
            <Link href="https://www.linkedin.com/in/africanachild-photography-916b1b137/?originalSubdomain=ng" isExternal>
              <Icon as={FaLinkedin} boxSize={8} />
            </Link>
          </HStack>

          <VStack mt={10} alignItems="center" spacing={5}>
            <Heading as="h2" size="lg" fontFamily="Playfair Display, serif">
              Get in Touch
            </Heading>
            <Text textAlign="center" maxW="600px" fontFamily="Lato, sans-serif">
              For inquiries or to book a session,
              please contact us using the information
              below or visit our booking page.
            </Text>
          </VStack>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};