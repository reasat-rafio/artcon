<script lang="ts">
  import { cn } from '@/lib/cn';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import ChevronDown from '../../icons/ChevronDown.svelte';
  import Cta from '../../ui/Cta.svelte';
  import Asset from './Asset.svelte';
  import Overlay from './Overlay.svelte';

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
      scale: 1.15,
      scrollTrigger: {
        trigger: sectionEl,
        start: '100% center',
        end: 'bottom top',
        scrub: 1,
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
  class={cn('fixed inset-0 h-screen w-full', $$props.class)}>
  <div class="relative flex h-full w-full">
    {#key asset}
      <Asset {asset} />
    {/key}
    <Overlay />
    <div
      class="relative z-30 mx-auto max-w-[76.3rem] space-y-[2.1875rem] px-[1rem] pt-[calc((340/1080)*100vh)] text-center text-white max-lg:px-[1rem]">
      <header class="space-y-[2.1875rem]">
        <div
          class="head-8 lg:head-7 font-bold !leading-[120%] !tracking-widest opacity-0">
          {#if !!text}
            <h3 class="translate-y-full" bind:this={textEl}>
              {text}
            </h3>
          {:else}
            <span class="invisible">""</span>
          {/if}
        </div>

        <div class="overflow-hidden !leading-[100%]">
          <h1
            bind:this={titleEl}
            class="head-1 translate-y-full !leading-none opacity-0">
            {title}
          </h1>
        </div>

        <div
          class="head-3 overflow-hidden whitespace-pre-wrap !leading-[115.5%] !tracking-[0.045rem]">
          {#if !!type}
            <h2 bind:this={typeEl} class="translate-y-full opacity-0">
              {type}
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
            className="cta-btn mx-auto translate-y-full opacity-0 min-w-[10.9375rem]"
            href={cta.href}>
            {cta.title}
          </Cta>
        {:else}
          <span class="invisible">""</span>
        {/if}
      </div>
    </div>

    <div
      id="pointer"
      class="absolute -mt-[50px] opacity-0 max-lg:bottom-[10%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
      <div
        class="flex items-center justify-center space-x-[0.5rem] text-platinum lg:space-x-[1.06rem] lg:pr-[4.07rem]">
        <span
          class="text-[0.84375rem] font-medium uppercase tracking-[0.01688rem]">
          Discover our stories
        </span>
        <ChevronDown class="chevron-icon animate-bounce text-white" />
      </div>
    </div>
  </div>
</section>
