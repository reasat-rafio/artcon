<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
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
    'group flex h-fit items-center justify-center space-x-[20px]',
    $$props.class,
  )}>
  <figure class="h-[3.5rem] w-[3.5rem] rounded-full">
    <SanityImage
      class="h-full w-full rounded-full object-cover"
      src={image}
      alt={title}
      sizes="120px"
      imageUrlBuilder={imageBuilder} />
  </figure>
  <div class="head-8 flex-1 space-y-[0.438rem] font-optiberling-agency">
    <h5>{title}</h5>
    <p class="text-[#77777C]">{subtitle}</p>
  </div>
</svelte:element>
