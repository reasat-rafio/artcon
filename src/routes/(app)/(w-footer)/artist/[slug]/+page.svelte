<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import Summary from '@/components/pages/[artist]/Summary.svelte';
  import ShareWidget from '@/components/widgets/share/Share.svelte';
  import type { ArtistDetailPageProps } from '@/lib/types/artistDetail.types';
  import type { PageProps } from '@/lib/types/common.types';
  import Exhibitions from '@/components/pages/[artist]/exhibitions/Exhibitions.svelte';

  export let data: PageProps<ArtistDetailPageProps>;

  $: ({
    page,
    site: { logos },
  } = data);
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
{#each page.siteDocuments.sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}
<ShareWidget href="/artist">Our artist</ShareWidget>
{#each page.siteDocuments.sections as s}
  {#if s._type === 'common.imageAsset'}
    <ImageAsset props={s} />
  {:else if s._type === 'artist.summary'}
    <Summary props={s} personalDocuments={page.personalDocuments} />
  {:else if s._type === 'artist.exhibitions'}
    <Exhibitions props={s} />
  {/if}
{/each}
