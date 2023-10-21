<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import Asset from './Asset.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import ChevronDown from '../../icons/ChevronDown.svelte';
  import Cta from '../../ui/Cta.svelte';
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

<svelte:window bind:innerWidth />
<section class={twMerge('fixed inset-0 h-screen w-full', $$props.class)}>
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div class="container relative z-30 text-center text-white">
      <header class="space-y-[1rem]">
        {#if !!text}
          <h3 bind:this={textEl} class="head-md translate-y-full opacity-0">
            {text}
          </h3>
        {/if}
        <div class="overflow-hidden">
          <h1
            bind:this={titleEl}
            class="head-5xl translate-y-full !leading-none opacity-0"
          >
            {title}
          </h1>
        </div>

        {#if !!type}
          <div class="overflow-hidden">
            <h2
              bind:this={typeEl}
              class="translate-y-full whitespace-pre-wrap text-[0.938rem] leading-[1.4rem] opacity-0 lg:text-[1.5rem] lg:leading-[2.25rem]"
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
            class="cta-btn mx-auto translate-y-full opacity-0"
            href={cta.href}>{cta.title}</Cta
          >
        </div>
      {/if}
    </div>

    <div
      id="pointer"
      class="absolute opacity-0 max-lg:bottom-[10%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
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
