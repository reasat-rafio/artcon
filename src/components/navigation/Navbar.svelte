<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let logo: SanityAsset;
</script>

<nav class="fixed left-0 top-0 z-50 w-full">
  <div class="mt-[40px] flex w-full items-center px-[40px]">
    <a class="" href="/">
      <SanityImage
        class="h-[50px] object-contain"
        src={logo}
        sizes="100px"
        imageUrlBuilder={imageBuilder}
      />
    </a>

    <ul class="ml-auto">
      <!--  -->
    </ul>
  </div>
</nav>
