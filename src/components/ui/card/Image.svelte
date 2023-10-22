<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { twMerge } from 'tailwind-merge';

  export let image: SanityAsset;
  export let variant: 'fit' | 'cover' = 'cover';
</script>

{#if variant === 'cover'}
  <figure class={twMerge('h-[11.3125rem] sm:h-[14.125rem]', $$props.class)}>
    <SanityImage
      imageUrlBuilder={imageBuilder}
      class="h-full w-full rounded-[12px] object-cover"
      sizes="(min-width:640px) 35vw, 100vw"
      src={image}
      alt={image?.alt}
    />
  </figure>
{:else if variant === 'fit'}
  <figure class={twMerge('h-auto sm:h-[25rem]', $$props.class)}>
    <SanityImage
      imageUrlBuilder={imageBuilder}
      class="h-full w-full object-contain object-bottom"
      sizes="(min-width:640px) 35vw, 100vw"
      src={image}
      alt={image?.alt}
    />
  </figure>
{/if}
