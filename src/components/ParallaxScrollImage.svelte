<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import { twMerge } from 'tailwind-merge';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import type { SanityImageAssetDocument } from '@sanity/client';

  export let images: [SanityImageAssetDocument, SanityImageAssetDocument];
  $: [firstImage, secondImage] = images;

  let scrollY = 0;
  let intersecting = false;
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

<svelte:window bind:scrollY />
<IntersectionObserver element={rootEl} bind:intersecting>
  <div
    bind:this={rootEl}
    class={twMerge(
      'grid w-[85%] grid-cols-12  gap-[30px]',
      $$props.class ?? '',
    )}
  >
    <div class="col-span-4">
      <figure bind:this={firstImageEl}>
        <SanityImage
          class="aspect-square w-full rounded-[20px] object-cover"
          sizes="30vw"
          src={firstImage}
          alt={firstImage?.alt}
          imageUrlBuilder={imageBuilder}
        />
        {#if !!firstImage?.caption}
          <figcaption
            class="pl-[20px] pt-[20px] text-title-2 font-light text-sonic-silver"
          >
            {firstImage.caption}
          </figcaption>
        {/if}
      </figure>
    </div>
    <div class="col-span-8">
      <figure>
        <SanityImage
          sizes="70vw"
          src={secondImage}
          alt={secondImage?.alt}
          class="h-full w-full rounded-[20px]"
          imageUrlBuilder={imageBuilder}
        />
        {#if !!secondImage?.caption}
          <figcaption
            class="pl-[20px] pt-[20px] text-title-2 font-light text-sonic-silver"
          >
            {secondImage.caption}
          </figcaption>
        {/if}
      </figure>
    </div>
  </div>
</IntersectionObserver>
