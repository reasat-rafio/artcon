import React from 'react';
import type { ITabOptions } from '../ExportComponent';
import Table from './Table';
import { Card } from '@sanity/ui';

interface ArtistTabProps extends ITabOptions {}

const ArtistTab: React.FC<ArtistTabProps> = () => {
  return (
    <Card border marginTop={2} padding={4} radius={2}>
      <Table />
    </Card>
  );
};

export default ArtistTab;
