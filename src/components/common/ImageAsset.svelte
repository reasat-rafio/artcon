<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonImageAsset } from '@/lib/types/common.types';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  export let props: CommonImageAsset;
  $: ({ image } = props);

  function animation(node: HTMLElement) {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(node, {
        scale: 1.15,
        scrollTrigger: {
          trigger: node,
          start: 'top center',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
    return {
      destroy() {
        ctx.revert();
      },
    };
  }
</script>

<div class="relative h-screen w-full overflow-hidden">
  <div use:animation class="fixed left-0 top-0 h-full w-full">
    <SanityImage
      src={image}
      sizes="100vw"
      class="h-full w-full bg-cover bg-center object-cover "
      alt={image.alt}
      imageUrlBuilder={imageBuilder} />
  </div>
</div>

<style>
  div {
    clip-path: inset(0);
  }
</style>
