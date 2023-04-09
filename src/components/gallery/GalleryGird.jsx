import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Footer from '../shared/Footer';
import {
    Grid, GridItem, Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    Text,
    ModalCloseButton, Box, Image, useBreakpointValue, Spinner
} from '@chakra-ui/react';


export default function GalleryGird({ folder }) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleImageClick = (src, alt) => {
        setSelectedImage({ src, alt });
        onOpen();
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/images/${folder}`)
                setImages(response.data.imageUrls)
                setIsLoading(false)
                console.log(setImages(response.data.imageUrls));
            } catch (error) {
                console.error('Error fetching images', error);
            }
        };

        fetchImages();

    }, [folder]);


    return (
        <>
            <Text fontSize="2xl" textAlign="center" fontWeight="bold" mb={4}>
                {folder} Images
            </Text>
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
                {images.map((image, index) => (
                    <GridItem key={index} onClick={() => handleImageClick(image)}>
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
                                src={image}
                                alt={folder}
                                objectFit="cover"
                                width="100%"
                                height="200px"
                                transition="transform 0.3s"
                                _hover={{
                                    transform: 'scale(1.1)',
                                }}
                            />
                        </Box>
                    </GridItem>
                ))}
            </Grid>)}
            {selectedImage && (
                <Modal isOpen={isOpen} onClose={onClose} size="xl">
                    < ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <Image src={selectedImage.src} alt={selectedImage.alt} maxW="100%" maxH="80vh" />
                    </ModalContent>

                </Modal>
            )}
        </>
    )
}
