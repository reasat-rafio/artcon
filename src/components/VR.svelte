<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { VR } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let vr: VR;
  $: ({ previewImage, url } = vr);

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
        on:click={() => (showIframe = true)}
        on:keypress={() => (showIframe = true)}
      >
        <figure class="cursor-pointer">
          <SanityImage
            class="h-full w-full rounded-[20px] object-cover"
            sizes="70vw"
            src={previewImage}
            alt={previewImage.alt}
            imageUrlBuilder={imageBuilder}
          />
          <figcaption
            class="pl-[20px] pt-[20px] text-title-2 text-sonic-silver"
          >
            {previewImage.caption}
          </figcaption>
        </figure>
      </div>
    {/if}
  </div>
</section>
