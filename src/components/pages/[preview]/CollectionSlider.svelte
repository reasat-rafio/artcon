<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import lightboxStore from '@/store/lightbox';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import Autoplay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte from 'embla-carousel-svelte';

  export let artworkImages: SanityImageAssetDocument[];
</script>

<div
  data-load-animate="y"
  use:emblaCarouselSvelte={{ plugins: [Autoplay()], options: { loop: true } }}
  class="relative mb-[2rem] w-full overflow-hidden">
  <div class="-ml-[1rem] flex">
    {#each artworkImages as img, index}
      <button
        on:click|preventDefault={() => {
          lightboxStore.setLightboxVisibility(true);
          lightboxStore.setActiveIndex(index);
          lightboxStore.setHideThumbnails(false);
          lightboxStore.setAllImages(artworkImages);
        }}
        class="flex aspect-video flex-[0_0_100%] items-start justify-center pl-[1rem]">
        <SanityImage
          class="object-contain h-full w-fit"
          src={img}
          imageUrlBuilder={imageBuilder}
          sizes="70vw"
          alt="Artwork" />
      </button>
    {/each}
  </div>
</div>
