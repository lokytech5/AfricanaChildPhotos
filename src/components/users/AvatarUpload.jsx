import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUser, updateAvatar } from '../../redux/userSlice';

import { Button, useToast, Input, FormControl, FormLabel, Spinner } from '@chakra-ui/react';
import axios from 'axios';

export default function AvatarUpload() {
    const [avatarUpload, setAvatarUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const toast = useToast();
    const token = localStorage.getItem('token');

    // Function to resize the avatar image URL
    const getResizedImageUrl = (url, width, height) => {
        const splitUrl = url.split('/');
        splitUrl.splice(-2, 0, `w_${width},h_${height},c_fill,g_face`);
        return splitUrl.join('/');
    }

    // Function to handle avatar uploading
    const uploadingAvatarHandler = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('avatar', avatarUpload);
            const response = await axios.put('http://localhost:5000/api/images/', formData, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200 || response.status === 201) {
                setAvatarUpload(null);
                console.log('Response data:', response.data);

                console.log('Full response object:', response);

                if (response?.data?.avatarURL) {
                    const resizedAvatarUrl = getResizedImageUrl(response.data.avatarURL, 200, 200);
                    console.log('Resized avatar URL:', resizedAvatarUrl);

                    // Show success toast
                    toast({
                        title: 'Success!',
                        description: `Successfully update your avatar ${response.data.avatarURL}`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });

                    // Update user with resized avatar URL
                    dispatch(updateUser({ ...response.data.user, avatar: resizedAvatarUrl }));

                } else {
                    console.error("Full response object when avatarURL not found:", response);
                    throw new Error("Avatar URL not found in response");
                }
            }

        } catch (error) {
            console.error('Error updating Avatar:', error);
            toast({
                title: 'Error!',
                description: 'Error updating Avatar.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    }

    // Function to handle file change
    const handleFileChange = (e) => {
        setAvatarUpload(e.target.files[0]);
    };

    // Function to handle form submission
    const FormSubmitHandler = (e) => {
        e.preventDefault();
        uploadingAvatarHandler();
    }



    return (
        <>
            <form onSubmit={FormSubmitHandler}>
                <FormControl id="username" mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="file"
                        placeholder="Upload your Avatar"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg"
                    />
                </FormControl>

                <Button type="submit" colorScheme="teal" mb={4} width="100%">
                    {isLoading ? <Spinner size="sm" /> : 'Update Avatar'}
                </Button>
            </form>
        </>
    )
}
