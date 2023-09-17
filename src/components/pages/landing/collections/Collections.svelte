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
  import uiStore from '@/store/ui';

  export let props: CollectionsProps;
  $: ({ collections } = props);

  let rootEl: HTMLElement;
  let windowWidth = 0;
  let containerEl: HTMLDivElement;
  let activeIndex: null | number = null;
  const DEFAULT_COLUMN_WIDTH_IN_PERCENTAGE = 100 / 3;

  onMount(() => {
    const amountToScroll = containerEl.getBoundingClientRect().width;
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(containerEl, {
      x: -amountToScroll,
      duration: 5,
      scrollTrigger: {
        trigger: rootEl,
        start: 'top top',
        end: '+=' + amountToScroll,
        pin: true,
        scrub: 3,
      },
    });
  });

  let scrollY = 0;

  $: console.log({
    windowWidth,
    space: containerEl?.getBoundingClientRect().width,
    scrollY,
    sum: containerEl?.getBoundingClientRect().width / 5,
  });
</script>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY />
<section class="h-screen translate-x-[100vw]" bind:this={rootEl}>
  <div bind:this={containerEl} class="flex h-full w-max">
    {#each collections as collection, index}
      {#if collection._type === 'vr'}
        <a
          id={collection._id}
          style="width: {DEFAULT_COLUMN_WIDTH_IN_PERCENTAGE}vw;"
          href="/preview/vr/{collection.slug.current}"
          on:click|preventDefault={async (e) => {
            if (e.target instanceof HTMLElement) {
              // gsap.to(window, { duration: 3, scrollTo: e.target });
              e.target.scrollIntoView();

              // console.log(e.target.getBoundingClientRect().left);
            }
            if ($uiStore.seclectedPreviewIndex === index)
              uiStore.setActivePreview(null);
            else uiStore.setActivePreview(index);

            // goto(`/preview/vr/${collection?.slug?.current}`);
          }}
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
            transition:slide={{ axis: 'x', duration: 400 }}
            class="w-[70vw] bg-white"
          />
        {/if} -->
      {/if}
    {/each}
  </div>
</section>
