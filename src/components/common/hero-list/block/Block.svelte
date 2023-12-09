<script lang="ts">
  import Cta from '@/components/ui/Cta.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import Asset from './Asset.svelte';
  import Overlay from '../../hero/Overlay.svelte';
  import { onMount } from 'svelte';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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
  $: activeBlockIndex, runAnimation();

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(blockEl, {
      y: -50,
      scale: 1.025,
      scrollTrigger: {
        trigger: blockEl,
        start: '80% center',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });

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
</script>

<div
  bind:this={blockEl}
  class="relative flex h-screen w-[100vw] flex-[0_0_100%] items-center justify-center overflow-hidden">
  <Asset bind:el={assetEl} {asset} />
  <Overlay />

  <div
    bind:this={contentContainerEl}
    class="relative z-30 max-w-[76.3rem] space-y-[2.1875rem] text-center text-white max-lg:px-[1rem]">
    <header class="-mt-[60px] space-y-[2.1875rem]">
      {#if !!text}
        <h3
          bind:this={textEl}
          class="head-8 lg:head-7 font-bold !leading-[120%] !tracking-widest">
          {text}
        </h3>
      {/if}

      <div class="overflow-hidden !leading-[100%]">
        <h1 bind:this={titleEl} class="head-1 !leading-none">
          {title}
        </h1>
      </div>

      {#if !!type}
        <div class="overflow-hidden">
          <h2
            bind:this={typeEl}
            class="head-3 whitespace-pre-wrap !leading-[115.5%] !tracking-[0.045rem]">
            {type}
          </h2>
        </div>
      {/if}
    </header>
    {#if !!cta?.title}
      <div class="overflow-hidden">
        <Cta variant="quaternary" className="cta-btn mx-auto" href={cta.href}>
          {cta.title}
        </Cta>
      </div>
    {/if}
  </div>
</div>
