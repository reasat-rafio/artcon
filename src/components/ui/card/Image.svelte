<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let image: SanityAsset;
</script>

<figure class="{$$props.class ?? ''} h-[226px]">
  <SanityImage
    imageUrlBuilder={imageBuilder}
    class="h-full w-full rounded-[12px] object-cover"
    sizes="30vw"
    src={image}
    alt={image?.alt}
  />
</figure>
