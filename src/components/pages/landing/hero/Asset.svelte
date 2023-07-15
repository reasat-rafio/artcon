<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { HeroProps } from '@/lib/types/landing.types';

  export let asset: HeroProps['asset'];
  let { image, video } = asset;
</script>

{#if !!image}
  <SanityImage
    draggable={false}
    class="absolute object-cover w-full h-full"
    lqip
    sizes="100vw"
    alt={image.alt}
    src={image}
    imageUrlBuilder={imageBuilder}
  />
{:else if !!video}
  <video
    class="absolute object-cover w-full h-full"
    width="100%"
    height="100%"
    disablePictureInPicture
    controlsList="nodownload noplaybackrate"
    controls={false}
    playsInline
    autoPlay
    muted
    loop
  >
    <source src={video?.mov} type="video/mp4; codecs=hvc1" />
    <source src={video?.webm} type="video/webm" />
    Sorry, your browser doesn&apos;t support embedded videos.
  </video>
{/if}
