<script lang="ts">
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import Asset from '@/components/hero/Asset.svelte';
  import ChevronDown from '@/components/icons/ChevronDown.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { tweened } from 'svelte/motion';
  import { expoOut } from 'svelte/easing';
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
      });

      // from NavItems Component
      if (windowWidth >= 1024)
        tl.from('.navitem', {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          ease: 'expoOut',
        });
      if (textEl) tl.from(textEl, { y: '100%', opacity: 0 }, '-=0.1');
      if (titleEl) tl.from(titleEl, { y: '100%', opacity: 0 }, '-=0.2');
      if (typeEl) tl.from(typeEl, { y: '100%', opacity: 0 }, '-=0.3');
      tl.from('.cta-btn', { y: '100%', opacity: 0 }, '-=0.4');
      tl.from('#pointer', { y: '100%', opacity: 0 }, '-=0.4');
    });

    return () => ctx.revert();
  });
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />
<section
  style={`filter: blur(${$tweenDelta * 2.5}px) grayscale(${
    $tweenDelta * 50
  }%);`}
  class={twMerge('h-screen w-full', $$props.class)}
>
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div class="container relative z-30 text-center text-white">
      <header class="space-y-[1rem]">
        {#if !!text}
          <h3 bind:this={textEl} class="head-md">{text}</h3>
        {/if}
        <div class="overflow-hidden">
          <h1 bind:this={titleEl} class="head-5xl !leading-none">{title}</h1>
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

    <div
      id="pointer"
      class="absolute max-lg:bottom-[10%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
    >
      <div
        class="flex items-center justify-center space-x-[1.06rem] text-[#E8E6E3] lg:pr-[2.5rem]"
      >
        <span
          class="text-[0.84375rem] font-medium uppercase tracking-[0.01688rem]"
          >Discover our stories</span
        >
        <ChevronDown class="chevron-icon animate-bounce" />
      </div>
    </div>
  </div>
</section>
