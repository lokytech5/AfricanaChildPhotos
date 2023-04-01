import {React, useState} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { Box, Input, Button } from '@chakra-ui/react';

export default function Profile() {
    const user = useSelector((state) => state.user);
    const [name, setName] = useState(user.name);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch your updateProfile action
        // dispatch(updateProfile({ name }));
    };

    return (
        <Box>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type="submit">Save Changes</Button>
            </form>
        </Box>
    );
};

