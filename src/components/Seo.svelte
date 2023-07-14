<script lang="ts">
  import SvelteSeo from 'svelte-seo';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import type { SeoProps } from '@/lib/types/common.types';
  import { urlFor } from '@/lib/sanity/sanityClient';

  export let seo: SeoProps;
  export let siteOgImg: SanityAsset | undefined = undefined;

  let title = seo.title;
  let description = seo.description;
  let ogImage = seo?.ogImage ?? siteOgImg;

  const openGraphImages = ogImage
    ? [
        { w: 800, h: 600 },
        { w: 1200, h: 630 },
        { w: 600, h: 600 },
        { w: 256, h: 256 },
      ].map(({ w, h }) => ({
        url: `${urlFor(ogImage).width(w).height(h).url()}`,
        width: w,
        height: h,
        alt: `${title}`,
      }))
    : [];
</script>

<SvelteSeo
  {title}
  {description}
  openGraph={{
    images: openGraphImages,
  }}
/>
