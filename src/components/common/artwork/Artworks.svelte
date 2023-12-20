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
  let scrollSnaps: number[];

  $: if (emblaApi) {
    const notEnoughToLoop = !emblaApi.internalEngine().slideLooper.canLoop();
    if (notEnoughToLoop) {
      emblaApi.reInit();
    }

    emblaApi.on(
      'select',
      ({ selectedScrollSnap, scrollSnapList }: EmblaCarouselType) => {
        activeSide = selectedScrollSnap() + 1;
        scrollSnaps = scrollSnapList();
      },
    );
    emblaApi.on(
      'resize',
      ({ selectedScrollSnap, scrollSnapList }: EmblaCarouselType) => {
        activeSide = selectedScrollSnap() + 1;
        scrollSnaps = scrollSnapList();
      },
    );
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    scrollSnaps = event.detail.scrollSnapList();
  };
</script>

<div class={cn('grid grid-cols-12', $$props.class)}>
  <div class={'col-span-12 lg:col-span-11'}>
    <div
      class="relative overflow-hidden"
      use:emblaCarouselSvelte={{
        options: {
          align: 'start',
          loop: true,
          active: artworks?.length > 1,
        },
        plugins: [AutoPlay({ stopOnInteraction: true })],
      }}
      on:emblaInit={onInit}>
      <div class="flex items-center max-lg:ml-[-1.25rem]">
        {#each artworks as artwork, index}
          <Image
            {...artwork}
            length={artworks.length}
            isSingleArtwork={artworks?.length === 1}
            active={activeSide === index ||
              (activeSide === artworks.length && index === 0)} />
        {/each}
      </div>
    </div>
  </div>
  {#if artworks?.length > 1}
    <nav
      class="col-span-12 flex items-center justify-center max-lg:mt-[2rem] max-lg:space-x-[0.62rem] lg:col-span-1 lg:flex-col lg:space-y-[0.62rem]">
      <button on:click={() => emblaApi.scrollPrev()}>
        <ChevronLeftRounded />
      </button>
      <button on:click={() => emblaApi.scrollNext()}>
        <ChevronRightRounded />
      </button>
    </nav>
  {/if}
</div>
