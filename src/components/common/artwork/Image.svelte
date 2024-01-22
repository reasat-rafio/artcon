<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Information } from '@/lib/types/collection-detail.types';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { createEventDispatcher } from 'svelte';
  import { cubicInOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  export let active: boolean;
  export let artwork: SanityImageAssetDocument;
  export let information: Information;
  export let innerWidth = 0;
  export let isSingleArtwork: boolean;
  export let length: number;

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
      <figure class="relative">
        <SanityImage
          class="h-full w-full rounded-[25px] object-cover"
          sizes="(min-width:1024px) 60vw, 100vw"
          src={artwork}
          imageUrlBuilder={imageBuilder}
          alt={artwork.alt} />

        <figurecaption class={cn('caption whitespace-pre-wrap  text-left')}>
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
</button>
