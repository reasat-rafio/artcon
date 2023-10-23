<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { VR } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let vr: VR;
  $: ({ placeholderImage, url } = vr);

  let showIframe = false;
</script>

<section {...$$restProps} class={twMerge($$props.class)}>
  <div
    class="mx-auto aspect-video h-full max-h-[655px] max-w-[1167px] overflow-hidden"
  >
    {#if showIframe}
      <iframe
        allowfullscreen
        class="h-full w-full overflow-hidden rounded-[20px] bg-gray-300"
        src={url}
        title="exbibition preview"
      />
    {:else}
      <div
        class="h-full w-full"
        tabindex="0"
        role="button"
        aria-pressed="false"
        on:click={() => (showIframe = true)}
        on:keypress={() => (showIframe = true)}
      >
        <figure class="h-full w-full cursor-pointer">
          <SanityImage
            class="h-full w-full rounded-[20px] object-cover"
            sizes="70vw"
            src={placeholderImage}
            alt={placeholderImage.alt}
            imageUrlBuilder={imageBuilder}
          />
          <figcaption class="caption">
            {placeholderImage.caption}
          </figcaption>
        </figure>
      </div>
    {/if}
  </div>
</section>
