<script lang="ts">
  import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let artworks: SanityAsset[];

  console.log(artworks);
</script>

<div class="{$$props.class} ?">
  <!-- {#each artworks as artwork}
    <figure>
      <SanityImage sizes="60vw" src={artwork} imageUrlBuilder={imageBuilder} />
    </figure>
  {/each} -->
  <!-- <Carousel>
    {#each artworks as artwork}
      <figure>
        <SanityImage
          sizes="60vw"
          src={artwork}
          imageUrlBuilder={imageBuilder}
        />
      </figure>
    {/each}
  </Carousel> -->
</div>
