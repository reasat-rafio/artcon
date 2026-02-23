<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Asset } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let asset: Asset;
  $: ({ image, video } = asset);
</script>

<div
  class={twMerge(
    'relative aspect-video h-full overflow-hidden rounded-[12px]',
    $$props.class,
  )}>
  {#if !!image}
    <SanityImage
      draggable={false}
      class="h-full w-full object-cover transition-transform ease-in-out hover:scale-105"
      style="transition-duration: 600ms;"
      lqip
      sizes="100vw"
      alt={image.alt}
      src={image}
      imageUrlBuilder={imageBuilder} />
  {:else if !!video}
    <video
      class="absolute h-full w-full object-cover transition-transform ease-in-out hover:scale-105"
      style="transition-duration: 600ms;"
      width="100%"
      height="100%"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate"
      controls={false}
      playsInline
      autoPlay
      muted
      loop>
      <source src={video?.mov} type="video/mp4; codecs=hvc1" />
      <source src={video?.webm} type="video/webm" />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  {/if}
</div>
