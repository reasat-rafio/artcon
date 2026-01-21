<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { createEventDispatcher, onMount } from 'svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import breakpoint from '@/store/breakpoint';
  import type { SanityImageAssetDocument } from '@sanity/client';

  type Image = {
    img: SanityImageAssetDocument;
    link?: string;
    caption?: string;
    triggerPopup?: boolean;
  };
  export let images: [Image, Image];
  export let disableParallaxOnDesktop = false;
  // export let disableHoverEffect = false;
  $: [firstImage, secondImage] = images;

  const dispatch = createEventDispatcher();
  let rootEl: HTMLDivElement;
  let firstImageEl: HTMLElement;
  let firstImageMobileEl: HTMLElement;
  let innerWidth = 0;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionHeight = rootEl.getBoundingClientRect().height / 2;
    const sectionWidth = rootEl.getBoundingClientRect().width;

    let ctx = gsap.context(() => {
      // Only apply desktop parallax if not disabled
      if (!disableParallaxOnDesktop) {
        gsap.to(firstImageEl, {
          y: -sectionHeight/1.12,
          scrollTrigger: {
            invalidateOnRefresh: true,
            scrub: 2,
            start: 'center bottom',
            end: 'top top',
            trigger: rootEl,
          },
        });
      }

      gsap.from(firstImageMobileEl, {
        x: -sectionWidth,
        scrollTrigger: {
          invalidateOnRefresh: true,
          scrub: 2,
          start: 'top bottom',
          end: 'top top',
          trigger: firstImageMobileEl,
        },
      });
    });

    return () => ctx.revert();
  });
</script>

<svelte:window bind:innerWidth />
<div
  bind:this={rootEl}
  class={twMerge('flex w-full flex-col sm:flex-row', $$props.class)}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="w-full max-sm:pb-[1rem] sm:mr-[1.875rem] sm:flex sm:w-[30.30%] sm:items-center sm:justify-center sm:-mt-[45px]">
    <div class="hidden cursor-default sm:block">
      <button
        type="button"
        bind:this={firstImageEl}
        on:click={() => firstImage?.triggerPopup && dispatch('triggerPopup')}
        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && firstImage?.triggerPopup && dispatch('triggerPopup')}
        disabled={!firstImage?.triggerPopup}
        class="overflow-hidden rounded-xl max-w-[30vw] {firstImage?.triggerPopup ? 'cursor-pointer' : 'cursor-default'} bg-transparent border-none p-0">
        <figure>
          <SanityImage
            class="max-h-[500px] w-full h-auto rounded-xl object-contain"
            sizes="30vw"
            src={firstImage.img}
            alt={firstImage.img?.alt}
            imageUrlBuilder={imageBuilder} />
          {#if !!firstImage.img?.caption || !!firstImage?.caption}
            <figurecaption class="caption">
              {firstImage?.caption ?? firstImage.img?.caption}
            </figurecaption>
          {/if}
        </figure>
      </button>
    </div>
    <div class="block sm:hidden">
      <button
        type="button"
        bind:this={firstImageMobileEl}
        on:click={() => firstImage?.triggerPopup && dispatch('triggerPopup')}
        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && firstImage?.triggerPopup && dispatch('triggerPopup')}
        disabled={!firstImage?.triggerPopup}
        class="ml-auto w-[13.4375rem] overflow-hidden {firstImage?.triggerPopup ? 'cursor-pointer' : 'cursor-default'} bg-transparent border-none p-0">
        <figure>
          <SanityImage
            class="w-full h-auto rounded-xl object-contain"
            sizes="70vw"
            src={firstImage.img}
            alt={firstImage.img?.alt}
            imageUrlBuilder={imageBuilder} />
          {#if !!firstImage.img?.caption || !!firstImage?.caption}
            <figurecaption class="caption">
              {firstImage?.caption ?? firstImage.img?.caption}
            </figurecaption>
          {/if}
        </figure>
      </button>
    </div>
  </div>
  <div class="w-full flex-1 xl:pr-[9.69rem]">
    <button
      type="button"
      on:click={() => secondImage?.triggerPopup && dispatch('triggerPopup')}
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && secondImage?.triggerPopup && dispatch('triggerPopup')}
      disabled={!secondImage?.triggerPopup}
      class="w-full overflow-hidden rounded-xl {secondImage?.triggerPopup ? 'cursor-pointer' : 'cursor-default'} bg-transparent border-none p-0">
      <figure>
        <SanityImage
          sizes="(min-width:1024px) 70vw, 100vw"
          src={secondImage.img}
          alt={secondImage.img?.alt}
          class="w-full h-auto rounded-xl object-contain"
          imageUrlBuilder={imageBuilder} />
        {#if !!secondImage.img?.caption || !!secondImage?.caption}
          <figurecaption class="caption">
            {secondImage?.caption ?? secondImage?.img?.caption}
          </figurecaption>
        {/if}
      </figure>
    </button>
  </div>
</div>
