import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import logo from '../../assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login, setIsAuthenticated, loadUser } from '../../redux/userSlice';
import { FiLogOut } from 'react-icons/fi';

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
  const [forceUpdate, setForceUpdate] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef();
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.user.role);
  const user = useSelector((state) => state.user.user);
  const username = useSelector((state) => state.user.username);
  const avatarUrl = useSelector((state) => state.user.avatar);
  console.log("Avatar URL from Redux state:", avatarUrl);
  console.log('User object:', user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.user.isloading);
  const dispatch = useDispatch();
  const accentColor = ('#F39C12')



  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole && username) {
      dispatch(login({ role: userRole, username: username }));
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
      marginRight={{ base: 2, md: 4 }}
      marginLeft={{ base: 2, md: 4 }}
      onClick={onClick}
      whiteSpace="nowrap"
    >
      {to ? (
        <ChakraLink as={Link}
          to={to}
          display="flex"
          alignItems="center"
          color={colorMode === "light" ? "blue.600" : accentColor}
          fontWeight="bold"
          fontFamily="Playfair Display, serif"
          textDecoration="none"
          _hover={{
            textDecoration: 'none'
          }} >
          {children}
        </ChakraLink>
      ) : (
        <Text display="flex" alignItems="center" color={colorMode === "light" ? "blue.600" : "white"}

          fontFamily="Playfair Display, serif"
          textDecoration="none"
        >{children}</Text>
      )}
    </LinkBox>
  );

  const MenuItems = ({ isMobile }) => (
    <Box
      display={{
        base: isMobile ? 'block' : 'none',
        md: 'block',
        lg: 'flex',
        xl: 'flex',
      }}
      paddingX={{ base: 2, md: 0 }}
      flexWrap="wrap"
    >

      {isMobile ? (
        <VStack spacing={6} alignItems="start" as="ul" listStyleType="none">
          <MenuItem to="/" onClick={closeDrawer}>Home</MenuItem>
          <MenuItem to="/gallery" onClick={closeDrawer}>Gallery</MenuItem>
          <MenuItem to="/service" onClick={closeDrawer}>Booking</MenuItem>
          {!isAuthenticated && (
            <>
              <MenuItem to="/login" onClick={closeDrawer}>Login</MenuItem>
              <MenuItem to="/register" onClick={closeDrawer}>Register</MenuItem>
            </>
          )}
          {isAuthenticated && userRole === 'user' && (
            <MenuItem to="/profile" onClick={closeDrawer}>
              <Flex alignItems="center">
                <Avatar size="sm" name={username ? `${username}` : ''} />
                <Text ml={2} bg={colorMode === 'light' ? 'gray.300' : 'gray.700'} >{username ? `Profile` : ''}</Text>
              </Flex>
            </MenuItem>
          )}


          {isAuthenticated && userRole === 'admin' && (
            <MenuItem to="/profile" onClick={closeDrawer}>
              <Flex alignItems="center">
                <Text>{username ? `Profile` : ''}</Text>
                <Avatar size="sm" name={username ? `${username}` : ''} src="" />
              </Flex>
            </MenuItem>
          )}


          {isAuthenticated && userRole === 'admin' && (
            <MenuItem to="/admin" onClick={closeDrawer}>
              <Flex alignItems="center">
                <Text>{username ? `Welcome Admin` : ''}</Text>
              </Flex>

            </MenuItem>
          )}

          <MenuItem to="/about" onClick={closeDrawer}>About Us</MenuItem>
          {isAuthenticated && (
            <MenuItem
              onClick={handleLogout}
              p={4}
              fontWeight="bold"
              _hover={{
                bg: 'gray.100',
                color: 'blue.600',
              }}

              color={colorMode === "light" ? "blue.600" : accentColor}
            >
              <Box as={FiLogOut} color="black" />
              Logout
            </MenuItem>
          )}
        </VStack>
      ) : (<HStack spacing={4} alignItems="center" as="ul" listStyleType="none" justifyContent="flex-end"
        width="100%">
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/gallery">Gallery</MenuItem>
        <MenuItem to="/about">About Us</MenuItem>
        <MenuItem to="/service">Booking</MenuItem>
        {!isAuthenticated && (
          <>
            <MenuItem to="/login">Login</MenuItem>
            <MenuItem to="/register">Register</MenuItem>
          </>
        )}

        {isAuthenticated && userRole === 'user' && (
          <MenuItem to="/profile">
            <Flex alignItems="center">
              <Avatar size="sm" name={username ? `${username}` : ''} />
              <Text ml={2} bg={colorMode === 'light' ? 'gray.300' : 'gray.700'} >{username ? `Profile` : ''}</Text>
            </Flex>
          </MenuItem>
        )}

        {isAuthenticated && userRole === 'admin' && (
          <MenuItem to="/profile">
            <Flex alignItems="center">
              <Text ml={2}>{username ? `Profile` : ''}</Text>
            </Flex>
          </MenuItem>
        )}

        {isAuthenticated && userRole === 'admin' && (
          <MenuItem to="/admin">
            <Flex alignItems="center">
              <Avatar size="sm" name={username ? `${username}` : ''} src="" />
              <Text ml={2}>{username ? `Welcome Admin` : ''}</Text>
            </Flex>
          </MenuItem>
        )}

        <Spacer />
        {isAuthenticated && (
          <MenuItem
            onClick={handleLogout}
            p={4}
            fontWeight="bold"
            _hover={{
              bg: 'gray.100',
              color: 'blue.600',
            }}
            _active={{
              bg: 'blue.600',
              color: 'white',
            }}
            color={colorMode === "light" ? "blue.600" : accentColor}
          >
            <Box as={FiLogOut} color="black" />
            Logout
          </MenuItem>
        )}
      </HStack>)}

    </Box>
  );

  return (
    <>

      <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.900'} py={2} px={[2, 4, 6, 8]} maxWidth="100%">
        <Flex alignItems="center">
          <Img src={logo} alt="Brand Logo" boxSize="40px" mr={{ base: 1, md: 2 }} />
          <Text
            fontWeight="bold"
            fontSize={{ base: "lg", md: "xl" }}
            fontFamily="'Libre Bodoni', sans-serif"
            letterSpacing="wider"
            color={colorMode === "light" ? "blue.600" : accentColor}
          >
            AfricanaChildPhotos
          </Text>

          {/* Dark mode and light mode switch */}
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FaMoon /> : <FiSun />}
            ml={{ base: 2, md: 6 }}
            onClick={toggleColorMode}
            mr={{ base: 1, md: 2 }} // Add marginRight here
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
                  <DrawerHeader> AfricanaChildPhotography</DrawerHeader>
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
    </>
  );
}
