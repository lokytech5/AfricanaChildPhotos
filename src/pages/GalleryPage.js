import React, { useState } from 'react'
import { Text, Divider, Button, Flex, Box, useColorMode } from '@chakra-ui/react';
import Footer from '../components/shared/Footer';

import GalleryGird from '../components/gallery/GalleryGird';
import GalleryThumbnails from '../components/gallery/GalleryThumbnails';

export default function GalleryPage() {

    const [selectedFolder, setSelectedFolder] = useState(null);
    const { colorMode, toggleColorMode } = useColorMode();

    const handleFolderClick = (folder) => {
        setSelectedFolder(folder)
    }


    return (
        <Flex direction="column" minHeight="100vh"> {/* Add this line */}
            <Box flexGrow={1}> {/* Add this line */}
                <Text fontSize="4xl" textAlign="center" color={colorMode === "light" ? "blue.600" : "white"}
                    fontFamily="Playfair Display, serif" fontWeight="bold" mb={6}>
                    Image Gallery
                </Text>
                {!selectedFolder && <GalleryThumbnails
                    onFolderClick={handleFolderClick}
                />}

                {selectedFolder && (<>
                    <Button
                        onClick={() => setSelectedFolder(null)}
                        variant="outline"
                        colorScheme="blue"
                        mb={4}
                    >
                        Back to Albums
                    </Button>
                    <GalleryGird folder={selectedFolder} />
                </>)}
            </Box> {/* Add this line */}
            <Divider />
            <Footer />
        </Flex>
    )
}
