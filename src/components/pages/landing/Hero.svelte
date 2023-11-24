<script lang="ts">
  import Asset from '@/components/common/hero/Asset.svelte';
  import ChevronDown from '@/components/icons/ChevronDown.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { expoOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { twMerge } from 'tailwind-merge';

  export let props: CommonHeroProps & { scrollAmount: number };
  $: ({ text, title, type, asset, cta, scrollAmount } = props);

  let windowHeight = 0;
  let windowWidth = 0;
  let titleEl: HTMLElement;
  let textEl: HTMLElement;
  let typeEl: HTMLElement;
  $: tweenDelta = tweened(deltaY, { duration: 500, easing: expoOut });
  $: deltaY =
    windowWidth >= 1024 ? Math.min(scrollAmount / windowHeight, 1) : 0;

  onMount(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expoOut', duration: 0.5 },
        delay: 0.6,
      });
      if (textEl) tl.to(textEl, { y: 0, opacity: 1 }, '-=0.1');
      if (titleEl) tl.to(titleEl, { y: 0, opacity: 1 }, '-=0.2');
      if (typeEl) tl.to(typeEl, { y: 0, opacity: 1 }, '-=0.3');
      tl.to('.cta-btn', { y: 0, opacity: 1 }, '-=0.4');
      tl.to('#pointer', { opacity: 1 }, '-=0.4');
    });

    return () => ctx.revert();
  });
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />
<section
  style={`filter: blur(${$tweenDelta * 2.5}px) grayscale(${
    $tweenDelta * 50
  }%);`}
  class={twMerge('h-screen  w-full ', $$props.class)}>
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div
      class="relative z-30 mt-[2.625rem] max-w-6xl px-[1rem] text-center text-white">
      <header>
        {#if !!text}
          <h3
            bind:this={textEl}
            class="head-8 lg:head-7 translate-y-full opacity-0">
            {text}
          </h3>
        {/if}
        <div class="mb-[1.56rem] overflow-hidden">
          <h1
            bind:this={titleEl}
            class="head-1 translate-y-full !leading-none opacity-0">
            {title}
          </h1>
        </div>

        {#if !!type}
          <div class="overflow-hidden">
            <h2
              bind:this={typeEl}
              class="head-8 lg:head-6 translate-y-full whitespace-pre-wrap !font-medium !leading-[calc(128.5%+0.31rem)] opacity-0">
              {type}
            </h2>
          </div>
        {/if}
      </header>
      {#if !!cta?.title}
        <div class="mt-[4.75rem] overflow-hidden">
          <Cta
            variant="fill"
            color="white"
            class="cta-btn mx-auto translate-y-full uppercase opacity-0"
            href={cta.href}>
            {cta.title}
          </Cta>
        </div>
      {/if}
    </div>

    <div
      id="pointer"
      class="absolute -mt-[44px] opacity-0 max-lg:bottom-[10%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0 lg:top-1/2 lg:-mt-[41px] lg:-translate-y-1/2">
      <div
        class="flex items-center justify-center space-x-[0.5rem] text-[#E8E6E3] lg:space-x-[1.06rem] lg:pr-[4.07rem]">
        <span
          class="text-[0.84375rem] font-medium uppercase tracking-[0.01688rem]">
          Discover our stories
        </span>
        <ChevronDown class="chevron-icon animate-bounce" />
      </div>
    </div>
  </div>
</section>
