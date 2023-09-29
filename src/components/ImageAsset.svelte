<script lang="ts">
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonImageAsset } from '@/lib/types/common.types';

  export let props: CommonImageAsset;
  $: ({ image } = props);

  $: bg = imageBuilder
    .image(image)
    .withOptions({ auto: 'format' })
    .maxWidth(1920)
    .maxHeight(1080)
    .url();
</script>

<div
  style="background-image: url({bg});"
  class="h-screen w-full bg-cover bg-fixed bg-center"
></div>

<!-- <figure class="w-full h-screen">
  <SanityImage
    lqip
    draggable={false}
    class="object-cover w-full h-full"
    sizes="100vw"
    alt={image.alt}
    src={image}
    imageUrlBuilder={imageBuilder}
  />
</figure> -->
