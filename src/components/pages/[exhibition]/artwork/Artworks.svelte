<script lang="ts">
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import AutoPlay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel-svelte';
  import Image from './Image.svelte';

  export let artworks: SanityAsset[];
  let emblaApi: EmblaCarouselType;

  let plugins: EmblaPluginType[] = [AutoPlay()];
  let options: Partial<EmblaOptionsType> = {
    align: 'start',
    loop: true,
  };
  let activeSide = 1;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }) => {
      activeSide = selectedScrollSnap() + 1;
    });
  }
</script>

<div class="{$$props.class} w-[85%]">
  <div
    class="relative overflow-hidden"
    use:emblaCarouselSvelte={{ plugins, options }}
    on:emblaInit={onInit}
  >
    <div class="flex">
      {#each artworks as artwork, index}
        <Image
          {artwork}
          active={activeSide === index ||
            (activeSide === artworks.length && index === 0)}
        />
      {/each}
    </div>
  </div>
</div>
