<script lang="ts">
  import { goto } from '$app/navigation';
  import { delay } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import uiStore from '@/store/ui';
  import { slide } from 'svelte/transition';
  import type { Asset } from '@/lib/types/common.types';
  import { imageBuilder } from '@/lib/sanity/sanityClient';

  export let index: number;
  export let href: string;
  export let sliderImageVideo: Asset;
  export let windowWidth = 0;

  const onClickAction = async () => {
    uiStore.setActivePreview(index);
    await delay(600);
    goto(href);
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />
<a
  {href}
  data-sveltekit-preload-data
  class="group pointer-events-auto relative h-[100dvh] w-full overflow-hidden lg:w-[600px] xl:w-[785px]"
  on:click|preventDefault={onClickAction}>
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
  <slot />
</a>

{#if index === $uiStore.selectedPreviewIndex && innerWidth >= 1024}
  <div
    in:slide={{ axis: 'x', duration: 600 }}
    out:slide={{ axis: 'x', duration: 500 }}
    class="bg-white lg:w-[calc(100vw-600px)] xl:w-[calc(100vw-785px)]" />
{/if}
