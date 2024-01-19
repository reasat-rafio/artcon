<script lang="ts" generics="T">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';

  import { cn } from '@/lib/cn';
  import { chunkArray } from '@/lib/helper';
  import type { EmblaCarouselType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { slide } from 'svelte/transition';
  import ChevronLeftRounded from '../icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '../icons/ChevronRightRounded.svelte';

  export let newsAndMedia: T[];

  let innerWidth = 0;
  let emblaApi: EmblaCarouselType;
  let carouselCanScrollPrev: boolean;
  let carouselCanScrollNext: boolean;

  $: slidesNumber =
    innerWidth >= 1536 ? 6 : innerWidth >= 1280 ? 4 : innerWidth >= 768 ? 2 : 1;
  $: chunks = chunkArray(newsAndMedia, slidesNumber);
  $: if (emblaApi) {
    emblaApi.on(
      'select',
      ({ canScrollNext, canScrollPrev }: EmblaCarouselType) => {
        carouselCanScrollNext = canScrollNext();
        carouselCanScrollPrev = canScrollPrev();
      },
    );
    emblaApi.on(
      'resize',
      ({ canScrollNext, canScrollPrev }: EmblaCarouselType) => {
        carouselCanScrollNext = canScrollNext();
        carouselCanScrollPrev = canScrollPrev();
      },
    );
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    carouselCanScrollNext = event.detail.canScrollNext();
    carouselCanScrollPrev = event.detail.canScrollPrev();
  };

  const scrollPrev = () => emblaApi.scrollPrev();
  const scrollNext = () => emblaApi.scrollNext();
</script>

<svelte:window bind:innerWidth />
<div use:parallaxAnimation class={cn('translate-y-[120px]', $$props.class)}>
  <div id="news-and-media-slider">
    <div
      class="overflow-hidden"
      on:emblaInit={onInit}
      use:emblaCarouselSvelte={{
        plugins: [],
        options: { axis: 'x' },
      }}>
      <div class="ml-[-1.56rem] flex">
        {#each chunks as chunk}
          <div
            class="relative grid flex-[0_0_100%] grid-cols-1 md:grid-cols-2 md:gap-y-[3.5rem] 2xl:grid-cols-3">
            <slot {chunk} />
          </div>
        {/each}
      </div>
    </div>

    <nav
      class="mt-[2.38rem] flex h-full items-center justify-center lg:mt-[1.57rem] lg:justify-end">
      {#if carouselCanScrollPrev}
        <button
          aria-label="Scroll to previous slide"
          class:mr-[.31rem]={carouselCanScrollNext}
          transition:slide={{ axis: 'x' }}
          on:click={scrollPrev}>
          <ChevronLeftRounded />
        </button>
      {/if}

      {#if carouselCanScrollNext}
        <button
          aria-label="Scroll to next slide"
          class:ml-[.31rem]={carouselCanScrollNext}
          transition:slide={{ axis: 'x' }}
          on:click={scrollNext}>
          <ChevronRightRounded />
        </button>
      {/if}
    </nav>
  </div>
</div>
