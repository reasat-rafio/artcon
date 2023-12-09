<script lang="ts">
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonImageAsset } from '@/lib/types/common.types';

  export let props: CommonImageAsset;
  $: ({ image } = props);

  $: bg = imageBuilder
    .image(image)
    .withOptions({ auto: 'format' })
    .maxWidth(1920)
    .url();
</script>

<div
  style="background-image: url({bg}), url({image.asset.metadata.lqip});"
  class="h-screen w-full bg-cover bg-fixed bg-center">
</div>
