<script lang="ts">
  import Overlay from '@/components/common/hero/Overlay.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Asset } from '@/lib/types/common.types';

  export let sliderImageVideo: Asset;
</script>

<div class="relative overflow-hidden max-lg:hidden lg:w-[600px] xl:w-[785px]">
  <Overlay />

  {#if !!sliderImageVideo?.image}
    <SanityImage
      id="previewImage"
      lqip
      draggable={false}
      class="absolute h-full w-full origin-center object-cover"
      sizes="(min-width:1024px) 40vw, 100vw"
      alt={sliderImageVideo.image.alt}
      src={sliderImageVideo.image}
      imageUrlBuilder={imageBuilder} />
  {:else if !!sliderImageVideo?.video}
    <video
      id="previewImage"
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
