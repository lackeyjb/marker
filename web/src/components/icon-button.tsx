import React, { useMemo } from 'react';
import {
  IconButton as IB,
  IconButtonProps as IBProps,
  TooltipProps,
} from '@chakra-ui/core';
import { omit } from 'lodash-es';
import Tooltip from './tooltip';

export interface IconButtonProps extends Omit<IBProps, 'aria-label'> {
  children: string;
  tooltipProps?: TooltipProps;
}

function IconButton({
  children: label,
  tooltipProps,
  ...otherProps
}: IconButtonProps) {
  const props = useMemo(() => omit(otherProps, 'aria-label'), [otherProps]);

  return (
    <Tooltip label={label} {...tooltipProps}>
      <IB aria-label={label} size="lg" variant="ghost" {...props} />
    </Tooltip>
  );
}

export default IconButton;
