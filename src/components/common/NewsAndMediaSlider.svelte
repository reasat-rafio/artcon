<script lang="ts" generics="T">
  import ChevronRightRounded from '../icons/ChevronRightRounded.svelte';

  import ChevronLeftRounded from '../icons/ChevronLeftRounded.svelte';

  import { cn } from '@/lib/cn';
  import { chunkArray } from '@/lib/helper';
  import type { EmblaCarouselType } from 'embla-carousel-svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';

  export let leftPos = 0;
  export let newsAndMedia: T[];

  let innerWidth = 0;
  let emblaApi: EmblaCarouselType;

  $: slidesNumber =
    innerWidth >= 1536 ? 6 : innerWidth >= 1280 ? 4 : innerWidth >= 768 ? 2 : 1;
  $: chunks = chunkArray(newsAndMedia, slidesNumber);

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
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
        options: { axis: 'x', loop: true },
      }}>
      <div class="flex md:ml-[-1.56rem]">
        {#each chunks as chunk}
          <div
            class="relative grid flex-[0_0_100%] grid-cols-1 md:grid-cols-2 md:gap-y-[3.5rem] 2xl:grid-cols-3">
            <slot {chunk} />
          </div>
        {/each}
      </div>
    </div>

    <nav class="flex h-full items-center justify-center">
      <button class="hidden xl:block" on:click={() => emblaApi.scrollNext()}>
        <svg
          class="h-[2.8125rem] w-[2.8125rem] transition-transform duration-500 hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="46"
          viewBox="0 0 45 46"
          fill="none">
          <path
            d="M23.2334 17.6719L22.4977 18.4234L27.0066 23.0588H17V24.1346H27.0066L22.4977 28.778L23.2334 29.5295L29 23.5967L23.2334 17.6719Z"
            fill="#252525" />
          <circle cx="22.5" cy="23.1719" r="22" stroke="#C0C0C0" />
        </svg>
      </button>
      <div class="mt-[2.38rem] block space-x-[0.62rem] xl:hidden">
        <button on:click={() => emblaApi.scrollPrev()}>
          <ChevronLeftRounded />
        </button>
        <button on:click={() => emblaApi.scrollNext()}>
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
