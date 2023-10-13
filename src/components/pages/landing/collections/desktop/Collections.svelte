<script lang="ts">
  import Vr from '@/components/pages/landing/collections/VR.svelte';
  import Exhibition from '@/components/pages/landing/collections/Exhibition.svelte';
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import uiStore from '@/store/ui';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { expoOut } from 'svelte/easing';
  import { gsap } from 'gsap';
  import { Observer } from 'gsap/dist/Observer';
  import Collection from '../Collection.svelte';

  export let props: CollectionsProps;
  export let rootEl: HTMLElement;
  $: ({ collections } = props);

  let windowWidth = 0;
  const DEFAULT_COLUMN_W_PERCENTAGE = 38;
  const tweenedScrollAmount = tweened(0, { duration: 1500, easing: expoOut });
  const containerWidth = tweened($uiStore.containerWidth, {
    duration: 200,
    easing: expoOut,
  });

  $: if (rootEl) rootEl.scrollLeft = $tweenedScrollAmount;

  $: {
    // SCROLL TO THE ACTIVE SLIDE
    if ($uiStore.seclectedPreviewIndex != null) {
      const offSetWidth = (windowWidth / 100) * DEFAULT_COLUMN_W_PERCENTAGE;
      tweenedScrollAmount.set(
        windowWidth + offSetWidth * $uiStore.seclectedPreviewIndex,
        { duration: 600 },
      );
    }
  }

  $: {
    const collectionsWidth = collections?.length * DEFAULT_COLUMN_W_PERCENTAGE;
    const contactWidth = DEFAULT_COLUMN_W_PERCENTAGE;
    const collectionContentPlaceHolderWidth =
      $uiStore.seclectedPreviewIndex !== null
        ? 100 - DEFAULT_COLUMN_W_PERCENTAGE
        : 0;
    const totalWidths =
      collectionsWidth + contactWidth + collectionContentPlaceHolderWidth;

    uiStore.setContaienrWidth(totalWidths);
    containerWidth.set($uiStore.containerWidth, { duration: 0 });
  }

  onMount(() => {
    if ($uiStore.seclectedPreviewIndex != null) {
      const offSetWidth = (windowWidth / 100) * DEFAULT_COLUMN_W_PERCENTAGE;
      tweenedScrollAmount.set(
        windowWidth + offSetWidth * $uiStore.seclectedPreviewIndex,
        { duration: 0 },
      );
      uiStore.setActivePreview(null);
    }

    gsap.registerPlugin(Observer);
    let ctx = gsap.context(() => {
      Observer.create({
        target: window,
        type: 'wheel,scrool,touch',

        onChange: (self) => {
          tweenedScrollAmount.set(
            rootEl?.scrollLeft + self.deltaY + self.velocityY * 0.05,
          );
        },
      });
    });

    return () => ctx.revert();
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />
<section class="pointer-events-none hidden translate-x-[100vw] lg:block">
  <div style="width: {$containerWidth}vw;" class="flex">
    {#each collections as collection, index}
      {#if collection._type === 'exhibition'}
        <Exhibition
          props={{ ...collection, index, DEFAULT_COLUMN_W_PERCENTAGE }}
        />
      {:else}
        <Collection
          props={{ ...collection, index, DEFAULT_COLUMN_W_PERCENTAGE }}
        />
      {/if}
    {/each}
  </div>
</section>
