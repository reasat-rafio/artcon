<script lang="ts">
  import Asset from '@/components/common/hero/Asset.svelte';
  import ScrollIndicator from '@/components/common/hero/ScrollIndicator.svelte';
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
      if (titleEl) tl.to(titleEl, { y: 0, opacity: 0.75 }, '-=0.2');
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
  class={twMerge('h-screen w-full ', $$props.class)}>
  <div class="relative flex h-full w-full">
    <Asset {asset} />

    <div
      class="relative z-30 mx-auto max-w-[76.3rem] px-[1rem] pt-[calc((338/1080)*100vh)] text-center text-white">
      <header>
        <div class="head-8 lg:head-7 pb-[2.1875rem]">
          {#if !!text}
            <h3
              bind:this={textEl}
              class="translate-y-full !font-inter opacity-0">
              {text}
            </h3>
          {:else}
            <span class="invisible">""</span>
          {/if}
        </div>

        <div class="mb-[1.26rem] overflow-hidden">
          <h1
            bind:this={titleEl}
            class="head-1 translate-y-full !leading-none opacity-0">
            {title}
          </h1>
        </div>

        <div
          class="head-8 lg:head-6 overflow-hidden !font-medium !leading-[calc(128.5%+0.35rem)]">
          {#if !!type}
            <h2
              bind:this={typeEl}
              class="translate-y-full whitespace-pre-wrap opacity-0">
              {type}
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
            className="cta-btn mx-auto translate-y-full uppercase opacity-0"
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
