<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let image: SanityAsset;
  export let title: string;
  export let subtitle: string;
</script>

<div>
  <figure class="max-h-[226px]">
    <SanityImage
      class="rounded-[12px]"
      sizes="30vw"
      src={image}
      alt={image.alt}
      imageUrlBuilder={imageBuilder}
    />
  </figure>

  <!--  -->
</div>
