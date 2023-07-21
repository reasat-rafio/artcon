<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonImageAsset } from '@/lib/types/common.types';

  export let props: CommonImageAsset;
  let { image } = props;
</script>

<figure class="h-screen w-full">
  <SanityImage
    lqip
    draggable={false}
    class="h-full w-full object-cover"
    sizes="100vw"
    alt={image.alt}
    src={image}
    imageUrlBuilder={imageBuilder}
  />
</figure>
