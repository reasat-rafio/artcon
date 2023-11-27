<script lang="ts" generics="T">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { cn } from '@/lib/cn';
  import { chunkArray } from '@/lib/helper';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';

  export let items: T[];
  export let axisOnMobile: 'x' | 'y' = 'x';

  export let loop = false;
  let innerWidth = 0;
  let containerEl: HTMLElement;
  let emblaApi: EmblaCarouselType;

  $: chunks = chunkArray(items, slidesNumber);
  $: slidesNumber =
    innerWidth >= 1280
      ? 6
      : innerWidth >= 768
      ? 4
      : axisOnMobile === 'y'
      ? 2
      : 1;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  const sectionInit = (node: HTMLElement, _: number) => {
    const chunksEL = node.querySelectorAll('.chunk');
    const firstGrandChild = (chunksEL[0] as HTMLElement)
      .childNodes[0] as HTMLElement;
    const grandChildHeight = firstGrandChild.clientHeight;

    if (containerEl && axisOnMobile === 'y') {
      containerEl.style.height =
        innerWidth < 768 ? `${grandChildHeight * 2}px` : 'auto';
    }

    return {
      update(_: number) {
        const grandChildHeight = (
          (chunksEL[0] as HTMLElement).childNodes[0] as HTMLElement
        ).clientHeight;

        if (containerEl && axisOnMobile === 'y') {
          containerEl.style.height =
            innerWidth < 768 ? `${grandChildHeight * 2}px` : 'auto';
        }
      },
    };
  };

  $: if (emblaApi)
    if (axisOnMobile === 'y')
      if (innerWidth >= 768) {
        emblaApi.reInit({ axis: 'x', loop });
      } else {
        emblaApi.reInit({ axis: 'y', loop });
      }
</script>

<svelte:window bind:innerWidth />
<section class="grid grid-cols-12">
  <div
    class="col-span-12 overflow-hidden"
    use:sectionInit={innerWidth}
    use:emblaCarouselSvelte={{
      plugins: [],
      options: { axis: 'x', loop },
    }}
    on:emblaInit={onInit}>
    <div
      bind:this={containerEl}
      class={cn({
        'ml-[-1.56rem] max-md:mt-[-1.56rem] md:flex': axisOnMobile === 'y',
        'ml-[-1.56rem] flex': axisOnMobile === 'x',
      })}>
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
    class="col-span-12 mt-[1rem] flex items-center justify-center space-x-[0.62rem] max-lg:mt-[2.38rem] lg:justify-end">
    {#if axisOnMobile === 'x'}
      <button on:click={() => emblaApi.scrollPrev()}>
        <ChevronLeftRounded />
      </button>
      <button on:click={() => emblaApi.scrollNext()}>
        <ChevronRightRounded />
      </button>
    {:else}
      <button
        class="rotate-90 md:rotate-0"
        on:click={() => emblaApi.scrollPrev()}>
        <ChevronLeftRounded />
      </button>
      <button
        class="rotate-90 md:rotate-0"
        on:click={() => emblaApi.scrollNext()}>
        <ChevronRightRounded />
      </button>
    {/if}
  </nav>
</section>
