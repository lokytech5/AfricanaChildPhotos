import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import BookingCTA from './BookingCTA';
import PortfolioGallery from './PortfolioGallery';
import Testimonials from './Testimonials';
import Footer from '../shared/Footer'
import { motion } from "framer-motion";

import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    VStack,
    HStack,
    useBreakpointValue,
    useColorMode,
} from "@chakra-ui/react";

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
};

export default function Home() {
    //*Final build
    const color = {
        dark: '#333333',
        darkColor: '#F2F2F2',
    }
    const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
    const { colorMode } = useColorMode();
    return (


        <>
            <Box>

                <Box position="relative" minHeight={{ base: "50vh", md: "100vh" }} width="100%">

                    <motion.div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1rem",
                            flexWrap: useBreakpointValue({ base: "wrap", md: "nowrap" }),
                        }}
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                    >
                        <Image
                            src={require('../../assets/images/img0.jpg')}
                            alt="Photography"
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            position="absolute"
                            zIndex="-1"
                            opacity="0.5"
                        />
                        <Flex
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                            padding={{ base: "2rem", md: "4rem" }}
                            flexDirection="column"
                        >
                            <VStack spacing={8} alignItems="center" textAlign="center" mt={10}>
                                <Heading as="h1"
                                    size="3xl"
                                    color={colorMode === "light" ? "blue.600" : "white"}
                                    fontFamily="Playfair Display, serif" >
                                    Capture Your Moments with AfricanaChild
                                </Heading>
                                <Text fontSize={{ base: "md", md: "lg" }}
                                    fontFamily="Lato, sans-serif"
                                    color={color}>
                                    Discover the art of photography and find the perfect moments that capture your life's story.
                                </Text>
                                <HStack spacing={4}>
                                    <Link as={RouterLink} to='/gallery'>
                                        <Button size={buttonSize} variant="outline" colorScheme="blue">
                                            Explore
                                        </Button>
                                    </Link>
                                </HStack>
                            </VStack>
                        </Flex>
                    </motion.div>
                </Box>
                <motion.div variants={fadeIn} initial="initial" animate="animate">
                    <Box textAlign="center" py={2} mt={4}>
                        <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold"
                            fontFamily="Playfair Display, serif"
                            color={colorMode === "light" ? "blue.600" : "white"}>
                            Our Featured Works
                        </Text>
                    </Box>
                    <PortfolioGallery />
                </motion.div>
                <motion.div variants={fadeIn} initial="initial" animate="animate">
                    <Testimonials />
                </motion.div>
                <motion.div variants={fadeIn} initial="initial" animate="animate">
                    <BookingCTA />
                </motion.div>
                <Footer />
            </Box>

        </>
    )
}
