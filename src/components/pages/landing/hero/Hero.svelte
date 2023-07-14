<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { HeroProps } from '@/lib/types/landing.types';

  export let props: HeroProps;
  let { title, subtitle, asset, cta } = props;
</script>

<section class="fixed inset-0 w-screen h-screen">
  <div class="relative flex items-center justify-center w-full h-full">
    {#if asset?.image}
      <SanityImage
        draggable={false}
        class="absolute object-cover w-full h-full"
        lqip
        sizes="100vw"
        alt={asset.image.alt}
        src={asset.image}
        imageUrlBuilder={imageBuilder}
      />
    {/if}

    <div class="container relative z-30 max-w-lg text-center text-white">
      <header>
        <h1 class="text-7xl font-optiberling-agency">{title}</h1>
        <h4>{subtitle}</h4>
      </header>

      {#if !!cta?.title}
        <a href={cta.href}>{cta.title}</a>
      {/if}
    </div>
  </div>
</section>
