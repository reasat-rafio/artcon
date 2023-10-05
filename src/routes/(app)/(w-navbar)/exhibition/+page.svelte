<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero-list/Hero.svelte';
  import Listing from '@/components/pages/exhibition/Listing.svelte';
  import {
    createListingItemWithImage,
    formatExhibitionListingProps,
  } from '@/lib/helper';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { ExhibitionPageProps } from '@/lib/types/exhibition.types';

  export let data: PageProps<ExhibitionPageProps>;
  $: ({
    page: { sections, seo, exhibitions },
    site: { logos },
  } = data);

  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: exhibitionWithImages = createListingItemWithImage(
    exhibitions,
    sectionImages,
  );
</script>

<Seo {seo} siteOgImg={logos?.ogImage} />
<div>
  {#each sections as s}
    {#if s._type === 'exhibitionPage.hero'}
      <Hero props={formatExhibitionListingProps(s)} />
    {/if}
  {/each}

  <Listing list={exhibitionWithImages} />
</div>
