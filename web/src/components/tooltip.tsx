import { Tooltip as T, TooltipProps } from '@chakra-ui/core';
import React from 'react';

// TODO: fix chakra tooltip error
function Tooltip(props: TooltipProps) {
  return <T hasArrow openDelay={500} {...props} />;
}

export default Tooltip;
