<script lang="ts">
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { cn } from '@/lib/cn';
  import type { ShortArtworks } from '@/lib/types/common.types';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { type EmblaCarouselType } from 'embla-carousel';
  import Autoplay from 'embla-carousel-autoplay';
  import { onDestroy } from 'svelte';
  import Image from './Image.svelte';
  import lightboxStore from '@/store/lightbox';

  export let artworks: ShortArtworks[];

  let emblaApi: EmblaCarouselType;
  let activeSide = 1;
  let scrollSnaps: number[];
  let autoplayInstance: any;
  let hasStartedMoving = false;

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
    autoplayInstance = emblaApi.plugins()?.autoplay;
    
    emblaApi.on('select', () => {
      const currentIndex = emblaApi.selectedScrollSnap();
      
      if (currentIndex !== 0 && !hasStartedMoving) {
        hasStartedMoving = true;
      }
      
      if (currentIndex === 0 && hasStartedMoving) {
        autoplayInstance?.stop();
      }
    });
  };

  onDestroy(() => {
    autoplayInstance?.stop();
  });

  const triggerLightboxPopup = (index: number) => {
    lightboxStore.setLightboxVisibility(true);
    lightboxStore.setActiveIndex(index);
    lightboxStore.setHideThumbnails(false);
    lightboxStore.setAllImages(
      artworks.map(
        ({
          artwork,
          information: { size, artDate, frame, media, moreInformation },
        }) => ({
          ...artwork,
          caption: `${size}, ${artDate?.creationDetails || ''}, ${frame}, ${media}, ${moreInformation?.map((e) => e).join(', ')}`,
        }),
      ),
    );
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
        plugins: [Autoplay({ delay: 6000, stopOnInteraction: false })],
      }}
      on:emblaInit={onInit}>
      <div class="ml-[-1.25rem] flex items-center">
        {#each artworks as artwork, index}
          <Image
            {...artwork}
            isSingleArtwork={artworks?.length === 1}
            on:triggerPopup={() => triggerLightboxPopup(index)}
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
