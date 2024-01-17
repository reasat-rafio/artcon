<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import lightboxStore from '@/store/lightbox';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { type EmblaCarouselType } from 'embla-carousel';

  export let sliderApi: EmblaCarouselType;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    sliderApi = event.detail;
  };
</script>

<div
  class="relative w-full flex-1 overflow-hidden"
  use:emblaCarouselSvelte={{
    options: {
      startIndex: $lightboxStore.activeIndex,
      watchResize: true,
    },
    plugins: [],
  }}
  on:emblaInit={onInit}>
  <div class="flex h-full w-full items-center gap-x-[1.25rem]">
    {#each $lightboxStore.allImages as img}
      <div
        class="relative flex aspect-video w-full flex-[0_0_100%] cursor-grab flex-col overflow-hidden active:cursor-grabbing">
        <SanityImage
          lqip
          class="h-full w-full rounded-lg object-cover"
          sizes="100vw"
          src={img}
          imageUrlBuilder={imageBuilder}
          alt={img.alt} />

        {#if !!img?.caption}
          <span class="caption !text-rich-black">{img.caption}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
