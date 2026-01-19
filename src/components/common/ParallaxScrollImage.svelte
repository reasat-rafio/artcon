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
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <figure
        bind:this={firstImageEl}
        on:click={() => firstImage?.triggerPopup && dispatch('triggerPopup')}
        class="overflow-hidden rounded-xl max-w-[30vw]">
        <SanityImage
          class="max-h-[500px] w-full h-auto rounded-xl object-contain {firstImage?.triggerPopup
            ? 'cursor-pointer'
            : 'cursor-default'}"
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
    </div>
    <div class="block sm:hidden">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <figure
        bind:this={firstImageMobileEl}
        class="ml-auto w-[13.4375rem] overflow-hidden"
        on:click={() => firstImage?.triggerPopup && dispatch('triggerPopup')}>
        <SanityImage
          class="w-full h-auto rounded-xl object-contain {firstImage?.triggerPopup
            ? 'cursor-pointer'
            : 'cursor-default'}"
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
    </div>
  </div>
  <div class="w-full flex-1 xl:pr-[9.69rem]">
    <svelte:element
      this={!!secondImage?.link ? 'a' : 'div'}
      href={secondImage?.link}
      target={secondImage?.link?.startsWith('http') ? '_blank' : '_self'}
      rel={secondImage?.link?.startsWith('http') ? 'noopener noreferrer' : undefined}>
      <figure class="overflow-hidden rounded-xl">
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
    </svelte:element>
  </div>
</div>
