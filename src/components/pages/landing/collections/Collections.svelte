<script lang="ts">
  import { goto } from '$app/navigation';
  import { delay } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import uiStore from '@/store/ui';
  import { slide } from 'svelte/transition';

  export let props: CollectionsProps;
  $: ({ collections } = props);

  let rootEl: HTMLElement;
  let containerEl: HTMLDivElement;
  let activeIndex: null | number = null;
  const DEFAULT_COLUMN_W_PERCENTAGE = 30;
  $: containerWidth =
    collections?.length * DEFAULT_COLUMN_W_PERCENTAGE +
    50 +
    ($uiStore.seclectedPreviewIndex !== null ? 70 : 0);

  function animation(
    node: HTMLElement,
    _: { index: number; activeIndex: number | null },
  ) {
    node.style.width = `${DEFAULT_COLUMN_W_PERCENTAGE}vw`;
  }
</script>

<section class="translate-x-[100vw]" bind:this={rootEl}>
  <div bind:this={containerEl} style="width: {containerWidth}vw;" class="flex">
    {#each collections as collection, index}
      {#if collection._type === 'vr'}
        <a
          href="/preview/vr/{collection.slug.current}"
          on:click|preventDefault={async (e) => {
            if (e.target instanceof HTMLElement) {
              console.log(e.target.getBoundingClientRect());
            }
            uiStore.setActivePreview(index);
            await delay(600);
            goto(`/preview/vr/${collection.slug.current}`);
          }}
          use:animation={{ index, activeIndex }}
          class="relative h-screen"
        >
          <SanityImage
            class="h-full w-full object-cover"
            src={collection.previewImage}
            sizes="30vw"
            imageUrlBuilder={imageBuilder}
            alt={collection.name}
          />
        </a>

        {#if index === $uiStore.seclectedPreviewIndex}
          <div
            in:slide={{ axis: 'x', duration: 400 }}
            class="w-[70vw] bg-white"
          />
        {/if}
      {/if}
    {/each}
  </div>
</section>
