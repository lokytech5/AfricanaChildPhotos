import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
  Link as ChakraLink,
} from '@chakra-ui/react';


export default function NavigationMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef();

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const MenuItems = () => (
    <VStack align="start" spacing={4}>
      <ChakraLink as={Link} to="/">
        Home
      </ChakraLink>
      <ChakraLink as={Link} to="/about">
        About Us
      </ChakraLink>
      <ChakraLink as={Link} to="/login">
        Login
      </ChakraLink>
      <ChakraLink as={Link} to="/register">
        Register
      </ChakraLink>
    </VStack>
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
