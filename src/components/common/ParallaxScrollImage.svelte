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
  let firstImageMobileEl: HTMLElement;
  let innerWidth = 0;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionHeight = rootEl.getBoundingClientRect().height / 2;
    const sectionWidth = rootEl.getBoundingClientRect().width;

    let ctx = gsap.context(() => {
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

      gsap.from(firstImageMobileEl, {
        y: 0,
        x: -sectionWidth,
        scrollTrigger: {
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
  class={twMerge(
    'grid w-full grid-cols-12 max-lg:gap-y-[2.69rem] max-sm:ml-auto sm:gap-x-[1.87rem] xl:pr-[9.69rem]',
    $$props.class,
  )}
>
  <div class="col-span-12 sm:col-span-4">
    <svelte:element
      this={!!firstImage?.link ? 'a' : 'div'}
      href={firstImage?.link}
      class="hidden sm:block"
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
          <figurecaption class="caption">
            {firstImage?.caption ?? firstImage.img?.caption}
          </figurecaption>
        {/if}
      </figure>
    </svelte:element>
    <svelte:element
      this={!!firstImage?.link ? 'a' : 'div'}
      href={firstImage?.link}
      class="block sm:hidden"
    >
      <figure class="ml-auto w-[70%]" bind:this={firstImageMobileEl}>
        <SanityImage
          class="aspect-square w-full rounded-[20px] object-cover"
          sizes="70vw"
          src={firstImage.img}
          alt={firstImage.img?.alt}
          imageUrlBuilder={imageBuilder}
        />
        {#if !!firstImage.img?.caption || !!firstImage?.caption}
          <figurecaption class="caption">
            {firstImage?.caption ?? firstImage.img?.caption}
          </figurecaption>
        {/if}
      </figure>
    </svelte:element>
  </div>
  <div class="col-span-12 sm:col-span-8">
    <svelte:element
      this={!!secondImage?.link ? 'a' : 'div'}
      href={secondImage?.link}
    >
      <figure>
        <SanityImage
          sizes="(min-width:1024) 70vw, 100vw"
          src={secondImage.img}
          alt={secondImage.img?.alt}
          class="h-full max-h-[55.83069rem] w-full rounded-[20px]"
          imageUrlBuilder={imageBuilder}
        />
        {#if !!secondImage.img?.caption || !!secondImage?.caption}
          <figurecaption class="caption">
            {secondImage?.caption ?? secondImage?.img?.caption}
          </figurecaption>
        {/if}
      </figure>
    </svelte:element>
  </div>
</div>
