<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero-list/Hero.svelte';
  import { formatExhibitionListingProps } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhibitionPageProps } from '@/lib/types/exhibition.types';

  export let data: PageProps<ExhibitionPageProps>;
  $: ({
    page,
    site: { logos },
  } = data);
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div>
  {#each page.sections as s}
    {#if s._type === 'exhibitionPage.hero'}
      <Hero props={formatExhibitionListingProps(s)} />
    {:else if s._type === 'common.imageAsset'}
      <ImageAsset props={s} />
    {/if}
  {/each}
</div>
