<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityImageAssetDocument } from '@sanity/client';

  export let image: SanityImageAssetDocument;
</script>

<div class="fixed inset-0 -z-10 block lg:hidden">
  <figure class="h-full w-full overflow-hidden">
    <SanityImage
      id="previewImage"
      class="h-full w-full object-cover"
      sizes="100vw"
      imageUrlBuilder={imageBuilder}
      src={image}
      alt={image.alt}
    />
  </figure>
</div>
