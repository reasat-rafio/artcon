<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  type El = 'div' | 'a' | undefined;
  export let el: El = 'div';
  export let image: SanityAsset;
  export let href: string | undefined = undefined;
  export let caption: string | undefined = undefined;
</script>

<svelte:element this={el} class={$$props.class} {href}>
  <figure>
    <SanityImage
      class="aspect-square w-full rounded-[20px] object-cover"
      sizes="30vw"
      src={image}
      alt={image.alt}
      imageUrlBuilder={imageBuilder}
    />
    {#if !!image?.caption || caption}
      <figcaption
        class="pl-[20px] pt-[20px] text-title-2 font-light text-sonic-silver"
      >
        {caption ?? image?.caption}
      </figcaption>
    {/if}
  </figure>
</svelte:element>
