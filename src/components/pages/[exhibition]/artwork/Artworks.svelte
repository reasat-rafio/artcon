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
  import { twMerge } from 'tailwind-merge';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';

  type Artworks = ExhinitionDetailPageProps['artworks'];
  export let artworks: Artworks;
  let emblaApi: EmblaCarouselType;

  let activeSide = 1;
  let plugins: EmblaPluginType[] = [AutoPlay({ stopOnInteraction: true })];
  let options: Partial<EmblaOptionsType> = {
    align: 'start',
    loop: true,
  };

  // $: modifedArtworks = flatenArtworkArray(artworks);
  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }) => {
      activeSide = selectedScrollSnap() + 1;
    });
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
  // const flatenArtworkArray = (artworks: Artworks): SanityAsset[] =>
  //   artworks.flatMap(({ artworkImages }) =>
  //     artworkImages.flatMap((artwork) => artwork),
  //   );
</script>

<div class={twMerge('grid  grid-cols-12', $$props.class)}>
  <div class={'col-span-12 lg:col-span-11'}>
    <div
      class="relative overflow-hidden"
      use:emblaCarouselSvelte={{ plugins, options }}
      on:emblaInit={onInit}
    >
      <div class="flex items-center max-lg:ml-[-1.25rem]">
        {#each artworks as artwork, index}
          <Image
            {...artwork}
            active={activeSide === index ||
              (activeSide === artworks.length && index === 0)}
          />
        {/each}
      </div>
    </div>
  </div>
  <div
    class="col-span-12 flex items-center justify-center max-lg:mt-[2rem] max-lg:space-x-[0.62rem] lg:col-span-1 lg:flex-col lg:space-y-[0.62rem]"
  >
    <button on:click={() => emblaApi.scrollPrev()}>
      <ChevronLeftRounded />
    </button>
    <button on:click={() => emblaApi.scrollNext()}>
      <ChevronRightRounded />
    </button>
  </div>
</div>
