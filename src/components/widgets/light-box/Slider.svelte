<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import lightboxStore from '@/store/lightbox';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';

  export let sliderApi: EmblaCarouselType;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    sliderApi = event.detail;
  };
</script>

<div
  class="relative w-full flex-1 overflow-hidden py-[50px]"
  use:emblaCarouselSvelte={{
    options: {
      startIndex: $lightboxStore.activeIndex,
    },
    plugins: [],
  }}
  on:emblaInit={onInit}>
  <div class="ml-[-1.25rem] flex h-full w-full">
    {#each $lightboxStore.allImages as img}
      <div class="relative flex h-full flex-[0_0_100%] pl-[1.25rem]">
        <SanityImage
          lqip
          class="h-full w-full rounded-lg object-cover"
          sizes="100vw"
          src={img}
          imageUrlBuilder={imageBuilder}
          alt={img.alt} />
      </div>
    {/each}
  </div>
</div>
