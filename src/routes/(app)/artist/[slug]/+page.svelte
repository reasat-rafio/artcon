<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/pages/[artist]/hero/Hero.svelte';
  import type { ArtistDetailPageProps } from '@/lib/types/artistDetail.types';
  import type { PageProps } from '@/lib/types/common.types';

  export let data: PageProps<ArtistDetailPageProps>;

  let {
    page,
    site: { logos },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />

{#each page.sections as s}
  {#if s._type === 'common.heroList'}
    <Hero props={s} />
  {/if}
{/each}

<!-- {#each page.sections as s}
  {#if s._type === 'common.imageAsset'}
    <ImageAsset props={s} />
  {/if}
{/each} -->
