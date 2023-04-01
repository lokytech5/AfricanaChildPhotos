import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setIsAuthenticated } from '../../redux/userSlice';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Spacer,
  useColorMode,
  useMediaQuery,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  LinkBox,
  LinkOverlay,
  Link as ChakraLink,
} from '@chakra-ui/react';


export default function NavigationMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef();
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.user.role);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');

    // Dispatch logout action
    dispatch(logout());
    dispatch(setIsAuthenticated(false));
    navigate('/', { replace: true });
  }

  const MenuItem = ({ to, children, onClick }) => (
    <LinkBox
      as="li"
      _hover={{ textDecoration: 'underline', color: 'blue.500' }}
      onClick={onClick}
    >
      {to ? (
        <ChakraLink as={Link} to={to}>
          {children}
        </ChakraLink>
      ) : (
        <Text>{children}</Text>
      )}
    </LinkBox>
  );

  const MenuItems = () => (
    <HStack spacing={8}>
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/about">About Us</MenuItem>
      {!isAuthenticated && (
        <>
          <MenuItem to="/login">Login</MenuItem>
          <MenuItem to="/register">Register</MenuItem>
        </>
      )}
      <MenuItem to="/profile">Profile</MenuItem>
      {isAuthenticated && userRole === 'admin' && (
        <MenuItem to="/admin">Admin Panel</MenuItem>
      )}

      {isAuthenticated && (
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      )}
    </HStack>
  );

  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.900'} p={4}>
      <Flex>
        {/* Brand name and logo placeholder */}
        <Text fontWeight="bold" fontSize="lg">
          Logo & Brand Name
        </Text>
        <Spacer />
        {isLargerThan768 ? (
          // Desktop menu
          <MenuItems />
        ) : (
          // Mobile menu
          <>
            <IconButton
              ref={btnRef}
              aria-label="Open menu"
              icon={<GiHamburgerMenu />}
              onClick={openDrawer}
            />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={closeDrawer}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <MenuItems />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
        {/* Dark mode and light mode switch */}
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <FaMoon /> : <FiSun />}
          ml={4}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );

}
