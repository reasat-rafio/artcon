<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonImageAsset } from '@/lib/types/common.types';

  export let props: CommonImageAsset;
  $: ({ image } = props);
</script>

<div class="relative h-screen w-full">
  <SanityImage
    src={image}
    sizes="100vw"
    class="fixed left-0 top-0 h-full w-full bg-cover bg-center object-cover"
    alt={image.alt}
    imageUrlBuilder={imageBuilder} />
</div>

<style>
  div {
    clip-path: inset(0);
  }
</style>
