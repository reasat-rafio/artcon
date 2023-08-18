<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { VRExhibition } from '@/lib/types/common.types';

  export let vrExhibition: VRExhibition;
  $: ({ image, url } = vrExhibition);

  let showIframe = false;
</script>

<section class={$$props.class}>
  <div class="mx-auto aspect-video h-full max-h-[655px] max-w-[1167px]">
    {#if showIframe}
      <iframe
        allowfullscreen
        class="h-full w-full overflow-hidden rounded-[20px]"
        src={url}
        title="exbibition preview"
      />
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <figure class="cursor-pointer" on:click={() => (showIframe = true)}>
        <SanityImage
          class="h-full w-full rounded-[20px] object-cover"
          sizes="70vw"
          src={image}
          alt={image.alt}
          imageUrlBuilder={imageBuilder}
        />
        <figcaption class="pl-[20px] pt-[20px] text-title-2 text-sonic-silver">
          {image.caption}
        </figcaption>
      </figure>
    {/if}
  </div>
</section>
