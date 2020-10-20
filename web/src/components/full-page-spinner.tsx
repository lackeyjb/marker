import React from 'react';
import { Center, CircularProgress } from '@chakra-ui/core';

function FullPageSpinner() {
  return (
    <Center h="100vh">
      <CircularProgress isIndeterminate />
    </Center>
  );
}

export default FullPageSpinner;
