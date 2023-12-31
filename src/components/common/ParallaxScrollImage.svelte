<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import type { SanityImageAssetDocument } from '@sanity/client';
  gsap.registerPlugin(ScrollTrigger);

  type Image = {
    img: SanityImageAssetDocument;
    link?: string;
    caption?: string;
  };
  export let images: [Image, Image];
  $: [firstImage, secondImage] = images;

  let rootEl: HTMLDivElement;
  let firstImageEl: HTMLElement;
  let firstImageMobileEl: HTMLElement;
  let innerWidth = 0;

  onMount(() => {
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
  <div
    class="w-full max-sm:pb-[1rem] sm:mr-[1.875rem] sm:flex sm:w-[30.30%] sm:items-end">
    <svelte:element
      this={!!firstImage?.link ? 'a' : 'div'}
      href={firstImage?.link}
      class="hidden sm:block">
      <figure bind:this={firstImageEl}>
        <SanityImage
          class="aspect-square w-full rounded-xl object-cover"
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
    </svelte:element>
    <svelte:element
      this={!!firstImage?.link ? 'a' : 'div'}
      href={firstImage?.link}
      class="block sm:hidden">
      <figure class="ml-auto w-[13.4375rem]" bind:this={firstImageMobileEl}>
        <SanityImage
          class="aspect-square rounded-xl object-cover"
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
    </svelte:element>
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
