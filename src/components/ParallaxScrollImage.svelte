<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import breakpoint from '@/store/breakpoint';

  type Image = {
    img: SanityImageAssetDocument;
    link?: string;
    caption?: string;
  };
  export let images: [Image, Image];
  $: [firstImage, secondImage] = images;

  let rootEl: HTMLDivElement;
  let firstImageEl: HTMLElement;
  let innerWidth = 0;

  const createAnimation = () => {
    const sectionHeight = rootEl.getBoundingClientRect().height / 2;
    const sectionWidth = rootEl.getBoundingClientRect().width;

    if (innerWidth >= 640) {
      gsap.from(firstImageEl, {
        y: sectionHeight,
        x: 0,
        scrollTrigger: {
          scrub: 2,
          start: 'top bottom',
          end: 'top top',
          trigger: firstImageEl,
        },
      });
    } else {
      gsap.from(firstImageEl, {
        y: 0,
        x: -sectionWidth,
        scrollTrigger: {
          scrub: 2,
          start: 'top bottom',
          end: 'top top',
          trigger: firstImageEl,
        },
      });
    }
  };
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  });
</script>

<svelte:window bind:innerWidth />
<div
  bind:this={rootEl}
  class={twMerge(
    'grid w-full grid-cols-12 max-lg:gap-y-[2.69rem] max-sm:ml-auto lg:w-[85%] lg:gap-x-[1.87rem]',
    $$props.class,
  )}
>
  <div class="col-span-12 sm:col-span-4">
    <svelte:element
      this={!!firstImage?.link ? 'a' : 'div'}
      href={firstImage?.link}
    >
      <figure class="max-sm:ml-auto max-sm:w-[70%]" bind:this={firstImageEl}>
        <SanityImage
          class="aspect-square w-full rounded-[20px] object-cover"
          sizes="30vw"
          src={firstImage.img}
          alt={firstImage.img?.alt}
          imageUrlBuilder={imageBuilder}
        />
        {#if !!firstImage.img?.caption || !!firstImage?.caption}
          <figurecaption
            class="pl-[20px] pt-[20px] text-title-2 font-light text-sonic-silver"
          >
            {firstImage?.caption ?? firstImage.img?.caption}
          </figurecaption>
        {/if}
      </figure>
    </svelte:element>
  </div>
  <div class="col-span-12 sm:col-span-8">
    <svelte:element this={!!firstImage?.link ? 'a' : 'div'}>
      <figure>
        <SanityImage
          sizes="70vw"
          src={secondImage.img}
          alt={secondImage.img?.alt}
          class="h-full w-full rounded-[20px]"
          imageUrlBuilder={imageBuilder}
        />
        {#if !!secondImage.img?.caption || !!secondImage?.caption}
          <figurecaption
            class="pl-[20px] pt-[20px] text-title-2 font-light text-sonic-silver"
          >
            {secondImage?.caption ?? secondImage.img?.caption}
          </figurecaption>
        {/if}
      </figure>
    </svelte:element>
  </div>
</div>
