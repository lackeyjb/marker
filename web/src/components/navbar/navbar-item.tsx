import React from 'react';
import { Link, LinkProps } from '@chakra-ui/core';

export function NavbarItem(props: LinkProps) {
  return <Link as="span" {...props} />;
}

export default NavbarItem;
