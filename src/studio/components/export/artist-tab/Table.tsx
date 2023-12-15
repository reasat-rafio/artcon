import React, { useEffect, useState } from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import useVersionedClient from '@/studio/hooks/useVersionedClient';
import groq from 'groq';
import type { IArtist } from '@/studio/lib/types';
import { useRowSelect } from '@table-library/react-table-library/select';
import { Box } from '@sanity/ui';

interface TableProps {}

const query = groq`*[_type == "artist"][]{
   "id": _id,
    ...personalDocuments {
        name,
        country,
        email,
        phone,
        born
    }
}`;

const Table: React.FC<TableProps> = () => {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const client = useVersionedClient();
  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  44px repeat(5, minmax(0, 1fr));
      `,
    },
  ]);

  const select = useRowSelect(
    { nodes: artists },
    {
      onChange: onSelectChange,
    },
  );

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: 'Name',
      renderCell: (item: IArtist) => item?.name.en,
      select: true,
    },
    { label: 'Country', renderCell: (item: IArtist) => item?.country },
    { label: 'Email', renderCell: (item: IArtist) => item?.email },
    { label: 'Phone', renderCell: (item: IArtist) => item?.phone },
    {
      label: 'Born',
      renderCell: (item: IArtist) => item?.born.substring(0, 10),
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await client.fetch(query);
      setArtists(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box padding={[3, 3, 4, 5]}>
      {!!artists?.length && (
        <CompactTable
          columns={COLUMNS}
          data={{ nodes: artists }}
          theme={theme}
          layout={{ custom: true }}
          select={select}
        />
      )}
    </Box>
  );
};
export default Table;
