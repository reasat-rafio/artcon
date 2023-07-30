import React, { useEffect, useState } from 'react';
import {
  useDocumentOperation,
  type DocumentActionProps,
  type SanityDocument,
} from 'sanity';
import CSVPopup from '../components/CSVPopup';
import { BiSolidFileExport } from 'react-icons/bi';

export function ExportCSV(props: DocumentActionProps) {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [data, setData] = useState<SanityDocument | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (props.draft) setData(props.draft);
    else setData(props.published);
  }, [props.draft, props.published]);

  return {
    // disabled: publish.disabled,
    label: 'Export as CSV',
    icon: BiSolidFileExport,
    tone: 'positive',

    onHandle: () => {
      if (props.draft) setData(props.draft);
      else setData(props.published);
      setDialogOpen(true);
    },
    dialog: isDialogOpen && {
      content: <CSVPopup setDialogOpen={setDialogOpen} data={data} />,
    },
  };
}
