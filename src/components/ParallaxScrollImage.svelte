<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import type { SanityImageAssetDocument } from '@sanity/client';

  type Image = {
    img: SanityImageAssetDocument;
    link?: string;
    caption?: string;
  };
  export let images: [Image, Image];
  $: [firstImage, secondImage] = images;

  let rootEl: HTMLDivElement;
  let firstImageEl: HTMLElement;

  onMount(() => {
    const sectionHeight = rootEl.getBoundingClientRect().height / 2;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(firstImageEl, {
      y: sectionHeight,
      scrollTrigger: {
        scrub: 2,
        start: 'top bottom',
        end: 'top top',
        trigger: firstImageEl,
      },
    });
  });
</script>

<div
  bind:this={rootEl}
  class={twMerge('grid w-[85%] grid-cols-12  gap-[30px]', $$props.class)}
>
  <div class="col-span-4">
    <svelte:element
      this={!!firstImage?.link ? 'a' : 'div'}
      href={firstImage?.link}
    >
      <figure bind:this={firstImageEl}>
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
  <div class="col-span-8">
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
