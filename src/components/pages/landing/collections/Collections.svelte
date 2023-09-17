<script lang="ts">
  import { goto } from '$app/navigation';
  import { delay } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  export let props: CollectionsProps;
  $: ({ collections } = props);

  let rootEl: HTMLElement;
  let windowWidth = 0;
  let containerEl: HTMLDivElement;
  let activeIndex: null | number = null;
  const defaultColumWidthInPercentage = 100 / 3;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const containerWidth = containerEl.getBoundingClientRect().width;
    const amountToScroll = containerWidth;

    const tween = gsap.to(containerEl, {
      x: -amountToScroll,
      duration: 3,
      ease: 'none',
    });

    ScrollTrigger.create({
      trigger: rootEl,
      start: 'top top',
      end: '+=' + amountToScroll,
      pin: true,
      animation: tween,
      scrub: 3,
      markers: true,
    });
  });

  function init(node: HTMLElement) {}

  function animation(
    node: HTMLElement,
    _: { index: number; activeIndex: number | null },
  ) {
    // node.style.width = `${defaultColumWidthInPercentage}vw`;
  }
</script>

<svelte:window bind:innerWidth={windowWidth} />
<section class="h-screen translate-x-[100vw]" bind:this={rootEl}>
  <div bind:this={containerEl} use:init class="flex h-full w-max">
    {#each collections as collection, index}
      {#if collection._type === 'vr'}
        <a
          style="width: {defaultColumWidthInPercentage}vw;"
          href="/preview/vr/{collection.slug.current}"
          on:click|preventDefault={async (e) => {
            // if (e.target instanceof HTMLElement) {
            //   console.log(e.target.getBoundingClientRect());
            // }
            // uiStore.setActivePreview(index);
            // await delay(600);
            // goto(`/preview/vr/${collection?.slug?.current}`);
          }}
          use:animation={{ index, activeIndex }}
          class="relative h-full"
        >
          <SanityImage
            class="h-full w-full object-cover"
            src={collection.previewImage}
            sizes="30vw"
            imageUrlBuilder={imageBuilder}
            alt={collection.name}
          />
        </a>

        <!-- {#if index === $uiStore.seclectedPreviewIndex}
          <div
            in:slide={{ axis: 'x', duration: 400 }}
            class="w-[70vw] bg-white"
          />
        {/if} -->
      {/if}
    {/each}
  </div>
</section>
