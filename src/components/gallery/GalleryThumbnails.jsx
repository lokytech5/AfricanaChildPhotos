import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Grid, GridItem, Box, Image, Heading, Spinner
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';


export default function GalleryThumbnails({ onFolderClick }) {

    const [thumbnails, setThumbnails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });




    useEffect(() => {
        const fetchThumbnails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/images');
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
                    <GridItem key={folder} onClick={() => onFolderClick(folder)}>
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
                                height="200px"
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
                                <Heading as="h3" size="md" isTruncated textAlign="center">
                                    {folder}
                                </Heading>
                            </Box>
                        </Box>
                    </GridItem>
                ))}
            </Grid>)}


        </>
    )
}
