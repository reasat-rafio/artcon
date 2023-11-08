<script lang="ts">
  import type { Information } from '@/lib/types/collection-detail.types';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { DateTime } from 'luxon';
  import { twMerge } from 'tailwind-merge';

  interface Artist {
    name: string;
    born: string;
    country: string;
  }

  export let artworkName: string;
  export let artist: Artist;
  export let information: Information;
  export let artworkImages: SanityImageAssetDocument[];
</script>

<section class={twMerge($$props.class)}></section>
