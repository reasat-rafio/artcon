<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  export let active: boolean;
  export let artwork: SanityAsset;

  const x = tweened(active ? 1.4 : 0.6, {
    duration: 600,
    easing: cubicInOut,
  });
  const y = tweened(active ? 1 : 0.4, {
    duration: 600,
    easing: cubicInOut,
  });

  $: $x = active ? 1.4 : 0.6;
  $: $y = active ? 1 : 0.5;
</script>

<div class="relative flex h-full flex-[0_0_50%] items-center justify-center">
  <div style="transform: scale({$x}, {$y});">
    <figure class={active ? 'translate-x-[-10%]' : 'translate-x-[-30%]'}>
      <SanityImage
        class="h-full w-full rounded object-cover "
        sizes="60vw"
        src={artwork}
        imageUrlBuilder={imageBuilder}
      />
    </figure>
  </div>
</div>

<style>
</style>
