<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import type { PortableTextBlock } from 'sanity';
  import { toPlainText } from '@portabletext/svelte';
  import { twMerge } from 'tailwind-merge';

  export let active: boolean;
  export let artwork: SanityImageAssetDocument;
  export let information: PortableTextBlock[];
  export let innerWidth = 0;
  export let isSingleArtwork: boolean;

  const x = tweened(active ? 1.2 : 0.6, {
    duration: 600,
    easing: cubicInOut,
  });
  const y = tweened(active ? 1 : 0.4, {
    duration: 600,
    easing: cubicInOut,
  });

  $: $x = !isSingleArtwork
    ? innerWidth >= 1024
      ? active
        ? 1.2
        : 0.6
      : 1
    : 1;
  $: $y = !isSingleArtwork ? (innerWidth >= 1024 ? (active ? 1 : 0.5) : 1) : 1;
</script>

<svelte:window bind:innerWidth />
<div
  class="relative h-full flex-[0_0_90%] max-lg:pl-[1.25rem] lg:flex lg:flex-[0_0_50%] lg:items-center lg:justify-center"
>
  <div>
    <div style="transform: scale({$x}, {$y});">
      <figure
        class={twMerge(
          'relative',
          !isSingleArtwork
            ? active
              ? 'lg:translate-x-[-15%]'
              : 'lg:translate-x-[-25%]'
            : '',
        )}
      >
        <SanityImage
          class="h-full w-full rounded-[25px] object-cover"
          sizes="(min-width:1024px) 60vw, 100vw"
          src={artwork}
          imageUrlBuilder={imageBuilder}
          alt={artwork.alt}
        />

        <figurecaption
          class={twMerge(
            'caption whitespace-pre-wrap',
            !active &&
              'lg:translate-x-[20%] lg:translate-y-[25%] lg:scale-x-[1.4] lg:scale-y-150 lg:transition-transform lg:duration-100',
          )}
        >
          {toPlainText(information)}
        </figurecaption>
      </figure>
    </div>
  </div>
</div>
