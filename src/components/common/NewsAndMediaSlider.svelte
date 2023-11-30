<script lang="ts" generics="T">
  import { cn } from '@/lib/cn';
  import { chunkArray } from '@/lib/helper';
  import type { EmblaCarouselType } from 'embla-carousel-svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { scale } from 'svelte/transition';
  import ChevronLeftRounded from '../icons/ChevronLeftRounded.svelte';
  import ChevronRightLongRounded from '../icons/ChevronRightLongRounded.svelte';
  import ChevronRightRounded from '../icons/ChevronRightRounded.svelte';

  export let leftPos = 0;
  export let newsAndMedia: T[];

  let innerWidth = 0;
  let emblaApi: EmblaCarouselType;
  let carouselCanScrollPrev: boolean;
  let carouselCanScrollNext: boolean;

  $: slidesNumber =
    innerWidth >= 1536 ? 6 : innerWidth >= 1280 ? 4 : innerWidth >= 768 ? 2 : 1;
  $: chunks = chunkArray(newsAndMedia, slidesNumber);
  $: if (emblaApi) {
    emblaApi.on('select', ({ canScrollNext, canScrollPrev }) => {
      carouselCanScrollNext = canScrollNext();
      carouselCanScrollPrev = canScrollPrev();
    });
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
<div class={cn($$props.class)}>
  <div
    id="news-and-media-slider"
    style="--leftPos: {leftPos}px"
    class="flex max-w-[85.3rem] flex-col items-center max-lg:px-[1rem] max-md:mx-auto md:mr-[1rem] xl:flex-row xl:gap-x-[2rem] 2xl:gap-x-[4.375rem]">
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

    <nav class="flex h-full items-center justify-center">
      <div class="hidden xl:block">
        {#if carouselCanScrollPrev}
          <button transition:scale class="rotate-180" on:click={scrollPrev}>
            <ChevronRightLongRounded />
          </button>
        {/if}
        {#if carouselCanScrollNext}
          <button transition:scale on:click={scrollNext}>
            <ChevronRightLongRounded />
          </button>
        {/if}
      </div>

      <div class="mt-[2.38rem] block space-x-[0.62rem] xl:hidden">
        <button on:click={scrollPrev}>
          <ChevronLeftRounded />
        </button>
        <button on:click={scrollNext}>
          <ChevronRightRounded />
        </button>
      </div>
    </nav>
  </div>
</div>

<style>
  @media screen and (min-width: 768px) {
    #news-and-media-slider {
      margin-left: var(--leftPos);
    }
  }
</style>
