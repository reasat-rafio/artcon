<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonHeroProps } from '@/lib/types/common.types';

  export let asset: CommonHeroProps['asset'];
  $: ({ image, video } = asset || {});
</script>

{#if !!image}
  <SanityImage
    draggable={false}
    class="absolute h-full w-full object-cover"
    lqip
    sizes="100vw"
    alt={image?.alt || 'Image'}
    src={image}
    imageUrlBuilder={imageBuilder} />
{:else if !!video}
  <video
    class="absolute h-full w-full object-cover"
    width="100%"
    height="100%"
    disablePictureInPicture
    controlsList="nodownload noplaybackrate"
    controls={false}
    playsInline
    autoPlay
    muted
    loop>
    {#if video?.mov}
      <source src={video.mov} type="video/mp4; codecs=hvc1" />
    {/if}
    {#if video?.webm}
      <source src={video.webm} type="video/webm" />
    {/if}
    Sorry, your browser doesn&apos;t support embedded videos.
  </video>
{/if}
