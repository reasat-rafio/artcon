<script lang="ts">
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import Asset from './Asset.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import ChevronDown from '@/components/icons/ChevronDown.svelte';
  import gsap from 'gsap';

  export let block: CommonHeroProps;
  export let index: number;
  export let activeBlockIndex: number;
  export let scrollDirection: 'forward' | 'backward';

  $: ({ text, title, type, asset, cta } = block);
  let blockEl: HTMLElement;
  let titleEl: HTMLElement;
  let assetEl: HTMLElement;
  let textEl: HTMLElement;
  let typeEl: HTMLElement;
  let contentContainerEl: HTMLElement;

  $: isActive = activeBlockIndex === index;

  const runAnimation = () => {
    if (!assetEl) return;

    if (isActive) {
      gsap.fromTo(
        assetEl,
        { x: scrollDirection === 'forward' ? '1%' : '-1%' },
        {
          x: 0,
          duration: 1,
          ease: 'ease.out',
          delay: 0.2,
        },
      );

      gsap.fromTo(
        contentContainerEl,
        { x: scrollDirection === 'forward' ? '10%' : '-10%' },
        {
          x: 0,
          duration: 1.1,
          ease: 'ease.out',
        },
      );
    } else {
      gsap.fromTo(
        assetEl,
        { x: scrollDirection === 'forward' ? '-1%' : '1%' },
        {
          x: 0,
          duration: 1,
          ease: 'ease.out',
          delay: 0.2,
        },
      );

      gsap.fromTo(
        contentContainerEl,
        { x: scrollDirection === 'forward' ? '-10%' : '10%' },
        {
          x: 0,
          duration: 1.1,
          ease: 'ease.out',
        },
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
    <header class="space-y-[1rem]">
      {#if !!text}
        <h3 bind:this={textEl} class="head-md">
          {text}
        </h3>
      {/if}

      <div class="overflow-hidden">
        <h1 bind:this={titleEl} class="head-5xl !leading-none">
          {title}
        </h1>
      </div>
      {#if !!type}
        <div class="overflow-hidden">
          <h2
            bind:this={typeEl}
            class="whitespace-pre-wrap text-[0.938rem] leading-[1.4rem] lg:text-[1.5rem] lg:leading-[2.25rem]"
          >
            {type}
          </h2>
        </div>
      {/if}
    </header>
    {#if !!cta?.title}
      <div class="mt-[1rem] overflow-hidden">
        <Cta
          variant="fill"
          color="white"
          class="cta-btn mx-auto"
          href={cta.href}>{cta.title}</Cta
        >
      </div>
    {/if}
  </div>
</div>
