import React, { useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login, setIsAuthenticated, loadUser } from '../../redux/userSlice';

import {
  Avatar,
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
  Spinner,
  Grid,
  Button,
  VStack,
  HStack,
  LinkBox,
  LinkOverlay,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link as ChakraLink,
  Img,
} from '@chakra-ui/react';


export default function NavigationMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef();
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.user.role);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      dispatch(login({ role: userRole }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');

    // Dispatch logout action
    dispatch(logout());
    dispatch(setIsAuthenticated(false));
    navigate('/', { replace: true });
    localStorage.removeItem('userRole');


  }

  const MenuItem = ({ to, children, onClick }) => (
    <LinkBox
      as="li"
      marginRight={4}
      marginLeft={4}
      _hover={{ textDecoration: 'underline', color: 'blue.500' }}
      onClick={onClick}
    >
      {to ? (
        <ChakraLink as={Link} to={to} display="flex" alignItems="center">
          {children}
        </ChakraLink>
      ) : (
        <Text display="flex" alignItems="center">{children}</Text>
      )}
    </LinkBox>
  );

  const MenuItems = ({ isMobile }) => (
    <Box display={{ base: isMobile ? 'block' : 'none', md: 'block' }}>
      {isMobile ? (
        <VStack spacing={4} alignItems="start" as="ul" listStyleType="none">
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/about">About Us</MenuItem>
          {!isAuthenticated && (
            <>
              <MenuItem to="/login">Login</MenuItem>
              <MenuItem to="/register">Register</MenuItem>
            </>
          )}
          {isAuthenticated && userRole === 'user' && (
            <MenuItem to="/profile">
              <Flex alignItems="center">
                <Avatar size="sm" name="" src="" />
                <Text ml={2}>Profile</Text>
              </Flex>
            </MenuItem>
          )}
          {isAuthenticated && userRole === 'admin' && (
            <MenuItem to="/admin">Admin Panel</MenuItem>
          )}
          {isAuthenticated && (
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          )}
        </VStack>
      ) : (<HStack spacing={4} alignItems="center" as="ul" listStyleType="none">
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/about">About Us</MenuItem>
        {!isAuthenticated && (
          <>
            <MenuItem to="/login">Login</MenuItem>
            <MenuItem to="/register">Register</MenuItem>
          </>
        )}

        {isAuthenticated && userRole === 'user' && (
          <MenuItem to="/profile">
            <Flex alignItems="center">
              <Avatar size="sm" name="" src="" />
              <Text ml={2}>Profile</Text>
            </Flex>

          </MenuItem>
        )}

        {isAuthenticated && userRole === 'admin' && (
          <MenuItem to="/admin">Admin Panel</MenuItem>
        )}

        <Spacer />
        {isAuthenticated && (
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        )}
      </HStack>)}

    </Box>
  );

  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.900'} p={4}>
      <Flex>
        {/* Brand name and logo placeholder */}
        <Text fontWeight="bold" fontSize="lg">
          AfricanaChild
        </Text>

        {/* Dark mode and light mode switch */}
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <FaMoon /> : <FiSun />}
          ml={6}
          onClick={toggleColorMode}
          mr={2} // Add marginRight here
        />

        <Spacer />


        {!loading && isLargerThan768 ? (
          // Desktop menu
          <MenuItems isMobile={false} />
        ) : (
          // Mobile menu
          <>
            {!loading && (
              <IconButton
                ref={btnRef}
                aria-label="Open menu"
                icon={<GiHamburgerMenu />}
                onClick={openDrawer}
              />
            )}
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
                  <VStack align="start" spacing={4}>
                    <MenuItems isMobile={true} />
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}

        {/* Add this condition to render the Spinner */}
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </Flex>
    </Box>
  );
}
