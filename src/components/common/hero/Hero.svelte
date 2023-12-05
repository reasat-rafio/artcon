<script lang="ts">
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';
  import ChevronDown from '../../icons/ChevronDown.svelte';
  import Cta from '../../ui/Cta.svelte';
  import Asset from './Asset.svelte';
  import Overlay from './Overlay.svelte';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  export let props: Omit<CommonHeroProps, '_key'>;
  $: ({ text, title, type, asset, cta } = props);

  let innerWidth = 0;
  let sectionEl: HTMLElement;
  let titleEl: HTMLElement;
  let textEl: HTMLElement;
  let typeEl: HTMLElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(sectionEl, {
      y: -50,
      scale: 1.01,
      scrollTrigger: {
        trigger: sectionEl,
        start: 'center center',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

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
<section
  bind:this={sectionEl}
  class={twMerge('fixed inset-0 h-screen w-full', $$props.class)}>
  <div class="relative flex h-full w-full items-center justify-center">
    {#key asset}
      <Asset {asset} />
    {/key}
    <Overlay />

    <div
      class="relative z-30 max-w-[76.3rem] space-y-[2.1875rem] px-[1rem] text-center text-white max-lg:px-[1rem]">
      <header class="-mt-[60px] space-y-[2.1875rem]">
        {#if !!text}
          <h3
            bind:this={textEl}
            class="head-8 lg:head-7 translate-y-full font-bold !leading-[120%] !tracking-widest opacity-0">
            {text}
          </h3>
        {/if}
        <div class="overflow-hidden !leading-[100%]">
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
              class="head-3 translate-y-full whitespace-pre-wrap !leading-[115.5%] !tracking-[0.045rem] opacity-0">
              {type}
            </h2>
          </div>
        {/if}
      </header>
      {#if !!cta?.title}
        <div class="overflow-hidden">
          <Cta
            variant="quaternary"
            className="cta-btn mx-auto translate-y-full opacity-0"
            href={cta.href}>
            {cta.title}
          </Cta>
        </div>
      {/if}
    </div>

    <div
      id="pointer"
      class="absolute -mt-[50px] opacity-0 max-lg:bottom-[10%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
      <div
        class="flex items-center justify-center space-x-[0.5rem] text-[#E8E6E3] lg:space-x-[1.06rem] lg:pr-[2.5rem]">
        <span
          class="text-[0.84375rem] font-medium uppercase tracking-[0.01688rem]">
          Discover our stories
        </span>
        <ChevronDown class="chevron-icon animate-bounce" />
      </div>
    </div>
  </div>
</section>
