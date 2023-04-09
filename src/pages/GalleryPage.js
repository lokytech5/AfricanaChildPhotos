import React, { useState } from 'react'
import { Text, Divider, Button } from '@chakra-ui/react';
import Footer from '../components/shared/Footer';

import GalleryGird from '../components/gallery/GalleryGird';
import GalleryThumbnails from '../components/gallery/GalleryThumbnails';

export default function GalleryPage() {

    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleFolderClick = (folder) => {
        setSelectedFolder(folder)
    }


    return (
        <>
            <Text fontSize="4xl" textAlign="center" fontWeight="bold" mb={6}>
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

            <Divider />
            <div>
                <Footer />
            </div>
        </>
    )
}
