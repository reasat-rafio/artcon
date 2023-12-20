<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamBannerProps } from '@/lib/types/about-us.types';

  export let props: TeamBannerProps;
  let { title, image } = props;
</script>

<div class="relative h-screen w-full">
  <SanityImage
    src={image}
    sizes="100vw"
    class="fixed left-0 top-0 h-full w-full bg-cover bg-center object-cover"
    alt={image.alt}
    imageUrlBuilder={imageBuilder} />

  <header
    class="absolute inset-0 z-10 flex h-full w-full items-center justify-center text-white">
    <h2 class="head-1 font-optiberling-agency">
      {title}
    </h2>
  </header>
</div>

<style>
  div {
    clip-path: inset(0);
  }
</style>
