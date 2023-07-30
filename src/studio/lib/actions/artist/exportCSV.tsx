import React, { useEffect, useState } from 'react';
import type { DocumentActionProps, SanityDocument } from 'sanity';
import { BiSolidFileExport } from 'react-icons/bi';
import CSVPopup from '@/studio/components/csv-popup/artist/CSVPopup';

export function ExportArtistCSV(props: DocumentActionProps) {
  const [data, setData] = useState<SanityDocument | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setData(props.published);
  }, [props.draft, props.published]);

  return {
    disabled: !data,
    label: 'Export as CSV',
    icon: BiSolidFileExport,
    tone: 'positive',

    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: isDialogOpen && {
      content: <CSVPopup setDialogOpen={setDialogOpen} data={data} />,
    },
  };
}
