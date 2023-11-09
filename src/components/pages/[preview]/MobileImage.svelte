<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Asset } from '@/lib/types/common.types';

  export let sliderImageVideo: Asset;
</script>

<div class="fixed inset-0 -z-10 block overflow-hidden lg:hidden">
  {#if !!sliderImageVideo?.image}
    <SanityImage
      lqip
      draggable={false}
      class="absolute h-full w-full object-cover"
      sizes="(min-width:1024px) 40vw, 100vw"
      alt={sliderImageVideo.image.alt}
      src={sliderImageVideo.image}
      imageUrlBuilder={imageBuilder} />
  {:else if !!sliderImageVideo?.video}
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
      <source src={sliderImageVideo.video?.mov} type="video/mp4; codecs=hvc1" />
      <source src={sliderImageVideo.video?.webm} type="video/webm" />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  {/if}
</div>
