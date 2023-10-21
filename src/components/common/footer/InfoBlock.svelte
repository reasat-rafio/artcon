<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { PortableText, toPlainText } from '@portabletext/svelte';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import type { PortableTextBlock } from 'sanity';

  export let icon: SanityAsset;
  export let info: PortableTextBlock[];
  export let extraLightHeight: boolean = false;
</script>

<div
  class="{$$props.class ??
    ''} flex space-x-[12px] text-[12px] font-light not-italic tracking-[0.24px]"
>
  <figure class="">
    <SanityImage
      class="w-[15px]"
      sizes="20px"
      src={icon}
      imageUrlBuilder={imageBuilder}
      alt={toPlainText(info)}
    />
  </figure>
  <div class={extraLightHeight ? 'leading-relaxed' : ''}>
    <PortableText value={info} />
  </div>
</div>
