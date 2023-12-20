<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

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
  class={cn(
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
    <h4>{title}</h4>
    <p class="text-sonic-silver">{subtitle}</p>
  </div>
</svelte:element>
