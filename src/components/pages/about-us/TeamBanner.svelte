<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamBannerProps } from '@/lib/types/aboutUs.types';

  export let props: TeamBannerProps;
  let { title, image } = props;
</script>

<section class="relative h-screen w-full">
  <header
    class="relative z-10 flex h-full w-full items-center justify-center text-white"
  >
    <h2 class="font-abc-arizona-serif text-head-1">
      {title}
    </h2>
  </header>

  <figure class="absolute inset-0 h-full w-full">
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
</section>
