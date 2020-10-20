import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HStack, Spacer, useDisclosure } from '@chakra-ui/core';
import Navbar, { NavbarItem } from './components/navbar';
import { Login, Signup } from './components/auth-modal';
import Landing from './pages/landing';

function UnauthenticatedApp() {
  const {
    onClose: onLoginClose,
    onOpen: onLoginOpen,
    isOpen: isLoginOpen,
  } = useDisclosure();
  const {
    onClose: onSignupClose,
    onOpen: onSignupOpen,
    isOpen: isSignupOpen,
  } = useDisclosure();

  return (
    <Router>
      <Navbar>
        <Spacer />
        <HStack spacing="8">
          <NavbarItem onClick={onLoginOpen}>Log In</NavbarItem>
          <NavbarItem onClick={onSignupOpen}>Sign Up</NavbarItem>
        </HStack>
      </Navbar>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
      <Signup isOpen={isSignupOpen} onClose={onSignupClose} />
    </Router>
  );
}

export default UnauthenticatedApp;
