import React from 'react';
import {
  Button,
  Center,
  Container,
  IconButton,
  Input,
  Heading,
  HStack,
  Spacer,
  Tooltip,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/core';
import { BsBookmarkPlus, BsBoxArrowRight, BsX } from 'react-icons/bs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary';
import Navbar, { NavbarItem } from './components/navbar';
import Home from './pages/home';
import { useAuthStore } from './stores/auth-store';

// TODO: Fix chakra tooltip state update errors
function AuthenticatedApp() {
  const logout = useAuthStore(state => state.actions.logout);
  const { isOpen, onToggle } = useDisclosure();

  const isSmallScreen = useBreakpointValue<boolean>({ sm: true, md: false });

  return (
    <>
      <Navbar>
        {isOpen && (
          <form style={{ display: 'flex', width: '100%' }}>
            <HStack ml={{ sm: 10, md: 24 }} w="full" spacing={2}>
              <Input type="text" placeholder="Save a URL https://..." />
              {isSmallScreen && (
                <Tooltip hasArrow label="Cancel" openDelay={500}>
                  <IconButton
                    aria-label="Cancel"
                    icon={<BsX size="1.5rem" />}
                    onClick={onToggle}
                    size="lg"
                    variant="ghost"
                  />
                </Tooltip>
              )}
              {!isSmallScreen && (
                <>
                  <Button colorScheme="blue">Save</Button>
                  <Button variant="outline" onClick={onToggle}>
                    Cancel
                  </Button>
                </>
              )}
            </HStack>
          </form>
        )}
        {!isOpen && (
          <>
            <HStack ml={24} spacing={8}>
              <NavbarItem>Favorites</NavbarItem>
              <NavbarItem>Tags</NavbarItem>
            </HStack>
            <Spacer />
            <HStack spacing={1}>
              <Tooltip hasArrow label="Save a URL" openDelay={500}>
                <IconButton
                  aria-label="Save a URL"
                  icon={<BsBookmarkPlus size="1.5rem" />}
                  onClick={onToggle}
                  size="lg"
                  variant="ghost"
                />
              </Tooltip>
              <Tooltip hasArrow label="Log Out" openDelay={500}>
                <IconButton
                  aria-label="Log Out"
                  icon={
                    <BsBoxArrowRight size="1.5rem" style={{ marginLeft: 3 }} />
                  }
                  size="lg"
                  onClick={logout}
                  variant="ghost"
                />
              </Tooltip>
            </HStack>
          </>
        )}
      </Navbar>

      <Container px={0} py={8} maxW={{ sm: '95%', md: '85%' }}>
        <div>Hello</div>
      </Container>
    </>
    // <ErrorBoundary>
    //   <Router>
    //     {isOpen && (
    //       <HStack spacing={4}>
    //         <Input
    //           width="420px"
    //           type="text"
    //           placeholder="Save a URL https://..."
    //         />
    //         <Button colorScheme="blue">Save</Button>
    //         <Button variant="outline" onClick={onToggle}>
    //           Cancel
    //         </Button>
    //       </HStack>
    //     )}
    //     {!isOpen && (
    //       <Navbar>
    //         <NavbarItem>
    //           <Tooltip hasArrow label="Save a URL" openDelay={500}>
    //             <IconButton
    //               aria-label="Save a URL"
    //               icon={<BsBookmarkPlus size="1.5rem" />}
    //               onClick={onToggle}
    //               size="lg"
    //               variant="ghost"
    //             />
    //           </Tooltip>
    //         </NavbarItem>
    //         <NavbarItem isLast>
    //           <Tooltip hasArrow label="Log Out" openDelay={500}>
    //             <IconButton
    //               aria-label="Log Out"
    //               icon={
    //                 <BsBoxArrowRight size="1.5rem" style={{ marginLeft: 3 }} />
    //               }
    //               size="lg"
    //               onClick={logout}
    //               variant="ghost"
    //             />
    //           </Tooltip>
    //         </NavbarItem>
    //       </Navbar>
    //     )}
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="*" element={<div>Not Found</div>} />
    //     </Routes>
    //   </Router>
    // </ErrorBoundary>
  );
}

export default AuthenticatedApp;
