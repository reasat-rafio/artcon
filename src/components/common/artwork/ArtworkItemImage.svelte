<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ArtworkItem } from '@/lib/types/common.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import { cubicInOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { createEventDispatcher } from 'svelte';

  export let active: boolean;
  export let artwork: ArtworkItem;
  export let innerWidth = 0;
  export let isSingleArtwork: boolean;

  const dispatch = createEventDispatcher();

  const scale = tweened(active ? 1 : 0.6, {
    duration: 500,
    easing: cubicInOut,
  });

  $: $scale = !isSingleArtwork
    ? innerWidth >= 1024
      ? active
        ? 1
        : 0.6
      : active
        ? 0.95
        : 1
    : 1;
</script>

<svelte:window bind:innerWidth />
<button
  on:click={() => dispatch('triggerPopup')}
  class={cn(
    'relative h-full flex-[0_0_90%] pl-[1.25rem] outline-none lg:flex lg:flex-[0_0_50.01%]',
  )}>
  <div>
    <div style="transform: scale({$scale});">
      <figure class="group relative overflow-hidden rounded-[25px]">
        <SanityImage
          class="h-full w-full rounded-[25px] object-cover"
          sizes="(min-width:1024px) 60vw, 100vw"
          src={artwork.image}
          imageUrlBuilder={imageBuilder}
          alt="" />

        {#if artwork.description && artwork.description.length > 0}
          <figcaption class={cn('caption whitespace-pre-wrap text-left')}>
            <div class="prose prose-sm font-light text-[0.875rem] leading-tight">
              <PortableText value={artwork.description} />
            </div>
          </figcaption>
        {/if}
      </figure>
    </div>
  </div>
</button>
