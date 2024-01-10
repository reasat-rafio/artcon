<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonImageAsset } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';

  export let props: CommonImageAsset;
  $: ({ image } = props);

  let sectionEl: HTMLDivElement;
  let imageContainerEl: HTMLDivElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(imageContainerEl, {
        scale: 1.15,
        scrollTrigger: {
          trigger: sectionEl,
          start: '55% center',
          end: 'bottom top',
          scrub: 1,
          onEnter: () => {
            console.log('enter');
          },
          onLeave: () => {
            console.log('leave');
          },
        },
      });
    });

    return () => ctx.revert();
  });
</script>

<div bind:this={sectionEl} class="h-screen w-full overflow-hidden">
  <div bind:this={imageContainerEl} class="fixed left-0 top-0 h-full w-full">
    <SanityImage
      src={image}
      sizes="100vw"
      class="h-full w-full bg-cover bg-center object-cover"
      alt={image.alt}
      imageUrlBuilder={imageBuilder} />
  </div>
</div>

<style>
  div {
    clip-path: inset(0);
  }
</style>
