import React from 'react'
import { Box, VStack, Grid, HStack, Flex, Text, IconButton, Link, Spacer, useColorModeValue } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';


export default function Footer() {
    const bg = useColorModeValue('light: #F2F2F2', 'dark: #1A202C');
    const color = useColorModeValue('dark: #333333', 'dark: #F2F2F2');
    const primaryColor = ('#2C3E50')
    const accentColor = ('#F39C12')


    return (
        <Box as="footer" bg={bg} color={color} py={6}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6} maxW="6xl" mx="auto" px={{ base: 4, md: 8 }}>
                <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" color={accentColor}>Quick Links</Text>
                    <Link href="/services" color={primaryColor}>Book a Session</Link>
                    <Link href="/gallery" color={primaryColor}>Gallery</Link>
                    <Link href="/about-us" color={primaryColor}>About Us</Link>
                </VStack>
                <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" color={accentColor}>Contact Us</Text>
                    <Text>Email:  africanachildphotography@gmail.com</Text>
                    <Text>Hotline call: 07015307662 </Text>
                </VStack>
                <VStack spacing={2} align="start">
                    <HStack spacing={4}>
                        <Link href="https://www.facebook.com/africanachildphotography?mibextid=ZbWKwL" isExternal>
                            <IconButton
                                icon={<FaFacebook />}
                                aria-label="Facebook"
                                size="lg"
                                variant="ghost"
                                colorScheme="facebook"
                                color={primaryColor}

                            />
                        </Link>
                        <Link href="https://instagram.com/africanachild_photography?igshid=ZDdkNTZiNTM=" isExternal>
                            <IconButton
                                icon={<FaInstagram />}
                                aria-label="Instagram"
                                size="lg"
                                variant="ghost"
                                color={primaryColor}
                            />
                        </Link>
                        <Link href="https://api.whatsapp.com/send?phone=23408187329913" isExternal>
                            <IconButton
                                icon={<FaWhatsapp />}
                                aria-label="Whatsapp"
                                size="lg"
                                variant="ghost"
                                color={primaryColor}
                            />
                        </Link>
                    </HStack>
                </VStack>
            </Grid>
            <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" maxW="6xl" mx="auto" px={{ base: 4, md: 8 }} mt={8}>
                <Text fontSize="sm" mb={{ base: 4, md: 0 }}>
                    © 2023 AfricanaChild Photography. All Rights Reserved.
                </Text>
                <Spacer />
                <Text fontSize="sm" mb={{ base: 4, md: 0 }} color={accentColor}>
                    Developed by Lokosman
                </Text>
            </Flex>
        </Box>
    )
}
