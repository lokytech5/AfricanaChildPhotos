import React from 'react'
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
} from "@chakra-ui/react";

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
};

export default function Home() {
    const color = {
        dark: '#333333',
        dark: '#F2F2F2',
    }
    const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
    return (


        <>
            <Box>

                <Box position="relative" minHeight={{ base: "50vh", md: "100vh" }} width="100%">

                    <motion.Flex
                        alignItems="center"
                        justifyContent="space-between"
                        padding="1rem"
                        flexWrap={{ base: "wrap", md: "nowrap" }}
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
                            <VStack spacing={8} alignItems="center" textAlign="center">
                                <Heading as="h1" size="3xl" color="blue.700">
                                    Capture Your Moments with AfricanaChild
                                </Heading>
                                <Text fontSize={{ base: "md", md: "lg" }} color={color}>
                                    Discover the art of photography and find the perfect moments that capture your life's story. Join our
                                    community and explore the world through your lens.
                                </Text>
                                <HStack spacing={4}>
                                    <Button size={buttonSize} variant="outline" colorScheme="blue">
                                        Explore
                                    </Button>
                                </HStack>
                            </VStack>
                        </Flex>
                    </motion.Flex>
                </Box>
                <motion.div variants={fadeIn} initial="initial" animate="animate">
                    <Box textAlign="center" py={8}>
                        <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" color="blue.700">
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
