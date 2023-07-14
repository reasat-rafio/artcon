<script lang="ts">
  import H1 from '@/components/ui/H1.svelte';
  import H3 from '@/components/ui/H3.svelte';
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

    <div class="container relative z-30 max-w-3xl text-center text-white">
      <header>
        <H1>{title}</H1>
        <H3 class="whitespace-pre-wrap">{subtitle}</H3>
      </header>

      {#if !!cta?.title}
        <a href={cta.href}>{cta.title}</a>
      {/if}
    </div>
  </div>
</section>
