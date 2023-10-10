<script lang="ts">
  import { goto } from '$app/navigation';
  import { delay } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import uiStore from '@/store/ui';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { slide } from 'svelte/transition';

  export let index: number;
  export let href: string;
  export let image: SanityImageAssetDocument;
  export let DEFAULT_COLUMN_W_PERCENTAGE: number = 38;
  export let windowWidth = 0;

  // TODO caculate this on top component for better performance
  $: width = windowWidth >= 1024 ? `${DEFAULT_COLUMN_W_PERCENTAGE}vw` : '100%';

  const onClickAction = async () => {
    uiStore.setActivePreview(index);
    await delay(600);
    goto(href);
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />
<!-- style="width: {width};" -->
<a
  data-sveltekit-preload-data
  {href}
  class="group pointer-events-auto relative h-screen w-full lg:w-[38vw]"
  on:click|preventDefault={onClickAction}
>
  <SanityImage
    class="h-full w-full object-cover"
    src={image}
    sizes="(min-width:1024px) 40vw, 100vw"
    imageUrlBuilder={imageBuilder}
    alt={image?.alt ?? 'Collection Preview'}
  />
  <slot />
</a>

{#if index === $uiStore.seclectedPreviewIndex && innerWidth >= 1024}
  <div
    in:slide={{ axis: 'x', duration: 500 }}
    out:slide={{ axis: 'x', duration: 600 }}
    style="width: {100 - DEFAULT_COLUMN_W_PERCENTAGE}vw;"
    class="bg-white"
  />
{/if}
