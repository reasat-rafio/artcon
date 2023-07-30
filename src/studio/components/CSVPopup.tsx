import type { SanityDocument } from '@sanity/client';
import { Dialog, Box, Text, Button } from '@sanity/ui';
import React, { type Dispatch, type SetStateAction } from 'react';
import { BsDownload } from 'react-icons/bs';

interface CSVPopupProps {
  data: SanityDocument | null;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const CSVPopup: React.FC<CSVPopupProps> = ({ data, setDialogOpen }) => {
  console.log(data);

  return (
    <Dialog
      header="Select the feilds you want to export"
      id="csv-popup"
      onClose={() => {
        setDialogOpen(false);
      }}
      width={2}
      zOffset={1000}
      footer={<Footer />}
    >
      <Box padding={4}>
        <Text>Content</Text>
      </Box>
    </Dialog>
  );
};
export default CSVPopup;

const Footer = () => {
  return (
    <Box>
      <Button
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
