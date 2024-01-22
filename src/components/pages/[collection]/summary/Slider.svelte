<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import lightboxStore from '@/store/lightbox';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import Autoplay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte from 'embla-carousel-svelte';

  export let artworkImages: SanityImageAssetDocument[];

  function onClickAction(index: number) {
    lightboxStore.setLightboxVisibility(true);
    lightboxStore.setActiveIndex(index);
    lightboxStore.setAllImages(artworkImages);
  }
</script>

<div
  class="relative overflow-hidden"
  use:emblaCarouselSvelte={{ plugins: [Autoplay()], options: {} }}>
  <div class="-ml-[1rem] flex">
    {#each artworkImages as img, index}
      <button
        on:click={() => onClickAction(index)}
        class="flex flex-[0_0_100%] items-center justify-center pl-[1rem] lg:items-start lg:justify-end">
        <SanityImage
          lqip
          class="max-h-[53.75rem] w-full object-contain lg:w-fit"
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={img}
          imageUrlBuilder={imageBuilder} />
      </button>
    {/each}
    <div></div>
  </div>
</div>
