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
  let options: Partial<EmblaOptionsType> = {};
  let activeSide = 0;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  let progress = 0.5;
  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }) => {
      activeSide = selectedScrollSnap();

      const { limit, target, scrollProgress, scrollBody, scrollTo } =
        emblaApi.internalEngine();

      const currentProgress = scrollProgress.get(target.get());
      console.log(emblaApi.scrollProgress(), currentProgress);

      // const allowedProgress = Math.min(Math.max(progress, 0), 1);
      // const progressToTarget = allowedProgress - currentProgress;
      // const distance = progressToTarget * limit.length * -1;
      // scrollBody.useBaseDuration();
      // scrollTo.distance(distance, false);
    });
  }
</script>

<div class={$$props.class}>
  <div
    class="overflow-hidden"
    use:emblaCarouselSvelte={{ plugins, options }}
    on:emblaInit={onInit}
  >
    <div class="flex">
      {#each artworks as artwork, index}
        <figure
          class="relative h-[50vh] {activeSide === index
            ? 'flex-[0_0_60%]'
            : 'flex-[0_0_40%]'}"
        >
          <SanityImage
            class="h-full w-full object-cover"
            sizes="60vw"
            src={artwork}
            imageUrlBuilder={imageBuilder}
          />
        </figure>
      {/each}
    </div>
  </div>
</div>

<style>
</style>
