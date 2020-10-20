import React, { ReactNode } from 'react';
import { Center, Flex, Heading } from '@chakra-ui/core';

function Navbar({ children }: { children?: ReactNode }) {
  return (
    <Flex
      as="nav"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="grey.100"
      h={16}
      px={{ sm: '2.5%', md: '7.5%' }}
      py={3}
    >
      <Center>
        <Heading as="h1" size="lg">
          Marker
        </Heading>
      </Center>
      {children}
    </Flex>
  );
}

export default Navbar;
