<script lang="ts">
  import { slide } from 'svelte/transition';
  import uiStore from '@/store/ui';
  import { delay } from '@/lib/helper';
  import type { VrPreviewProps } from '@/lib/types/vrPreview';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { goto } from '$app/navigation';

  export let props: VrPreviewProps & {
    index: number;
    DEFAULT_COLUMN_W_PERCENTAGE: number;
  };
  $: ({ slug, index, name, previewImage, DEFAULT_COLUMN_W_PERCENTAGE } = props);
  $: width = DEFAULT_COLUMN_W_PERCENTAGE;
</script>

<a
  style="width: {width}vw;"
  href="/preview/vr/{slug.current}"
  on:click|preventDefault={async (e) => {
    if (e.target instanceof HTMLElement) {
      console.log(e.target.getBoundingClientRect());
    }
    uiStore.setActivePreview(index);
    await delay(600);
    goto(`/preview/vr/${slug.current}`);
  }}
  class="relative h-screen"
>
  <SanityImage
    class="h-full w-full object-cover"
    src={previewImage}
    sizes="30vw"
    imageUrlBuilder={imageBuilder}
    alt={name}
  />
</a>

{#if index === $uiStore.seclectedPreviewIndex}
  <div
    in:slide={{ axis: 'x', duration: 400 }}
    style="width: {100 - DEFAULT_COLUMN_W_PERCENTAGE}vw;"
    class="bg-white"
  />
{/if}
