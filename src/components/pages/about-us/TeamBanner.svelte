<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamBannerProps } from '@/lib/types/about-us.types';

  export let props: TeamBannerProps;
  let { title, image } = props;
</script>

<div class="relative h-screen w-full max-w-full overflow-hidden">
  <SanityImage
    src={image}
    sizes="100vw"
    class="fixed left-0 top-0 h-full w-full bg-cover bg-center object-cover"
    alt={image.alt}
    imageUrlBuilder={imageBuilder} />

  <header
    use:parallaxAnimation={{ disableOnMobile: true }}
    class="absolute inset-0 z-10 flex h-full w-full max-w-full translate-y-[120px] items-center justify-center px-4 text-white">
    <h2 class="head-1 max-w-full break-words text-center font-optiberling-agency">
      {title}
    </h2>
  </header>
</div>

<style>
  div {
    clip-path: inset(0);
  }
</style>
