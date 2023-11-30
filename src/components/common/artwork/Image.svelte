<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Information } from '@/lib/types/collection-detail.types';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { cubicInOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  export let active: boolean;
  export let artwork: SanityImageAssetDocument;
  export let information: Information;
  export let innerWidth = 0;
  export let isSingleArtwork: boolean;

  const x = tweened(active ? 1 : 0.6, {
    duration: 500,
    easing: cubicInOut,
  });
  const y = tweened(active ? 1 : 0.6, {
    duration: 500,
    easing: cubicInOut,
  });

  $: $x = !isSingleArtwork
    ? innerWidth >= 1024
      ? active
        ? 1
        : 0.6
      : active
      ? 0.95
      : 1
    : 1;
  $: $y = !isSingleArtwork
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
<div
  class="relative h-full flex-[0_0_90%] max-lg:pl-[1.25rem] lg:flex lg:flex-[0_0_50%] lg:items-center lg:justify-center">
  <div>
    <div style="transform: scale({$x}, {$y});">
      <figure class="relative lg:translate-x-[-10%]">
        <SanityImage
          class="h-full w-full rounded-[25px] object-cover"
          sizes="(min-width:1024px) 60vw, 100vw"
          src={artwork}
          imageUrlBuilder={imageBuilder}
          alt={artwork.alt} />

        <figurecaption class={cn('caption whitespace-pre-wrap')}>
          <ul
            class="flex flex-col flex-wrap gap-y-[1px] text-[0.875rem] font-light">
            <li class="leading-none">{information.media}</li>
            <li>{information.size}</li>
            <li>{information.artDate.creationDetails}</li>
            <li>{information.frame}</li>
            {#if !!information?.moreInformation?.length}
              {#each information.moreInformation as info}
                <li>{info}</li>
              {/each}
            {/if}
          </ul>
        </figurecaption>
      </figure>
    </div>
  </div>
</div>
