<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Seo from '@/components/Seo.svelte';
  import Note from '@/components/pages/[exhibition]/Note.svelte';
  import Promotion from '@/components/pages/[exhibition]/promotion/Promotion.svelte';
  import Share from '@/components/pages/[exhibition]/Share.svelte';
  import Summary from '@/components/pages/[exhibition]/Summary.svelte';
  import Featured from '@/components/pages/[exhibition]/featured/Featured.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhinitionDetailPageProps } from '@/lib/types/exhibitionDetail.types';
  import Gallery from '@/components/pages/[exhibition]/gallery/Gallery.svelte';

  export let data: PageProps<ExhinitionDetailPageProps>;
  let {
    page,
    site: { logos },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}
<Share />
{#each page.sections as s}
  {#if s._type === 'common.imageAsset'}
    <ImageAsset props={s} />
  {:else if s._type === 'exhibition.summary'}
    <Summary props={s} />
  {:else if s._type === 'exhibition.featured'}
    <Featured props={s} />
  {:else if s._type === 'exhibition.note'}
    <Note props={s} />
  {:else if s._type === 'exhibition.promotion'}
    <Promotion props={s} />
  {:else if s._type === 'exhibition.gallery'}
    <Gallery props={s} />
  {/if}
{/each}
