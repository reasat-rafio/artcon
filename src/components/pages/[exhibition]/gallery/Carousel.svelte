<script lang="ts">
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
  } from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { chunkArray } from '@/lib/helper';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';

  export let images: SanityAsset[];

  let imagesArray2D = chunkArray(images, 6);
  let emblaApi: EmblaCarouselType;
  let options: Partial<EmblaOptionsType> = { duration: 60 };
  let plugins = [
    Autoplay({
      delay: 6000,
    }),
  ];
  let canScrollNext = true;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  $: if (emblaApi) {
    emblaApi.on('select', (event) => (canScrollNext = event.canScrollNext()));
  }
</script>

<section class="relative">
  <button
    disabled={!canScrollNext}
    style=""
    class="absolute right-[-5%] top-1/2 -translate-y-1/2"
    on:click={() => {
      emblaApi.scrollNext();
    }}
  >
    <ChevronRightRounded class="h-[45px] w-[45px] " />
  </button>

  <div
    class="embla mb-xl"
    use:emblaCarouselSvelte={{ plugins, options }}
    on:emblaInit={onInit}
  >
    <div class="embla__container cursor-grab">
      {#each imagesArray2D as images}
        <div class="embla__slide grid grid-cols-3 gap-x-[25px] gap-y-[56px]">
          {#each images as img}
            <div class="max-h-[226px]">
              <SanityImage
                class="h-full w-full rounded-[12px] object-cover"
                sizes="30vw"
                src={img}
                alt={img.alt}
                imageUrlBuilder={imageBuilder}
              />
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    padding-right: 20px;
    min-width: 0;
  }
</style>
