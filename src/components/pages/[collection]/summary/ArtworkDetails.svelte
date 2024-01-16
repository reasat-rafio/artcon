<script lang="ts">
  import { getCountryDetails } from '@/lib/helper';
  import type { Information } from '@/lib/types/collection-detail.types';
  import type { Cta } from '@/lib/types/common.types';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { DateTime } from 'luxon';
  import Slider from './Slider.svelte';
  import Info from './Info.svelte';
  import { cn } from '@/lib/cn';

  interface Artist {
    name: string;
    born: string;
    country: string;
  }

  export let artworkName: string;
  export let artist: Artist;
  export let information: Information;
  export let artworkImages: SanityImageAssetDocument[];
  export let hideInquiryButton: boolean = false;
</script>

<section class={cn('flex w-full flex-col lg:flex-row', $$props.class)}>
  <div class="w-full max-lg:pb-[2.5rem] lg:mr-[3.125rem] lg:w-[31.06%]">
    <div class="space-y-[0.63rem]">
      <h3 class="head-4">
        {artist.name}
        <span class="head-8 font-optiberling-agency font-light">
          ( b. {DateTime.fromISO(artist.born).toFormat('yyyy')})
        </span>
      </h3>

      <span class="head-8 font-optiberling-agency font-light uppercase">
        {getCountryDetails(artist.country).name}
      </span>
    </div>
    <Info
      class="mt-[3.75rem] hidden lg:block"
      {artworkName}
      {information}
      {hideInquiryButton} />
  </div>
  <div class="flex-1 xl:pr-[9.69rem]">
    <Slider {artworkImages} />
    <Info
      class="block lg:hidden"
      {artworkName}
      {information}
      {hideInquiryButton} />
  </div>
</section>
