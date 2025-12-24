<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let image: SanityAsset;
  export let variant: 'fit' | 'cover' = 'cover';
</script>

{#if variant === 'cover'}
  <figure
    class={cn('h-auto max-3xl:aspect-video 3xl:h-[14.125rem] overflow-hidden rounded-[12px]', $$props.class)}>
    <SanityImage
      imageUrlBuilder={imageBuilder}
      class="h-full w-full rounded-[12px] object-cover"
      sizes="(min-width:640px) 35vw, 100vw"
      src={image}
      alt={image?.alt} />
  </figure>
{:else if variant === 'fit'}
  <figure class={cn('h-auto sm:h-[25rem] overflow-hidden rounded-[12px]', $$props.class)}>
    <SanityImage
      imageUrlBuilder={imageBuilder}
      class="h-full w-full object-contain object-bottom"
      sizes="(min-width:640px) 35vw, 100vw"
      src={image}
      alt={image?.alt} />
  </figure>
{/if}
