<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { chunkArray } from '@/lib/helper';
  import type { OtherArtists } from '@/lib/types/artist-detail.types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import Card from './Card.svelte';

  export let artists: OtherArtists[];

  let emblaApi: EmblaCarouselType;
  let innerWidth = 0;
  let selectedSnap = 1;

  $: slidesNumber =
    innerWidth >= 1280 ? 8 : innerWidth >= 1024 ? 6 : innerWidth >= 768 ? 4 : 2;

  $: chunksOfArtists = chunkArray(artists, slidesNumber);

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    selectedSnap = event.detail.selectedScrollSnap();
  };

  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap, scrollSnapList }) => {
      selectedSnap = selectedScrollSnap();
    });
  }
</script>

<svelte:window bind:innerWidth />
<section
  class="container-primary pb-section border-t border-[#A5A5A8] pt-[2.26rem]">
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
    <nav>
      <div class="space-x-[0.62rem] lg:space-x-[0.3rem]">
        <button class="bg-white" on:click={() => emblaApi.scrollPrev()}>
          <ChevronLeftRounded />
        </button>
        <button on:click={() => emblaApi.scrollNext()}>
          <ChevronRightRounded />
        </button>
      </div>
    </nav>
    <span
      class="text-[0.75rem] font-light !leading-none tracking-[0.015rem] text-[#4A4A51]">
      {selectedSnap + 1}/{chunksOfArtists.length}
    </span>
  </div>
</section>
