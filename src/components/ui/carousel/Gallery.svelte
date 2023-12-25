<script lang="ts" generics="T">
  import { slide } from 'svelte/transition';

  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { cn } from '@/lib/cn';
  import { chunkArray } from '@/lib/helper';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';

  export let items: T[];
  export let loop = false;

  let innerWidth = 0;
  let containerEl: HTMLElement;
  let emblaApi: EmblaCarouselType;
  let carouselCanScrollPrev: boolean;
  let carouselCanScrollNext: boolean;

  $: chunks = chunkArray(items, slidesNumber);
  $: slidesNumber = innerWidth >= 1280 ? 6 : innerWidth >= 768 ? 4 : 2;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    carouselCanScrollNext = event.detail.canScrollNext();
    carouselCanScrollPrev = event.detail.canScrollPrev();
  };

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

  const scrollPrev = () => emblaApi.scrollPrev();
  const scrollNext = () => emblaApi.scrollNext();
</script>

<svelte:window bind:innerWidth />
<section class="grid grid-cols-12">
  <div
    class="col-span-12 overflow-hidden"
    use:emblaCarouselSvelte={{
      plugins: [],
      options: { axis: 'x', loop },
    }}
    on:emblaInit={onInit}>
    <div bind:this={containerEl} class="ml-[-1.56rem] flex">
      {#each chunks as chunk}
        <div
          class={cn(
            'chunk relative col-span-2 grid flex-[0_0_100%] grid-cols-1 md:grid-cols-2 md:gap-y-[1.563rem] xl:grid-cols-3',
            $$props.class,
          )}>
          <slot {chunk} api={emblaApi} />
        </div>
      {/each}
    </div>
  </div>
  <nav
    class="col-span-12 mt-[2.38rem] flex items-center justify-center lg:mt-[1.55rem] lg:justify-end">
    {#if carouselCanScrollPrev}
      <button
        class:mr-[.31rem]={carouselCanScrollNext}
        transition:slide={{ axis: 'x' }}
        on:click={scrollPrev}>
        <ChevronLeftRounded />
      </button>
    {/if}

    {#if carouselCanScrollNext}
      <button
        class:ml-[.31rem]={carouselCanScrollNext}
        transition:slide={{ axis: 'x' }}
        on:click={scrollNext}>
        <ChevronRightRounded />
      </button>
    {/if}
  </nav>
</section>
