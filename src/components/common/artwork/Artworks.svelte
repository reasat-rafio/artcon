<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import AutoPlay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import Image from './Image.svelte';
  import type { ShortArtworks } from '@/lib/types/common.types';
  import { cn } from '@/lib/cn';

  export let artworks: ShortArtworks[];

  let emblaApi: EmblaCarouselType;
  let activeSide = 1;
  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }) => {
      activeSide = selectedScrollSnap() + 1;
    });
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<div class={cn('grid  grid-cols-12', $$props.class)}>
  <div class={'col-span-12 lg:col-span-11'}>
    <div
      class="relative overflow-hidden"
      use:emblaCarouselSvelte={{
        options: {
          align: 'start',
          loop: true,
        },
        plugins: [AutoPlay({ stopOnInteraction: true, active: false })],
      }}
      on:emblaInit={onInit}>
      <div class="flex items-center max-lg:ml-[-1.25rem]">
        {#each artworks as artwork, index}
          <Image
            {...artwork}
            isSingleArtwork={artworks?.length === 1}
            active={activeSide === index ||
              (activeSide === artworks.length && index === 0)} />
        {/each}
      </div>
    </div>
  </div>
  <nav
    class="col-span-12 flex items-center justify-center max-lg:mt-[2rem] max-lg:space-x-[0.62rem] lg:col-span-1 lg:flex-col lg:space-y-[0.62rem]">
    <button on:click={() => emblaApi.scrollPrev()}>
      <ChevronLeftRounded />
    </button>
    <button on:click={() => emblaApi.scrollNext()}>
      <ChevronRightRounded />
    </button>
  </nav>
</div>
