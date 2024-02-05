<script lang="ts">
  import Cta from '@/components/ui/Cta.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import Asset from './Asset.svelte';
  import Overlay from '../../hero/Overlay.svelte';

  export let block: CommonHeroProps;
  export let index: number;
  export let activeBlockIndex: number;
  export let scrollDirection: 'forward' | 'backward';

  $: ({ title, subtitle, topTitle, asset, cta } = block);
  let titleEl: HTMLElement;
  let assetEl: HTMLElement;
  let topTitleEl: HTMLElement;
  let subtitleEl: HTMLElement;
  let contentContainerEl: HTMLElement;

  $: isActive = activeBlockIndex === index;
  $: activeBlockIndex, runAnimation();

  function animation(node: HTMLElement) {
    const ctx = gsap.context(() => {
      gsap.to(node, {
        scale: 1.15,
        scrollTrigger: {
          trigger: node,
          start: '100% center',
          end: 'bottom top',
          scrub: 3,
        },
      });
    });
    return {
      destroy() {
        ctx.revert();
      },
    };
  }

  function runAnimation() {
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
  }
</script>

<div
  use:animation
  class="relative flex h-screen w-[100vw] flex-[0_0_100%] overflow-hidden">
  <Asset bind:el={assetEl} {asset} />
  <Overlay />

  <div
    bind:this={contentContainerEl}
    class="relative z-30 mx-auto max-w-[76.3rem] space-y-[2.1875rem] pt-[calc((340/1080)*100dvh)] text-center text-white max-lg:px-[1rem]">
    <header class="!drop-shadow-5xl space-y-[2.1875rem]">
      {#if !!topTitle}
        <h3
          bind:this={topTitleEl}
          class="head-8 lg:head-7 !font-medium !leading-[120%] !tracking-widest">
          {topTitle}
        </h3>
      {:else}
        <span class="invisible">""</span>
      {/if}

      <div class="overflow-hidden !leading-[100%] !drop-shadow-4xl">
        <h1 bind:this={titleEl} class="head-1 uppercase !leading-none">
          {title}
        </h1>
      </div>

      <div
        class="head-3 overflow-hidden whitespace-pre-wrap !leading-[115.5%] !tracking-[0.045rem]">
        {#if !!subtitle}
          <h2 class="!drop-shadow-5xl" bind:this={subtitleEl}>
            {subtitle}
          </h2>
        {:else}
          <span class="invisible">""</span>
        {/if}
      </div>
    </header>
    <div class="overflow-hidden">
      {#if !!cta?.title && !!cta?.href}
        <Cta
          variant="quaternary"
          className="cta-btn mx-auto min-w-[10.9375rem]"
          href={cta.href}>
          {cta.title}
        </Cta>
      {:else}
        <span class="invisible">""</span>
      {/if}
    </div>
  </div>
</div>
