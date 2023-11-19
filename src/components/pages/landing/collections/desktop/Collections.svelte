<script lang="ts">
  import Exhibition from '@/components/pages/landing/collections/Exhibition.svelte';
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import uiStore from '@/store/ui';
  import { gsap } from 'gsap';
  import { Observer } from 'gsap/dist/Observer';
  import { onMount } from 'svelte';
  import { expoOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import Collection from '../Collection.svelte';
  import previewMediaColumnWidthInPercentage from '@/store/previewMediaColumnWidthInPercentage';

  export let props: CollectionsProps;
  export let rootEl: HTMLElement;

  $: ({ collections } = props);

  let windowWidth = 0;
  const tweenedScrollAmount = tweened(0, { duration: 1500, easing: expoOut });

  const containerWidth = tweened($uiStore.containerWidth, {
    duration: 200,
    easing: expoOut,
  });

  $: if (rootEl) rootEl.scrollLeft = $tweenedScrollAmount;

  $: {
    // SCROLL TO THE ACTIVE SLIDE
    if ($uiStore.selectedPreviewIndex != null) {
      const offSetWidth =
        (windowWidth / 100) * $previewMediaColumnWidthInPercentage;
      tweenedScrollAmount.set(
        windowWidth + offSetWidth * $uiStore.selectedPreviewIndex,
        { duration: 600 },
      );
    }
  }

  $: {
    const totalCollectionsProjectedWidth =
      collections?.length * $previewMediaColumnWidthInPercentage;
    const contactWidth = $previewMediaColumnWidthInPercentage;
    const collectionContentPlaceHolderWidth =
      $uiStore.selectedPreviewIndex !== null
        ? 100 - $previewMediaColumnWidthInPercentage
        : 0;
    const totalWidths =
      totalCollectionsProjectedWidth +
      contactWidth +
      collectionContentPlaceHolderWidth;

    uiStore.setContainerWidth(totalWidths);
    containerWidth.set($uiStore.containerWidth, { duration: 0 });
  }

  onMount(() => {
    if ($uiStore.selectedPreviewIndex != null) {
      const offSetWidth =
        (windowWidth / 100) * $previewMediaColumnWidthInPercentage;
      tweenedScrollAmount.set(
        windowWidth + offSetWidth * $uiStore.selectedPreviewIndex,
        { duration: 0 },
      );
      uiStore.setActivePreview(null);
    }

    gsap.registerPlugin(Observer);
    const el = document.querySelector('#landing-page');
    gsap.to(el, {
      duration: 0,
      y: 0,
    });

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
          props={{
            ...collection,
            index,
          }} />
      {:else}
        <Collection
          props={{
            ...collection,
            index,
          }} />
      {/if}
    {/each}
  </div>
</section>
