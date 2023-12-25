<script lang="ts">
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { cn } from '@/lib/cn';
  import type { ShortArtworks } from '@/lib/types/common.types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import Image from './Image.svelte';

  export let artworks: ShortArtworks[];

  let emblaApi: EmblaCarouselType;
  let activeSide = 1;
  let scrollSnaps: number[];

  $: if (emblaApi) {
    emblaApi.on(
      'select',
      ({
        selectedScrollSnap,
        scrollSnapList,
        canScrollNext,
      }: EmblaCarouselType) => {
        activeSide = selectedScrollSnap() + 1;
        scrollSnaps = scrollSnapList();
        canScrollNext = canScrollNext();
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

<div class={cn('relative', $$props.class)}>
  <div class="xl:pr-[9.69rem]">
    <div
      class="relative overflow-hidden"
      use:emblaCarouselSvelte={{
        options: {
          align: 'start',
          loop: true,
        },
        plugins: [],
      }}
      on:emblaInit={onInit}>
      <div class="ml-[-1.25rem] flex items-center">
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
  {#if artworks?.length > 2}
    <nav
      class="mnax-lg:gap-y-[0.62rem] absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-center max-lg:mt-[2rem] lg:gap-x-[0.62rem]">
      <button on:click={() => emblaApi.scrollNext()}>
        <ChevronRightRounded />
      </button>
    </nav>
  {/if}
</div>
