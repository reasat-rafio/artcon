import { Heading } from '@sanity/ui';
import { Card } from '@sanity/ui';
import React from 'react';
import type { ITabOptions } from './ExportComponent';

interface ArtistTabProps extends ITabOptions {}

const ArtistTab: React.FC<ArtistTabProps> = ({ label }) => {
  return (
    <Card border marginTop={2} padding={4} radius={2}>
      <Heading>{label}</Heading>
    </Card>
  );
};
export default ArtistTab;
