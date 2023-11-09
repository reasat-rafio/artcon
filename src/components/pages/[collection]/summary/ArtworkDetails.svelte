<script lang="ts">
  import { getCountryDetails } from '@/lib/helper';
  import type { Information } from '@/lib/types/collection-detail.types';
  import type { Cta } from '@/lib/types/common.types';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { DateTime } from 'luxon';
  import { twMerge } from 'tailwind-merge';
  import Slider from './Slider.svelte';
  import Info from './Info.svelte';

  interface Artist {
    name: string;
    born: string;
    country: string;
  }

  export let artworkName: string;
  export let artist: Artist;
  export let information: Information;
  export let artworkImages: SanityImageAssetDocument[];
  export let inquiryButton: Cta;
</script>

<section
  class={twMerge(
    'grid w-full grid-cols-12 gap-[1.25rem] sm:gap-[2.5rem] xl:gap-[3.125rem] xl:pr-[9.69rem]',
    $$props.class,
  )}>
  <div
    class="col-span-12 space-y-[2.5rem] lg:col-span-5 lg:space-y-[3.75rem] xl:col-span-4">
    <div>
      <h3 class="head-xl">
        {artist.name}
        <span class="body-2 font-optiberling-agency font-light">
          b. {DateTime.fromISO(artist.born).toFormat('yyyy')}
        </span>
      </h3>

      <span class="body-2 font-optiberling-agency font-light uppercase">
        {getCountryDetails(artist.country).name}
      </span>
    </div>

    <Info class="hidden lg:block" {artworkName} {information} {inquiryButton} />
  </div>
  <div class="col-span-12 lg:col-span-7 xl:col-span-8 max-lg:space-y-[2.5rem]">
    <Slider {artworkImages} />

    <Info class="block lg:hidden" {artworkName} {information} {inquiryButton} />
  </div>
</section>
