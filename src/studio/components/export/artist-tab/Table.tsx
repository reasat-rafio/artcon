import { urlFor } from '@/lib/sanity/sanityClient';
import { cleanCSV, downloadCSV } from '@/studio/helper';
import useVersionedClient from '@/studio/hooks/useVersionedClient';
import type { IArtist } from '@/studio/lib/types';
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
import { getTheme } from '@table-library/react-table-library/baseline';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useRowSelect } from '@table-library/react-table-library/select';
import { useTheme } from '@table-library/react-table-library/theme';
import type {
  Action,
  State,
} from '@table-library/react-table-library/types/common';
import groq from 'groq';
import Papa from 'papaparse';
import React, { useEffect, useMemo, useState } from 'react';
import { BsPrinterFill } from 'react-icons/bs';
import { FaFileExport } from 'react-icons/fa';
import { TbSearch } from 'react-icons/tb';

interface TableProps {}

const formatBornDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const extractCountryName = (country: string): string => {
  if (!country) return '';
  // Extract country name from format "CODE-CountryName"
  return country.split('-').slice(1).join('-');
};

const query = groq`*[_type == "artist"] | order(personalDocuments.name.en asc)[]{
   "id": _id,
    ...personalDocuments {
      "name (en)": name.en,
      "name (bn)": name.bn,
        country,
        email,
        phone,
        born,
        artistPortrait
    }
}`;

const CUSTOM_HEADERS = [
  'name (en)',
  'name (bn)',
  'portrait',
  'born',
  'country',
  'email',
  'phone',
];

const Table: React.FC<TableProps> = () => {
  const client = useVersionedClient();
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const data = useMemo(() => ({ nodes: artists }), [artists]);

  useEffect(() => {
    if (searchInput) {
      const filtered = artists.filter((artist) =>
        artist['name (en)'].toLowerCase().includes(searchInput.toLowerCase()),
      );
      setArtists(filtered);
    } else {
      fetchData();
    }
  }, [searchInput]);

  useEffect(() => {
    fetchData();
  }, []);

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  44px repeat(5, minmax(0, 1fr));
      `,
    },
  ]);

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(_: Action, state: State) {
    setSelectedArtistIds(state.ids);
  }

  const COLUMNS = [
    {
      label: 'Name',
      renderCell: (item: IArtist) => (
        <ul>
          <li>{item?.['name (en)']},</li>
          <li>{item?.['name (bn)']}</li>
          <li style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>{formatBornDate(item?.born)}</li>
        </ul>
      ),
      select: true,
    },
    {
      label: 'Portrait',
      renderCell: (item: IArtist) => (
        <img
          className="aspect-square h-[100px] w-[100px] object-cover"
          src={urlFor(item?.artistPortrait).width(150).format('webp').url()}
          alt={`${item['name (en)']} portrait`}
        />
      ),
    },
    { 
      label: 'Country', 
      renderCell: (item: IArtist) => extractCountryName(item?.country)
    },
    { 
      label: 'E-mail', 
      renderCell: (item: IArtist) => item?.email
    },
    { 
      label: 'Phone', 
      renderCell: (item: IArtist) => item?.phone
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await client.fetch(query);
      setArtists(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const exportAsCSV = async () => {
    const filteredArtist = selectedArtistIds?.length
      ? artists.filter((artist) => selectedArtistIds.includes(artist.id))
      : artists;
    console.log({ filteredArtist });

    const convertedCSV = convertArtistArrayToCSV(filteredArtist);
    console.log(convertedCSV);
    downloadCSV(cleanCSV(convertedCSV), 'artists.csv');
  };

  const convertArtistArrayToCSV = (data: IArtist[]) => {
    const modifiedData = data.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, artistPortrait, ...rest } = item;
      return {
        ...rest,
        born: formatBornDate(item?.born),
        country: extractCountryName(item?.country),
        portrait: urlFor(artistPortrait).url(),
      };
    });

    const csv = Papa.unparse(modifiedData, {
      header: true,
      columns: CUSTOM_HEADERS,
    });
    return csv;
  };

  return (
    <>
      <Flex padding={4}>
        <Card flex={[1, 2, 3]}>
          <Autocomplete
            fontSize={[2, 2, 3]}
            icon={TbSearch}
            id="autocomplete-example"
            options={artists.map((artist) => ({ value: artist['name (en)'] }))}
            placeholder="Search By Name"
            onQueryChange={(e) => {
              if (e !== null) setSearchInput(e);
            }}
            onChange={(e) => {
              setSearchInput(e);
            }}
          />
        </Card>
        <Card flex={[1]} marginLeft={[2, 2, 3, 4]}>
          <Inline space={[3, 3, 4]}>
            <Button
              fontSize={[2, 2, 3]}
              icon={FaFileExport}
              padding={[3, 3, 4]}
              text="Export"
              onClick={exportAsCSV}
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
