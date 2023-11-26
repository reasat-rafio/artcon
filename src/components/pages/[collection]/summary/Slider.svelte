<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import Autoplay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte from 'embla-carousel-svelte';

  export let artworkImages: SanityImageAssetDocument[];
</script>

<div
  class="relative overflow-hidden"
  use:emblaCarouselSvelte={{ plugins: [Autoplay()], options: {} }}>
  <div class="-ml-[1rem] flex">
    {#each artworkImages as img}
      <figure
        class="flex flex-[0_0_100%] items-center justify-center pl-[1rem] lg:items-start lg:justify-end">
        <SanityImage
          class="max-h-[53.75rem] w-full object-contain lg:w-fit"
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={img}
          imageUrlBuilder={imageBuilder} />
      </figure>
    {/each}
    <div></div>
  </div>
</div>
