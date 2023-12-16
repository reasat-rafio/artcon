import React, { useEffect, useMemo, useState } from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import useVersionedClient from '@/studio/hooks/useVersionedClient';
import groq from 'groq';
import type { IArtist } from '@/studio/lib/types';
import { useRowSelect } from '@table-library/react-table-library/select';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Flex,
  Inline,
  Spinner,
  Text,
} from '@sanity/ui';
import { urlFor } from '@/lib/sanity/sanityClient';
import { TbSearch } from 'react-icons/tb';
import { FaFileExport } from 'react-icons/fa';
import { BsPrinterFill } from 'react-icons/bs';

interface TableProps {}

const query = groq`*[_type == "artist"][]{
   "id": _id,
    ...personalDocuments {
        name,
        country,
        email,
        phone,
        born,
        artistPortrait
    }
}`;

const Table: React.FC<TableProps> = () => {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const client = useVersionedClient();
  const data = useMemo(() => ({ nodes: artists }), [artists]);

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  44px repeat(6, minmax(0, 1fr));
      `,
    },
  ]);

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: 'Name',
      renderCell: (item: IArtist) => item?.name.en,
      select: true,
    },
    {
      label: 'Portrait',
      renderCell: (item: IArtist) => (
        <img
          className="aspect-square h-[150px] w-[150px] object-cover"
          src={urlFor(item?.artistPortrait)
            .width(400)
            .format('webp')
            .url()}
          alt={`${item.name.en} portrait`}
        />
      ),
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
    <>
      <Flex padding={4}>
        <Card flex={[1, 2, 3]}>
          <Autocomplete
            fontSize={[2, 2, 3]}
            icon={TbSearch}
            id="autocomplete-example"
            options={artists.map((artist) => ({ value: artist.name.en }))}
            placeholder="Search By Name"
          />
        </Card>
        <Card flex={[1]} marginLeft={[2, 2, 3, 4]}>
          <Inline space={[3, 3, 4]}>
            <Button
              fontSize={[2, 2, 3]}
              icon={FaFileExport}
              padding={[3, 3, 4]}
              text="Export"
            />
            <Button
              fontSize={[2, 2, 3]}
              icon={BsPrinterFill}
              padding={[3, 3, 4]}
              text="Print"
              tone="primary"
            />
          </Inline>
        </Card>
      </Flex>

      <Box padding={[3, 3, 4, 5]}>
        {loading ? (
          <Card padding={4}>
            <Flex
              align="center"
              direction="column"
              gap={3}
              height="fill"
              justify="center">
              <Spinner muted />
              <Text muted size={1}>
                Loading…
              </Text>
            </Flex>
          </Card>
        ) : artists?.length ? (
          <CompactTable
            columns={COLUMNS}
            data={data}
            theme={theme}
            layout={{ custom: true }}
            select={select}
          />
        ) : (
          <Card>
            <Text>No artist found</Text>
          </Card>
        )}
      </Box>
    </>
  );
};
export default Table;
