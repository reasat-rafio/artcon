<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonHeroProps } from '@/lib/types/common.types';

  export let asset: CommonHeroProps['asset'];
  let { image, video } = asset;
  export let el: HTMLElement;
</script>

<div bind:this={el} class="absolute h-[100%] w-[105%] translate-x-[-1%]">
  {#if !!image}
    <figure class="h-full w-full object-cover">
      <SanityImage
        draggable={false}
        class="h-full w-full object-cover"
        lqip
        sizes="100vw"
        alt={image.alt}
        src={image}
        imageUrlBuilder={imageBuilder} />
    </figure>
  {:else if !!video}
    <video
      class="h-full w-full object-cover"
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
