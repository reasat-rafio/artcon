<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import Asset from './Asset.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import ChevronDown from '../icons/ChevronDown.svelte';
  import Cta from '../ui/Cta.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  export let props: CommonHeroProps;
  $: ({ text, title, type, asset, cta } = props);

  let titleEl: HTMLElement;
  let textEl: HTMLElement;
  let typeEl: HTMLElement;
  let innerWidth = 0;

  onMount(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expoOut', duration: 0.5 },
      });

      // from NavItems Component
      if (innerWidth >= 1024)
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

<svelte:window bind:innerWidth />
<section class={twMerge('fixed inset-0 h-screen w-full', $$props.class)}>
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div class="container relative z-30 text-center text-white">
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
