import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode';

const initialState = {
    isAuthenticated: false,
    id: null,
    role: null,
    name: '',
    username: localStorage.getItem('username'),
    avatar: '',
};

export const loadUser = createAsyncThunk('user/loadUser', async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwt_decode(token);
        return { id: decodedToken.id, role: decodedToken.role };
    }
    return null;
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        logout: (state) => {
            state.id = null;
            state.role = null;
            state.isAuthenticated = false;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        updateUser: (state, action) => {
            state.id = action.payload._id;
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loadUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.id = action.payload.id;
                state.role = action.payload.role;
                state.name = action.payload.name;
            } else {
                state.isAuthenticated = false;
                state.role = 'guest';
                state.name = '';
            }
        });
    },
});


export const { login, logout, setIsAuthenticated, updateUser, updateAvatar } = userSlice.actions;

export default userSlice.reducer;