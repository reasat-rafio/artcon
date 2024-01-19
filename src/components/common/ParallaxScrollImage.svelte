<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { createEventDispatcher, onMount } from 'svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import type { SanityImageAssetDocument } from '@sanity/client';

  type Image = {
    img: SanityImageAssetDocument;
    link?: string;
    caption?: string;
    triggerPopup?: boolean;
  };
  export let images: [Image, Image];
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
      gsap.to(firstImageEl, {
        y: -sectionHeight,
        scrollTrigger: {
          invalidateOnRefresh: true,
          scrub: 2,
          start: 'center bottom',
          end: 'top top',
          trigger: rootEl,
        },
      });

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
    class="w-full max-sm:pb-[1rem] sm:mr-[1.875rem] sm:flex sm:w-[30.30%] sm:items-end">
    <div class="hidden cursor-default sm:block">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <figure
        bind:this={firstImageEl}
        on:click={() => firstImage?.triggerPopup && dispatch('triggerPopup')}>
        <SanityImage
          class="aspect-square w-full rounded-xl object-cover {firstImage?.triggerPopup
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
        class="ml-auto w-[13.4375rem]"
        on:click={() => firstImage?.triggerPopup && dispatch('triggerPopup')}>
        <SanityImage
          class="aspect-square  rounded-xl object-cover {firstImage?.triggerPopup
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
  <div class="flex-1 xl:pr-[9.69rem]">
    <svelte:element
      this={!!secondImage?.link ? 'a' : 'div'}
      href={secondImage?.link}>
      <figure class="h-full 3xl:h-[55.83069rem]">
        <SanityImage
          sizes="(min-width:1024px) 70vw, 100vw"
          src={secondImage.img}
          alt={secondImage.img?.alt}
          class="h-full w-full rounded-xl object-cover"
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
