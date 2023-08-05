<script lang="ts">
  import { useDebounce } from '@/lib/helper';
  import type { CommonHeroListProps } from '@/lib/types/common.types';
  import Navigation from './Navigation.svelte';
  import Block from './block/Block.svelte';

  type WheelEventType = WheelEvent & {
    currentTarget: EventTarget & HTMLElement;
  };

  export let props: CommonHeroListProps;
  let { blocks } = props;

  let rootEl: HTMLElement;
  let scrollDirection: 'up' | 'down' = 'down';
  let blocksPositions = Array.from({ length: blocks.length }, (_, i) => i);

  const slideNext = () => {
    const firstPosition = blocksPositions.shift();
    blocksPositions.push(firstPosition as number);
    blocksPositions = blocksPositions;
  };

  const sliedPrev = () => {
    const lastPosition = blocksPositions.pop();
    blocksPositions.unshift(lastPosition as number);
    blocksPositions = blocksPositions;
  };

  const onMouseWheelAction = (e: WheelEventType) => {
    e.deltaY > 0 ? (scrollDirection = 'down') : (scrollDirection = 'up');
    if (scrollDirection === 'up') slideNext();
    else if (scrollDirection === 'down') sliedPrev();
  };

  $: activeBlockIndex = blocksPositions.indexOf(0);
  $: nextBlockIndex = blocksPositions[1];
  $: prevBlockIndex = blocksPositions[2];
</script>

<section
  bind:this={rootEl}
  on:wheel|preventDefault|stopPropagation={(e) =>
    useDebounce(() => onMouseWheelAction(e), 1000)}
  class="relative h-screen"
>
  {#each blocks as block, index (block._key)}
    <Block
      {block}
      {index}
      {activeBlockIndex}
      {prevBlockIndex}
      {nextBlockIndex}
      {scrollDirection}
      zIndex={blocks.length - blocksPositions[index]}
    />
  {/each}

  <Navigation
    {activeBlockIndex}
    on:slideNext={() => {
      scrollDirection = 'up';
      slideNext();
    }}
    on:sliedPrev={() => {
      scrollDirection = 'down';
      sliedPrev();
    }}
    blocksLength={blocks.length}
  />
</section>
