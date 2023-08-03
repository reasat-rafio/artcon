<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let link: string;
  export let icon: SanityAsset;
</script>

<a href={link} target="_blank">
  <SanityImage
    alt={link}
    src={icon}
    sizes="15px"
    class="h-[15px] w-[15px]"
    imageUrlBuilder={imageBuilder}
  />
</a>
