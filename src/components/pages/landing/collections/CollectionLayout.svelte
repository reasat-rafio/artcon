<script lang="ts">
  import { goto } from '$app/navigation';
  import { delay } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import uiStore from '@/store/ui';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import type { Slug } from 'sanity';
  import { slide } from 'svelte/transition';

  export let index: number;
  export let href: string;
  export let image: SanityImageAssetDocument;
  export let DEFAULT_COLUMN_W_PERCENTAGE: number;

  $: width = DEFAULT_COLUMN_W_PERCENTAGE;

  const onClickAction = async () => {
    uiStore.setActivePreview(index);
    await delay(600);
    goto(href);
  };
</script>

<a
  data-sveltekit-preload-data
  {href}
  style="width: {width}vw;"
  class="pointer-events-auto relative h-screen"
  on:click|preventDefault={onClickAction}
>
  <SanityImage
    class="h-full w-full object-cover"
    src={image}
    sizes="30vw"
    imageUrlBuilder={imageBuilder}
    alt={image?.alt ?? 'Collection Preview'}
  />
  <slot />
</a>

{#if index === $uiStore.seclectedPreviewIndex}
  <div
    in:slide={{ axis: 'x', duration: 500 }}
    out:slide={{ axis: 'x', duration: 600 }}
    style="width: {100 - DEFAULT_COLUMN_W_PERCENTAGE}vw;"
    class="bg-white"
  />
{/if}
