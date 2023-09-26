<script lang="ts" generics="T">
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel-svelte';
  import { twMerge } from 'tailwind-merge';
  import { chunkArray } from '@/lib/helper';

  export let items: T[];

  let plugins: EmblaPluginType[] = [];
  let innerWidth = 0;
  let options: Partial<EmblaOptionsType> = {};
  let containerEl: HTMLElement;

  $: slidesNumber = innerWidth >= 1280 ? 6 : innerWidth >= 768 ? 4 : 3;
  $: chunks = chunkArray(items, slidesNumber);

  let emblaApi: EmblaCarouselType;
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  const sectionInit = (node: HTMLElement, _: number) => {
    const chunksEL = node.querySelectorAll('.chunk');
    const firstGrandChild = (chunksEL[0] as HTMLElement)
      .childNodes[0] as HTMLElement;
    const grandChildHeight = firstGrandChild.clientHeight;

    if (containerEl) {
      containerEl.style.height =
        innerWidth < 768 ? `${grandChildHeight * 3}px` : 'auto';
    }

    return {
      update(_: number) {
        const grandChildHeight = (
          (chunksEL[0] as HTMLElement).childNodes[0] as HTMLElement
        ).clientHeight;

        if (containerEl) {
          containerEl.style.height =
            innerWidth < 768 ? `${grandChildHeight * 3}px` : 'auto';
        }
      },
    };
  };

  $: if (emblaApi)
    if (innerWidth >= 768) {
      emblaApi.reInit({ axis: 'x' });
    } else emblaApi.reInit({ axis: 'y' });
</script>

<svelte:window bind:innerWidth />

<div
  class={twMerge('overflow-hidden')}
  use:sectionInit={innerWidth}
  use:emblaCarouselSvelte={{ plugins, options }}
  on:emblaInit={onInit}
>
  <div bind:this={containerEl} class="max-md:mt-[-20px] md:ml-[-20px] md:flex">
    {#each chunks as chunk}
      <div
        class={twMerge(
          'chunk relative col-span-2 grid flex-[0_0_100%] grid-cols-1 gap-x-[25px] md:grid-cols-2 md:gap-y-[56px] xl:grid-cols-3 ',
          $$props.class,
        )}
      >
        <slot {chunk} api={emblaApi} />
      </div>
    {/each}
  </div>
</div>
