<script lang="ts">
  import type { CommonHeroListProps } from '@/lib/types/common.types';
  import Navigation from './Navigation.svelte';
  import Block from './block/Block.svelte';

  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { useDebounce } from '@/lib/helper';

  type WheelEventType = WheelEvent & {
    currentTarget: EventTarget & HTMLElement;
  };

  export let props: CommonHeroListProps;
  let { blocks } = props;
  let rootEl: HTMLElement;
  let emblaApi: EmblaCarouselType;
  let scrollDirection: 'forward' | 'backward';
  let activeBlockIndex = 0;
  const DEBOUNCH_TIME = 200;
  const DIRECTION_MAP = {
    '-1': 'forward',
    '1': 'backward',
  };

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  const readDirection = (embla: EmblaCarouselType) => {
    const { target, location } = embla.internalEngine();
    const diffToTarget = target.get() - location.get();
    return Math.sign(diffToTarget);
  };

  $: if (emblaApi) {
    emblaApi.on('scroll', (e) => {
      const direction = DIRECTION_MAP[String(readDirection(e)) as '-1' | '1'];
      scrollDirection = direction as 'forward' | 'backward';
      activeBlockIndex = e.selectedScrollSnap();
    });
  }
  const onMouseWheelAction = (e: WheelEventType) => {
    e.deltaY > 0 ? emblaApi.scrollNext() : emblaApi.scrollPrev();
  };
</script>

<section bind:this={rootEl} class=" relative">
  <!--   on:wheel|preventDefault|stopPropagation={(e) =>
      useDebounce(() => onMouseWheelAction(e), DEBOUNCH_TIME)} -->
  <div
    class="overflow-hidden"
    on:emblaInit={onInit}
    use:emblaCarouselSvelte={{
      plugins: [],
      options: { loop: true, duration: 30 },
    }}
  >
    <div class="flex">
      {#each blocks as block, index}
        <Block {index} {block} {activeBlockIndex} {scrollDirection} />
      {/each}
    </div>
  </div>

  <Navigation
    {scrollDirection}
    {activeBlockIndex}
    on:slideNext={() => useDebounce(() => emblaApi.scrollNext(), DEBOUNCH_TIME)}
    on:sliedPrev={() => useDebounce(() => emblaApi.scrollPrev(), DEBOUNCH_TIME)}
    blocksLength={blocks.length}
  />
</section>
