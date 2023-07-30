<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import AutoPlay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel-svelte';

  export let artworks: SanityAsset[];

  let emblaApi: EmblaCarouselType;

  let plugins: EmblaPluginType[] = [];
  let options: Partial<EmblaOptionsType> = { loop: true };
  let activeSide = 0;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap, reInit }) => {
      activeSide = selectedScrollSnap();
    });
  }
</script>

<div class="{$$props.class} ?">
  <div
    class="overflow-hidden"
    use:emblaCarouselSvelte={{ plugins, options }}
    on:emblaInit={onInit}
  >
    <div class="flex w-full">
      <!-- {#each artworks as artwork, index}
        <figure
          class="embla__slide mr-[29px] flex-[0_0_auto] {index ===
          activeSide + 1
            ? 'max-w-[10%]'
            : 'max-w-[50%]'} "
        >
          <SanityImage
            class="object-cover w-full h-full"
            sizes="60vw"
            src={artwork}
            imageUrlBuilder={imageBuilder}
          />
        </figure>
      {/each} -->
    </div>
  </div>
</div>

<style>
</style>
