<script lang="ts">
  import { cn } from '@/lib/cn';
  import type { ArtworkItem } from '@/lib/types/common.types';
  // import PortableText from '@/lib/portable-text/PortableText.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { type EmblaCarouselType } from 'embla-carousel';
  import ArtworkItemImage from './ArtworkItemImage.svelte';

  export let artworks: ArtworkItem[];

  let className = '';
  export { className as class };

  let emblaApi: EmblaCarouselType;
  let activeSide = 1;
  let scrollSnaps: number[];

  $: if (emblaApi) {
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

<div class={cn('relative', className)}>
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
          <ArtworkItemImage
            {artwork}
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
      <button
        aria-label="Scroll to next slide"
        on:click={() => emblaApi.scrollNext()}>
        <ChevronRightRounded />
      </button>
    </nav>
  {/if}
</div>
