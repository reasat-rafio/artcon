<script lang="ts">
  import Asset from '@/components/common/hero/Asset.svelte';
  import ScrollIndicator from '@/components/common/hero/ScrollIndicator.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { expoOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { twMerge } from 'tailwind-merge';

  export let props: CommonHeroProps & { scrollAmount: number };
  $: ({ topTitle, title, subtitle, asset, cta, scrollAmount } = props);

  let windowHeight = 0;
  let windowWidth = 0;
  let titleEl: HTMLElement;
  let topTitleEl: HTMLElement;
  let subtitleEl: HTMLElement;
  $: tweenDelta = tweened(deltaY, { duration: 500, easing: expoOut });
  $: deltaY =
    windowWidth >= 1024 ? Math.min(scrollAmount / windowHeight, 1) : 0;

  onMount(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expoOut', duration: 0.5 },
        delay: 0.6,
      });
      if (topTitleEl) tl.to(topTitleEl, { y: 0, opacity: 1 }, '-=0.1');
      if (titleEl) tl.to(titleEl, { y: 0, opacity: 0.75 }, '-=0.2');
      if (subtitleEl) tl.to(subtitleEl, { y: 0, opacity: 1 }, '-=0.3');
      tl.to('.cta-btn', { y: 0, opacity: 1 }, '-=0.4');
      tl.to('#pointer', { opacity: 1 }, '-=0.4');
    });

    return () => ctx.revert();
  });
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />
<section
  style={`filter: blur(${$tweenDelta * 7.5}px) grayscale(${
    $tweenDelta * 50
  }%);`}
  class={twMerge('h-screen w-full ', $$props.class)}>
  <div class="relative flex h-full w-full">
    <Asset {asset} />

    <div
      class="relative z-30 mx-auto max-w-[76.3rem] px-[1rem] pt-[calc((334/1080)*100dvh)] text-center text-white">
      <header>
        <div class="head-8 lg:head-7 pb-[2.1875rem]">
          {#if !!topTitle}
            <h3
              bind:this={topTitleEl}
              class="translate-y-full !font-inter opacity-0">
              {topTitle}
            </h3>
          {:else}
            <span class="invisible">""</span>
          {/if}
        </div>

        <div class="mb-[1.26rem] overflow-hidden !drop-shadow-4xl">
          <h1
            bind:this={titleEl}
            class="head-1 translate-y-full !leading-none opacity-0">
            {title}
          </h1>
        </div>

        <div
          class="head-8 lg:head-6 overflow-hidden !leading-[calc(128.5%+0.35rem)]">
          {#if !!subtitle}
            <h2
              bind:this={subtitleEl}
              class="translate-y-full whitespace-pre-wrap !font-medium !normal-case !tracking-[1px] text-platinum opacity-0">
              {subtitle}
            </h2>
          {:else}
            <span class="invisible">""</span>
          {/if}
        </div>
      </header>
      <div class="mt-[4.55rem] overflow-hidden">
        {#if !!cta?.title}
          <Cta
            variant="quaternary"
            className="cta-btn mx-auto translate-y-full uppercase opacity-0 !text-[0.875rem] !tracking-[0.27px] !leading-[16.2px] !font-medium !w-[140px] !rounded-[64px]"
            href={cta.href}>
            {cta.title}
          </Cta>
        {:else}
          <span class="invisible">""</span>
        {/if}
      </div>
    </div>

    <ScrollIndicator />
  </div>
</section>
