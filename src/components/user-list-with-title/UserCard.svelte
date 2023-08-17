<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import H8 from '../ui/H8.svelte';
  import { twMerge } from 'tailwind-merge';

  type EL = 'div' | 'a' | undefined;
  export let el: EL = 'div';
  export let title: string;
  export let url: string | undefined = undefined;
  export let image: SanityAsset;
  export let subtitle: string;
</script>

<svelte:element
  this={el}
  href={url}
  class={twMerge(
    'group flex items-center justify-center space-x-[20px]',
    $$props.class ?? ''
  )}
>
  <figure class="h-[112px] w-[112px]">
    <SanityImage
      class="h-full w-full rounded-full object-cover"
      src={image}
      alt={title}
      sizes="120px"
      imageUrlBuilder={imageBuilder}
    />
  </figure>
  <div class="flex-1 space-y-[7px]">
    <H8>{title}</H8>
    <H8 el="p" class="text-[#77777C]">{subtitle}</H8>
  </div>
</svelte:element>
