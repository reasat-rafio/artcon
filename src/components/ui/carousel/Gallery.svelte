<script lang="ts" generics="T">
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel-svelte';
  import { twMerge } from 'tailwind-merge';
  import { chunkArray } from '@/lib/helper';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';

  export let items: T[];
  export let axiesOnMobile: 'x' | 'y' = 'x';

  let plugins: EmblaPluginType[] = [];
  let innerWidth = 0;
  let containerEl: HTMLElement;
  let emblaApi: EmblaCarouselType;
  let options: Partial<EmblaOptionsType> = {
    axis: 'x',
  };

  $: chunks = chunkArray(items, slidesNumber);
  $: slidesNumber =
    innerWidth >= 1280
      ? 6
      : innerWidth >= 768
      ? 4
      : axiesOnMobile === 'y'
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

    if (containerEl && axiesOnMobile === 'y') {
      containerEl.style.height =
        innerWidth < 768 ? `${grandChildHeight * 2}px` : 'auto';
    }

    return {
      update(_: number) {
        const grandChildHeight = (
          (chunksEL[0] as HTMLElement).childNodes[0] as HTMLElement
        ).clientHeight;

        if (containerEl && axiesOnMobile === 'y') {
          containerEl.style.height =
            innerWidth < 768 ? `${grandChildHeight * 2}px` : 'auto';
        }
      },
    };
  };

  $: if (emblaApi)
    if (axiesOnMobile === 'y')
      if (innerWidth >= 768) {
        emblaApi.reInit({ axis: 'x' });
      } else emblaApi.reInit({ axis: 'y' });
</script>

<svelte:window bind:innerWidth />

<section class="grid grid-cols-12">
  <div
    class={twMerge('col-span-12 overflow-hidden lg:col-span-11')}
    use:sectionInit={innerWidth}
    use:emblaCarouselSvelte={{ plugins, options }}
    on:emblaInit={onInit}
  >
    <div
      bind:this={containerEl}
      class={twMerge(
        axiesOnMobile === 'y' && 'max-md:mt-[-20px] md:ml-[-20px] md:flex',
        axiesOnMobile === 'x' && 'ml-[-20px] flex',
      )}
    >
      {#each chunks as chunk}
        <div
          class={twMerge(
            'chunk relative col-span-2 grid flex-[0_0_100%] grid-cols-1  md:grid-cols-2 md:gap-y-[56px] xl:grid-cols-3 ',
            axiesOnMobile === 'y' && '',
            $$props.class,
          )}
        >
          <slot {chunk} api={emblaApi} />
        </div>
      {/each}
    </div>
  </div>
  <nav
    class="col-span-12 flex items-center justify-center max-lg:mt-[2.38rem] max-lg:space-x-[0.62rem] lg:col-span-1"
  >
    {#if axiesOnMobile === 'x'}
      <button class="block lg:hidden" on:click={() => emblaApi.scrollPrev()}>
        <ChevronLeftRounded />
      </button>
      <button on:click={() => emblaApi.scrollNext()}>
        <ChevronRightRounded />
      </button>
    {:else}
      <button
        class="rotate-90 md:rotate-0"
        on:click={() => emblaApi.scrollNext()}
      >
        <ChevronRightRounded />
      </button>
    {/if}
  </nav>
</section>
