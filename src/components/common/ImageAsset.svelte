<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonImageAsset } from '@/lib/types/common.types';
  import uiStore from '@/store/ui';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import IntersectionObserver from 'svelte-intersection-observer';

  export let props: CommonImageAsset;
  $: ({ image } = props);

  let sectionEl: HTMLDivElement;
  let imageContainerEl: HTMLDivElement;
  let intersecting = false;

  onMount(() => {
    setPosition();

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(imageContainerEl, {
        scale: 1.15,
        scrollTrigger: {
          trigger: sectionEl,
          start: '70% center',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  });

  function setPosition() {
    if (intersecting) {
      const id = image?.asset?._id;
      const assetExist = $uiStore.imageAssetPos.find(
        (asset) => asset?.id === id,
      );
      if (assetExist) return;

      const { y } = sectionEl?.getBoundingClientRect();
      uiStore.pushActiveImageAssetPos({ id, y: y + window.scrollY });
    } else {
      const id = image?.asset?._id;
      uiStore.removeActiveImageAssetPos(id);
    }
  }
</script>

<svelte:window on:scroll={setPosition} on:resize={setPosition} />
<IntersectionObserver element={sectionEl} bind:intersecting>
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
</IntersectionObserver>

<style>
  div {
    clip-path: inset(0);
  }
</style>
