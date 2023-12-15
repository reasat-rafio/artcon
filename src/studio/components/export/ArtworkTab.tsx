import { Heading } from '@sanity/ui';
import { Card } from '@sanity/ui';
import React from 'react';
import type { ITabOptions } from './ExportComponent';

interface ArtworkTabProps extends ITabOptions {}

const ArtworkTab: React.FC<ArtworkTabProps> = ({ label }) => {
  return (
    <Card border marginTop={2} padding={4} radius={2}>
      <Heading>{label}</Heading>
    </Card>
  );
};
export default ArtworkTab;
