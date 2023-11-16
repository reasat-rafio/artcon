import { Badge, Flex, Box } from '@sanity/ui';
import type { PreviewProps } from 'sanity';
import React from 'react';

export default function LockedPreview(props: PreviewProps) {
  return (
    <Flex align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Badge tone="critical">Locked!</Badge>
    </Flex>
  );
}
