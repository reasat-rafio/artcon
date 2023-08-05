<script lang="ts">
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import Asset from './Asset.svelte';
  import H7 from '@/components/ui/H7.svelte';
  import H1 from '@/components/ui/H1.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import { timeline, animate } from 'motion';

  export let index: number;
  export let activeBlockIndex: number;
  export let nextBlockIndex: number;
  export let prevBlockIndex: number;
  export let scrollDirection: 'up' | 'down';
  export let zIndex: number;
  export let block: CommonHeroProps;

  let { asset, title, cta, subtitle, type } = block;
  let blockEl: HTMLElement;
  let intialPageLoad = true;

  $: isActive = index === activeBlockIndex;
  $: isNext = index === nextBlockIndex;
  $: isPrev = index === prevBlockIndex;
  $: validForAnimation = isActive || isNext || isPrev;

  //   const runAnimation = () => {
  //     if (validForAnimation && blockEl) {
  //       if (scrollDirection === 'down') {
  //         if (isActive) {
  //           timeline([
  //             [blockEl, { zIndex: zIndex }],
  //             [blockEl, { x: ['100%', 0] }, { duration: 2 }],
  //           ]);
  //         }
  //       } else {
  //         if (isActive) {
  //           timeline([
  //             [blockEl, { x: ['-100%', 0] }, { duration: 2 }],
  //             [blockEl, { zIndex: zIndex }],
  //           ]);
  //         }
  //       }
  //     }
  //   };

  //   $: isActive, runAnimation();

  const initZindex = (node: HTMLElement) => {
    node.style.zIndex = `${zIndex}`;
  };
</script>

<!-- use:initZindex -->
<div
  use:initZindex
  style="z-index: {zIndex};"
  bind:this={blockEl}
  class="absolute left-0 top-0 flex h-full w-full items-center justify-center"
>
  <!-- <p></p> -->
  <Asset {asset} />

  <div class="container relative z-30 text-center text-white">
    <header class="space-y-2">
      {#if !!type}
        <H7>{type}</H7>
      {/if}
      <H1>{title}</H1>
      {#if !!subtitle}
        <H3 class="whitespace-pre-wrap"
          >isActive {isActive}, isNext = {isNext}, isPrev ={isPrev}</H3
        >
        <!-- <H3 class="whitespace-pre-wrap">{subtitle}</H3> -->
      {/if}
    </header>
    {#if !!cta?.title}
      <a href={cta.href}>{cta.title}</a>
    {/if}
  </div>
</div>
