<script lang="ts">
  import { cn } from '@/lib/cn';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import Cta from '../../ui/Cta.svelte';
  import Asset from './Asset.svelte';
  import Overlay from './Overlay.svelte';
  import ScrollIndicator from './ScrollIndicator.svelte';
  gsap.registerPlugin(ScrollTrigger);

  export let props: Omit<CommonHeroProps, '_key'>;
  export let currentSlug: string | undefined = undefined;
  $: ({ subtitle, title, topTitle, asset, cta } = props);
  $: shouldShowCta = !!cta?.title && !!cta?.href && (!currentSlug || cta?.slug !== currentSlug);

  let innerWidth = 0;
  let titleEl: HTMLElement;
  let topTitleEl: HTMLElement;
  let subtitleEl: HTMLElement;

  function animation(node: HTMLElement, shouldApply: boolean) {
    const ctx = gsap.context(() => {
      if (shouldApply) {
        gsap.to(node, {
          scale: 1.15,
          scrollTrigger: {
            trigger: node,
            start: '100% center',
            end: 'bottom top',
            scrub: 3,
          },
        });
      }
    });
    return {
      destroy() {
        ctx.revert();
      },
    };
  }

  onMount(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expoOut', duration: 0.5 },
        delay: 0.6,
      });
      if (topTitleEl) tl.to(topTitleEl, { y: 0, opacity: 1 }, '-=0.1');
      if (titleEl) tl.to(titleEl, { y: 0, opacity: 1 }, '-=0.2');
      if (subtitleEl) tl.to(subtitleEl, { y: 0, opacity: 1 }, '-=0.3');
      tl.to('.cta-btn', { y: 0, opacity: 1 }, '-=0.4');
      tl.to('#pointer', { opacity: 1 }, '-=0.4');
    });

    return () => ctx.revert();
  });
</script>

<svelte:window bind:innerWidth />
<section
  use:animation={innerWidth >= 1024}
  class={cn('fixed inset-0 h-screen w-full', $$props.class)}>
  <div class="relative flex h-full w-full">
    {#key asset}
      <Asset {asset} />
    {/key}
    <Overlay />
    <div
      class="relative z-30 mx-auto max-w-[76.3rem] space-y-[2.1875rem] px-[1rem] pt-[calc((340/1080)*100dvh)] text-center text-white max-lg:px-[1rem]">
      <header class="space-y-[2.1875rem] !drop-shadow-4xl">
        <div
          class="head-8 lg:head-7 !font-medium !leading-[120%] !tracking-widest">
          {#if !!topTitle}
            <h3
              class="translate-y-full !font-medium opacity-0 whitespace-pre"
              bind:this={topTitleEl}>
              {topTitle}
            </h3>
          {:else}
            <span class="invisible">""</span>
          {/if}
        </div>

        <div class="overflow-hidden !leading-[100%]">
          <h1
            bind:this={titleEl}
            class="head-1 translate-y-full !leading-none whitespace-pre">
            {title}
          </h1>
        </div>

        <div
          class="head-3 overflow-hidden whitespace-pre-wrap !leading-[115.5%] !tracking-[0.045rem]">
          {#if !!subtitle}
            <h2 bind:this={subtitleEl} class="translate-y-full opacity-0 whitespace-pre">
              {subtitle}
            </h2>
          {:else}
            <span class="invisible">""</span>
          {/if}
        </div>
      </header>

      <div class="overflow-hidden">
        {#if shouldShowCta && cta}
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

    <ScrollIndicator />
  </div>
</section>
