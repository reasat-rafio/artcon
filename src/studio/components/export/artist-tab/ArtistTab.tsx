import { Heading } from '@sanity/ui';
import { Card } from '@sanity/ui';
import React, { useEffect } from 'react';
import type { ITabOptions } from '../ExportComponent';
import Table from './Table';

interface ArtistTabProps extends ITabOptions {}

const ArtistTab: React.FC<ArtistTabProps> = ({ label }) => {
  useEffect(() => {}, []);

  return (
    <Card border marginTop={2} padding={4} radius={2}>
      <Heading>{label}</Heading>
      <Table />
    </Card>
  );
};

export default ArtistTab;
