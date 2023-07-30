import type { SanityDocument } from '@sanity/client';
import {
  Dialog,
  Text,
  Button,
  Card,
  Checkbox,
  Grid,
  Box,
  Flex,
} from '@sanity/ui';
import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { BsDownload } from 'react-icons/bs';

import type { ArtistDocument } from '@/studio/lib/types';
import { formatData } from './helpers';
import {
  cleanCSV,
  convertArrayToCSV,
  convertObjectToArray,
  downloadCSV,
} from '@/studio/helper';

interface CSVPopupProps {
  data: SanityDocument | null;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IFields {
  key: string;
  state: boolean;
  value: unknown;
}

const CSVPopup: React.FC<CSVPopupProps> = ({ data, setDialogOpen }) => {
  const _data = JSON.parse(JSON.stringify(data));
  const fData = formatData(_data as ArtistDocument);
  const [fields, setFields] = useState<IFields[]>(convertObjectToArray(fData));
  const inputOnChangeAction = (key: string, state: boolean) => {
    const newVal = fields.map((obj) =>
      obj.key === key ? { ...obj, state: !state } : obj
    );
    setFields(newVal);
  };

  return (
    <Dialog
      header="Select the feilds you want to export"
      id="artist-csv-popup"
      onClose={() => {
        setDialogOpen(false);
      }}
      width={2}
      zOffset={1000}
      footer={<Footer fields={fields} />}
    >
      <Grid columns={[4]} gap={[4]} padding={4}>
        {fields.map(({ key, state }) => (
          <Card padding={4} key={`${key}-${state}`}>
            <Flex align="center">
              <Checkbox
                id={key}
                onChange={() => inputOnChangeAction(key, state)}
                style={{ display: 'block' }}
                checked={state}
              />
              <Box flex={1} paddingLeft={3}>
                <Text>
                  <label htmlFor={key}>{key}</label>
                </Text>
              </Box>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Dialog>
  );
};
export default CSVPopup;

const Footer: React.FC<{ fields: IFields[] }> = ({ fields }) => {
  const exportAction = async () => {
    const filterOnlySelectedFields = fields
      .filter(({ state }) => state)
      .sort((a, b) => (a.key > b.key ? 1 : -1));

    const convertedCSV = convertArrayToCSV(filterOnlySelectedFields);

    downloadCSV(cleanCSV(convertedCSV), 'data.csv');
  };

  return (
    <Box>
      <Button
        onClick={exportAction}
        style={{ marginLeft: 'auto', display: 'block' }}
        fontSize={[2, 2, 3]}
        icon={BsDownload}
        padding={[3, 3, 4]}
        text="Export"
        tone="primary"
      />
    </Box>
  );
};
