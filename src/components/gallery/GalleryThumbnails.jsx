import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { API_BASE_URL } from '../../config/config';
import {
    Grid, GridItem, Box, Flex, Image, Text, Button, Heading, Spinner, useColorMode
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';


export default function GalleryThumbnails({ onFolderClick }) {

    const [thumbnails, setThumbnails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const { colorMode } = useColorMode();

    const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 });
    const imageHeight = useBreakpointValue({ base: "300px", sm: "400px", md: "500px" });



    useEffect(() => {
        const checkConnectivity = () => {
            if (!window.navigator.onLine) {
                setIsOffline(true);
                return false;
            }
            setIsOffline(false);
            return true;
        };

        const fetchThumbnails = async () => {
            if (!checkConnectivity()) {
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/images`);
                setThumbnails(response.data.thumbnails);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching thumbnails', error);
            }
        };

        fetchThumbnails();
    }, []);


    return (
        <>

            {isOffline && (
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    py={8}
                >
                    <Heading as="h4" size="md" color={colorMode === 'light' ? 'blue.600' : 'white'}>
                        No internet connection. Please check your connectivity and try again.
                    </Heading>
                </Box>
            )}

            {isLoading ? (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                />
            ) : (<Grid templateColumns={`repeat(${columns}, 1fr)`} gap={10} padding={10}>
                {Object.keys(thumbnails).map((folder) => (
                    <GridItem key={folder}>
                        <Box
                            as="figure"
                            pos="relative"
                            overflow="hidden"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="gray.200"
                            cursor="pointer"
                            transition="all 0.3s ease"
                            _hover={{
                                boxShadow: '2xl',
                            }}
                        >

                            <Image
                                src={thumbnails[folder]}
                                alt={folder}
                                objectFit="cover"
                                width="100%"
                                height={imageHeight}
                                transition="transform 0.3s"
                                _hover={{
                                    transform: 'scale(1.1)',
                                }}
                            />

                            <Box
                                p={3}
                                pos="absolute"
                                bottom={0}
                                left={0}
                                right={0}
                                bgColor="rgba (0, 0, 0, 0.5)"
                                opacity={0}
                                color="white"
                                transition="opacity 0.3s"
                                _hover={{
                                    opacity: 1,
                                }}
                            >

                            </Box>

                            {/* Added Text and Button components */}
                            <Flex p={3} direction="column" alignItems="center" justifyContent="center">
                                <Text mb={3} fontFamily="Lato, sans-serif">
                                    {folder}
                                </Text>
                                <Button
                                    fontFamily="Lato, sans-serif"
                                    colorScheme="blue" onClick={() => onFolderClick(folder)}>
                                    View More
                                </Button>
                            </Flex>
                            {/* End of added components */}

                        </Box>
                    </GridItem>
                ))}
            </Grid>)}


        </>
    )
}
