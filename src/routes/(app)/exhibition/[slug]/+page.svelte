<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Seo from '@/components/Seo.svelte';
  import Summary from '@/components/[exhibition]/Summary.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhinitionDetailPageProps } from '@/lib/types/exhibitionDetail.types';

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
  {:else if s._type === 'common.imageAsset'}
    <ImageAsset props={s} />
  {:else if s._type === 'exhibition.summary'}
    <Summary props={s} />
  {/if}
{/each}
