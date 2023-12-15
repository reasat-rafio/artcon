import { Card, Tab, TabList, TabPanel } from '@sanity/ui';
import { nanoid } from 'nanoid';
import React, { useState, type ComponentType } from 'react';
import { type Tool } from 'sanity';
import ArtistTab from './ArtistTab';
import ArtworkTab from './ArtworkTab';

export interface ExportProps {}

const tabOptions = [
  {
    id: nanoid(),
    label: 'Artists',
    name: 'artist',
  },
  {
    id: nanoid(),
    label: 'Artworks',
    name: 'artworks',
  },
];

export type ITabOptions = (typeof tabOptions)[number];
const Export: ComponentType<{ tool: Tool<ExportProps> }> = () => {
  const [activeTabId, setActiveTabId] = useState<string>(tabOptions[0].id);

  const renderContent = React.useCallback((props: ITabOptions) => {
    switch (props.name) {
      case 'artist':
        return <ArtistTab {...props} />;
      case 'artworks':
        return <ArtworkTab {...props} />;
      default:
        return null;
    }
  }, []);

  return (
    <div>
      <Card padding={4}>
        <TabList space={2}>
          {tabOptions.map(({ id, name, label }) => (
            <Tab
              key={id}
              id={id}
              label={label}
              aria-controls={`${name}-panel`}
              selected={activeTabId === id}
              onClick={() => setActiveTabId(id)}
            />
          ))}
        </TabList>

        {tabOptions.map(({ id, name, label }) => (
          <TabPanel
            key={id}
            aria-labelledby={`${name}-tab`}
            hidden={id !== activeTabId}
            id={`${name}-panel`}>
            {renderContent({ id, name, label })}
          </TabPanel>
        ))}
      </Card>
    </div>
  );
};

export default Export;
