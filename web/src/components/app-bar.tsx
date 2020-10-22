import React, { useCallback } from 'react';
import { HStack, Spacer, useDisclosure } from '@chakra-ui/core';
import { BsBookmarkPlus, BsBoxArrowRight } from 'react-icons/bs';
import styled from '@emotion/styled';

import CreateBookmark from './create-bookmark';
import IconButton from './icon-button';
import { NavbarItem } from './navbar';
import { useAuthStore } from '../stores/auth-store';

const LogoutIcon = styled(BsBoxArrowRight)`
  font-size: 1.5rem;
  margin-left: 3px;
`;

function AppBar() {
  const logout = useAuthStore(useCallback(state => state.actions.logout, []));
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <CreateBookmark isOpen={isOpen} onToggle={onToggle} />
      {!isOpen && (
        <>
          <HStack ml={24} spacing={8}>
            <NavbarItem>Favorites</NavbarItem>
            <NavbarItem>Tags</NavbarItem>
          </HStack>
          <Spacer />
          <HStack spacing={1}>
            <IconButton
              icon={<BsBookmarkPlus size="1.5rem" />}
              onClick={onToggle}
            >
              Save a URL
            </IconButton>
            <IconButton icon={<LogoutIcon />} onClick={logout}>
              Log Out
            </IconButton>
          </HStack>
        </>
      )}
    </>
  );
}

export default AppBar;
