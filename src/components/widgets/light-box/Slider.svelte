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
      {@const url = imageBuilder
        .image(img)
        .withOptions({ auto: 'format' })
        .maxWidth(1920)
        .url()}
      <div
        class="flex h-full w-full flex-[0_0_100%] items-center justify-center">
        <figure class="h-fit w-fit sm:h-full">
          <SanityImage
            lqip
            sizes="100vw"
            class="aspect-auto h-[95%] rounded-[1rem] object-contain"
            src={img}
            imageUrlBuilder={imageBuilder} />

          {#if !!img?.caption}
            <figurecaption
              class="sub-title-light md:title-light mt-[0.69rem] block pl-[0.62rem] font-light text-white drop-shadow-2xl lg:pl-[1.88rem]">
              {img.caption}
            </figurecaption>
          {/if}
        </figure>
      </div>
    {/each}
  </div>
</div>
