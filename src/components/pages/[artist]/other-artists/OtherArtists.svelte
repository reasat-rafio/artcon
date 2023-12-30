<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { chunkArray } from '@/lib/helper';
  import type { OtherArtists } from '@/lib/types/artist-detail.types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import Card from './Card.svelte';
  import { slide } from 'svelte/transition';

  export let artists: OtherArtists[];

  let emblaApi: EmblaCarouselType;
  let innerWidth = 0;
  let selectedSnap = 1;
  let carouselCanScrollPrev: boolean;
  let carouselCanScrollNext: boolean;

  $: slidesNumber =
    innerWidth >= 1280 ? 8 : innerWidth >= 1024 ? 6 : innerWidth >= 768 ? 4 : 2;
  $: chunksOfArtists = chunkArray(artists, slidesNumber);
  $: if (emblaApi) {
    emblaApi.on(
      'select',
      ({
        selectedScrollSnap,
        canScrollNext,
        canScrollPrev,
      }: EmblaCarouselType) => {
        selectedSnap = selectedScrollSnap();
        carouselCanScrollNext = canScrollNext();
        carouselCanScrollPrev = canScrollPrev();
      },
    );
    emblaApi.on(
      'resize',
      ({
        selectedScrollSnap,
        canScrollNext,
        canScrollPrev,
      }: EmblaCarouselType) => {
        selectedSnap = selectedScrollSnap();
        carouselCanScrollNext = canScrollNext();
        carouselCanScrollPrev = canScrollPrev();
      },
    );
  }

  const scrollPrev = () => emblaApi.scrollPrev();
  const scrollNext = () => emblaApi.scrollNext();
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    selectedSnap = event.detail.selectedScrollSnap();
    carouselCanScrollNext = event.detail.canScrollNext();
    carouselCanScrollPrev = event.detail.canScrollPrev();
  };
</script>

<svelte:window bind:innerWidth />
<section
  class="container-primary pb-section border-t border-light-gray/40 pt-[2.26rem]">
  <h3 class="head-xl mb-md">Other artists</h3>
  <div
    class="relative overflow-hidden md:mx-[2rem] 2xl:mx-[4.87rem]"
    use:emblaCarouselSvelte={{ plugins: [], options: {} }}
    on:emblaInit={onInit}>
    <div class="flex">
      {#each chunksOfArtists as chunk}
        <div
          class="grid flex-[0_0_100%] grid-cols-1 gap-x-[1.25rem] gap-y-[3.38rem] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {#each chunk as { artistPortrait, name, slug, tag }}
            <Card
              el="a"
              url="/artist/{slug.current}"
              image={artistPortrait}
              title={name}
              subtitle={tag.name} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
  <div
    class="mt-[2.31rem] flex items-center justify-between md:pr-[2rem] 2xl:pr-[4.87rem]">
    <div>
      <nav>
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
    <span
      class="text-[0.75rem] font-light !leading-none tracking-[0.015rem] text-quartz-silver">
      {selectedSnap + 1}/{chunksOfArtists.length}
    </span>
  </div>
</section>
