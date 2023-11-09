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

<section
  class={twMerge(
    'grid w-full grid-cols-12 gap-[1.25rem] sm:gap-[2.5rem] xl:gap-[3.125rem] xl:pr-[9.69rem]',
    $$props.class,
  )}
>
  <div class="col-span-12 lg:col-span-5 xl:col-span-4"></div>
  <div class="col-span-12 lg:col-span-7 xl:col-span-8"></div>
</section>
