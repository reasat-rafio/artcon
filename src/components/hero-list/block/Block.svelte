<script lang="ts">
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import Asset from './Asset.svelte';
  import H7 from '@/components/ui/H7.svelte';
  import H1 from '@/components/ui/H1.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import { animate } from 'motion';

  export let block: CommonHeroProps;
  export let index: number;
  export let activeBlockIndex: number;
  export let scrollDirection: 'forward' | 'backward';

  let { asset, title, cta, subtitle, type } = block;
  let blockEl: HTMLElement;
  let assetEl: HTMLElement;
  let contentContainerEl: HTMLElement;

  $: isActive = activeBlockIndex === index;

  const runAnimation = () => {
    if (!assetEl) return;

    if (isActive) {
      animate(
        assetEl,
        { x: scrollDirection === 'forward' ? ['1%', '-1%'] : ['-1%', '1%'] },
        { duration: 1, easing: 'ease-out', delay: 0.2 }
      );
      animate(
        contentContainerEl,
        { x: scrollDirection === 'forward' ? ['-10%', 0] : ['10%', 0] },
        { duration: 1.1, easing: 'ease-out' }
      );
    } else {
      animate(
        assetEl,
        { x: scrollDirection === 'forward' ? ['-1%', '1%'] : ['1%', '-1%'] },
        { duration: 1, easing: 'ease-out', delay: 0.2 }
      );
      animate(
        contentContainerEl,
        { x: scrollDirection === 'forward' ? ['-10%', 0] : ['10%', 0] },
        { duration: 1.1, easing: 'ease-out' }
      );
    }
  };

  $: activeBlockIndex, runAnimation();
</script>

<div
  bind:this={blockEl}
  class="relative flex h-screen w-[100vw] flex-[0_0_100%] items-center justify-center overflow-hidden"
>
  <Asset bind:el={assetEl} {asset} />

  <div
    bind:this={contentContainerEl}
    class="container relative z-30 text-center text-white"
  >
    <header class="space-y-2">
      {#if !!type}
        <H7>{type}</H7>
      {/if}
      <H1>{title}</H1>
      {#if !!subtitle}
        <H3 class="whitespace-pre-wrap">{subtitle}</H3>
      {/if}
    </header>
    {#if !!cta?.title}
      <a href={cta.href}>{cta.title}</a>
    {/if}
  </div>
</div>
