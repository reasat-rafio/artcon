<script lang="ts">
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import AutoPlay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel-svelte';
  import Image from './Image.svelte';
  import type { ExhinitionDetailPageProps } from '@/lib/types/exhibitionDetail.types';

  type Artworks = ExhinitionDetailPageProps['artworks'];
  export let artworks: Artworks;
  let emblaApi: EmblaCarouselType;

  let activeSide = 1;
  let plugins: EmblaPluginType[] = [AutoPlay()];
  let options: Partial<EmblaOptionsType> = {
    align: 'start',
    loop: true,
  };

  $: modifedArtworks = flatenArtworkArray(artworks);
  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }) => {
      activeSide = selectedScrollSnap() + 1;
    });
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
  const flatenArtworkArray = (artworks: Artworks): SanityAsset[] =>
    artworks.flatMap(({ artworkImages }) =>
      artworkImages.flatMap((artwork) => artwork),
    );
</script>

<div class="{$$props.class} w-[85%]">
  <div
    class="relative overflow-hidden"
    use:emblaCarouselSvelte={{ plugins, options }}
    on:emblaInit={onInit}
  >
    <div class="flex">
      {#each modifedArtworks as artwork, index}
        <Image
          {artwork}
          active={activeSide === index ||
            (activeSide === modifedArtworks.length && index === 0)}
        />
      {/each}
    </div>
  </div>
</div>
