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
    <header class="space-y-[1rem] lg:space-y-[1.56rem]">
      {#if !!text}
        <div class="overflow-hidden">
          <h3 bind:this={textEl} class="head-md">{text}</h3>
        </div>
      {/if}
      <div class="overflow-hidden">
        <h1 bind:this={titleEl} class="head-5xl">{title}</h1>
      </div>
      {#if !!type}
        <div class="overflow-hidden">
          <h2 bind:this={typeEl} class="head-3xl">{type}</h2>
        </div>
      {/if}
    </header>
    {#if !!cta?.title}
      <div class="overflow-hidden">
        <Cta
          variant="fill"
          color="white"
          class="cta-btn mx-auto mt-[2.5rem] lg:mt-[4.75rem]"
          href={cta.href}>{cta.title}</Cta
        >
      </div>
    {/if}
  </div>
  <div
    id="pointer"
    class="absolute max-lg:bottom-[10%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
  >
    <div
      class="flex items-center justify-center space-x-[0.5rem] text-[#E8E6E3] sm:space-x-[1.06rem] lg:pr-[2.5rem]"
    >
      <span
        class="text-[0.84375rem] font-medium uppercase tracking-[0.01688rem]"
        >Discover our stories</span
      >
      <ChevronDown class="chevron-icon animate-bounce" />
    </div>
  </div>
</div>
