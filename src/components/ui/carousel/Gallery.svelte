<script lang="ts" generics="T">
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

  $: chunks = chunkArray(items, slidesNumber);
  $: slidesNumber = innerWidth >= 1280 ? 6 : innerWidth >= 768 ? 4 : 2;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
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
    class="col-span-12 mt-[2.38rem] flex items-center justify-center space-x-[0.62rem] lg:mt-[1.55rem] lg:justify-end">
    <button on:click={() => emblaApi.scrollPrev()}>
      <ChevronLeftRounded />
    </button>
    <button on:click={() => emblaApi.scrollNext()}>
      <ChevronRightRounded />
    </button>
  </nav>
</section>
