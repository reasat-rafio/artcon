<script lang="ts">
  import type { CommonHeroListProps } from '@/lib/types/common.types';
  import Navigation from './Navigation.svelte';
  import Block from './block/Block.svelte';
  import { useDebounce } from '@/lib/helper';
  import Autoplay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import ScrollIndicator from '../hero/ScrollIndicator.svelte';
  import { onDestroy } from 'svelte';

  export let props: CommonHeroListProps;
  export let currentSlug: string | undefined = undefined;
  let { blocks } = props;
  let rootEl: HTMLElement;
  let emblaApi: EmblaCarouselType;
  let scrollDirection: 'forward' | 'backward';
  let activeBlockIndex = 0;
  let autoplayInstance: any;
  let hasStartedMoving = false;
  const DEBOUNCH_TIME = 200;
  const DIRECTION_MAP = {
    '-1': 'forward',
    '1': 'backward',
  };

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    
    autoplayInstance = emblaApi.plugins()?.autoplay;
    
    emblaApi.on('select', (e: EmblaCarouselType) => {
      const direction = DIRECTION_MAP[String(readDirection(e)) as '-1' | '1'];
      scrollDirection = direction as 'forward' | 'backward';
      activeBlockIndex = e.selectedScrollSnap();
      
      const currentIndex = e.selectedScrollSnap();
      
      if (currentIndex !== 0 && !hasStartedMoving) {
        hasStartedMoving = true;
      }
      
      if (currentIndex === 0 && hasStartedMoving) {
        autoplayInstance?.stop();
      }
    });
  };

  const readDirection = (embla: EmblaCarouselType) => {
    const { target, location } = embla.internalEngine();
    const diffToTarget = target.get() - location.get();
    return Math.sign(diffToTarget);
  };

  onDestroy(() => {
    autoplayInstance?.stop();
  });
</script>

<section bind:this={rootEl} class="fixed inset-0 h-screen w-full">
  <div
    class="overflow-hidden"
    on:emblaInit={onInit}
    use:emblaCarouselSvelte={{
      plugins: [Autoplay({ delay: 6000, stopOnInteraction: false })],
      options: { loop: true, duration: 30, active: blocks?.length > 1 },
    }}>
    <div class="flex">
      {#each blocks as block, index}
        <Block {index} {block} {activeBlockIndex} {scrollDirection} {currentSlug} />
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
