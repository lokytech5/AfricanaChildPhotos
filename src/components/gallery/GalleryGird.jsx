import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Masonry from 'react-masonry-css';
import { API_BASE_URL } from '../../config/config';
import {
    Grid, GridItem, Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    Text,
    ModalCloseButton, Box, Image, useBreakpointValue, Spinner, useColorMode
} from '@chakra-ui/react';
import './GalleryGird.css';


export default function GalleryGird({ folder }) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });
    const { colorMode, toggleColorMode } = useColorMode();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = React.useState(null);

    const breakpointColumnsObj = {
        default: 4,
        1200: 3,
        992: 2,
        768: 1,
    };

    const handleImageClick = (src, alt) => {
        setSelectedImage({ src, alt });
        onOpen();
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/images/${folder}`)
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
            <Text fontSize="2xl" color={colorMode === "light" ? "blue.600" : "white"}
                fontFamily="Playfair Display, serif" textAlign="center" fontWeight="bold" mb={4}>
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
            ) : (<Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                style={{
                    padding: '10px',
                    display: 'flex',
                    width: '100%',
                }}
            >
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
                                minH="200px"
                                transition="transform 0.3s"
                                _hover={{
                                    transform: 'scale(1.1)',
                                }}
                            />
                        </Box>
                    </GridItem>
                ))}
            </Masonry>)}
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
