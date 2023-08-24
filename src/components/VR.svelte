<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { VR } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let vr: VR;
  $: ({
    cover: { image, video },
    url,
  } = vr);

  let showIframe = false;
</script>

<section class={twMerge($$props.class)}>
  <div class="mx-auto aspect-video h-full max-h-[655px] max-w-[1167px]">
    {#if showIframe}
      <iframe
        allowfullscreen
        class="h-full w-full overflow-hidden rounded-[20px]"
        src={url}
        title="exbibition preview"
      />
    {:else}
      <div
        tabindex="0"
        role="button"
        aria-pressed="false"
        class="relative h-full w-full overflow-hidden rounded-[20px] object-cover"
        on:click={() => (showIframe = true)}
        on:keypress={() => (showIframe = true)}
      >
        {#if !!image}
          <figure>
            <SanityImage
              draggable={false}
              class="absolute h-full w-full object-cover"
              lqip
              sizes="70vw"
              alt={image.alt}
              src={image}
              imageUrlBuilder={imageBuilder}
            />
            <figcaption
              class="pl-[20px] pt-[20px] text-title-2 text-sonic-silver"
            >
              {image.caption}
            </figcaption>
          </figure>
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
            loop
          >
            <source src={video?.mov} type="video/mp4; codecs=hvc1" />
            <source src={video?.webm} type="video/webm" />
            Sorry, your browser doesn&apos;t support embedded videos.
          </video>
        {/if}
      </div>
    {/if}
  </div>
</section>
