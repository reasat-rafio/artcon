<script lang="ts">
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import Asset from './Asset.svelte';
  import H7 from '@/components/ui/H7.svelte';
  import H1 from '@/components/ui/H1.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import { timeline, animate } from 'motion';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';

  export let block: CommonHeroProps;
  export let index: number;
  export let activeBlockIndex: number;
  export let scrollDirection: 'forward' | 'backward';

  let { asset, title, cta, subtitle, type } = block;
  let blockEl: HTMLElement;
  let imgEl: HTMLElement;
  let contentContainerEl: HTMLElement;

  $: isActive = activeBlockIndex === index;
  $: isPrev = activeBlockIndex - 1 === index;
  $: isNext = activeBlockIndex + 1 === index;

  const runAnimation = () => {
    if (imgEl) {
      if (isActive) {
        animate(
          imgEl,
          { x: scrollDirection === 'forward' ? ['3%', '-3%'] : ['-3%', '3%'] },

          { duration: 1 }
        );
        animate(
          contentContainerEl,
          { x: scrollDirection === 'forward' ? ['-10%', 0] : ['10%', 0] },
          { duration: 2 }
        );
      } else {
        animate(
          imgEl,
          { x: scrollDirection === 'forward' ? ['-3%', '3%'] : ['3%', '-3%'] },
          { duration: 1 }
        );
        animate(
          contentContainerEl,
          { x: scrollDirection === 'forward' ? ['-10%', 0] : ['10%', 0] },
          { duration: 2 }
        );
      }
    }
  };

  $: activeBlockIndex, runAnimation();
</script>

<div
  bind:this={blockEl}
  class="relative flex h-screen w-[100vw] flex-[0_0_100%] items-center justify-center overflow-hidden"
>
  {#if !!asset.image}
    <figure
      bind:this={imgEl}
      class="absolute h-[100%] w-[110%] translate-x-[-4%]"
    >
      <SanityImage
        draggable={false}
        class="h-full w-full object-cover"
        lqip
        sizes="100vw"
        alt={asset.image.alt}
        src={asset.image}
        imageUrlBuilder={imageBuilder}
      />
    </figure>
  {/if}

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
