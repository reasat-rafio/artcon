<script lang="ts">
  import type { CommonHeroListProps } from '@/lib/types/common.types';
  import Navigation from './Navigation.svelte';
  import Block from './block/Block.svelte';

  import ChevronDown from '@/components/icons/ChevronDown.svelte';
  import { useDebounce } from '@/lib/helper';
  import Autoplay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import ScrollIndicator from '../hero/ScrollIndicator.svelte';

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
    emblaApi.on('scroll', (e: EmblaCarouselType) => {
      const direction = DIRECTION_MAP[String(readDirection(e)) as '-1' | '1'];
      scrollDirection = direction as 'forward' | 'backward';
      activeBlockIndex = e.selectedScrollSnap();
    });
  }
</script>

<section bind:this={rootEl} class="fixed inset-0 h-screen w-full">
  <div
    class="overflow-hidden"
    on:emblaInit={onInit}
    use:emblaCarouselSvelte={{
      plugins: [Autoplay({ active: false })],
      options: { loop: true, duration: 30, active: blocks?.length > 1 },
    }}>
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
    on:slidePrev={() => useDebounce(() => emblaApi.scrollPrev(), DEBOUNCH_TIME)}
    blocksLength={blocks.length} />

  <ScrollIndicator class="opacity-100" />
</section>
