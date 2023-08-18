<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Seo from '@/components/Seo.svelte';
  import Note from '@/components/pages/[exhibition]/Note.svelte';
  import Promotion from '@/components/pages/[exhibition]/promotion/Promotion.svelte';
  import Share from '@/components/pages/[exhibition]/Share.svelte';
  import Summary from '@/components/pages/[exhibition]/Summary.svelte';
  import IncludedArtists from '@/components/pages/[exhibition]/IncludedArtists.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhinitionDetailPageProps } from '@/lib/types/exhibitionDetail.types';
  import Gallery from '@/components/pages/[exhibition]/gallery/Gallery.svelte';
  import NewsAndMedia from '@/components/pages/[exhibition]/news-media/NewsAndMedia.svelte';
  import Artwork from '@/components/pages/[exhibition]/artwork/Artwork.svelte';
  import { getEventStatus } from '@/lib/helper';

  export let data: PageProps<ExhinitionDetailPageProps>;
  let {
    page,
    site: { logos },
  } = data;

  const { date, status } = getEventStatus({
    startDate: page.startDate,
    endDate: page.endDate,
  });

  // page.otherExhibitions.sort((a, b) => {
  //   const { status: statusA } = getEventStatus({
  //     startDate: a.startDate,
  //     endDate: a.endDate,
  //   });

  //   const { status: statusB } = getEventStatus({
  //     startDate: b.startDate,
  //     endDate: b.endDate,
  //   });

  //   const statusOrder = {
  //     Ongoing: 0,
  //     Upcoming: 1,
  //     Completed: 2,
  //   } as const;
  //   return statusOrder[statusA] - statusOrder[statusB];
  // });
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero
      props={{ ...s, text: s.text || (status !== 'Ongoing' ? date : status) }}
    />
  {/if}
{/each}
<Share />
{#each page.sections as s}
  {#if s._type === 'common.imageAsset'}
    <ImageAsset props={s} />
  {:else if s._type === 'exhibition.summary'}
    <Summary props={s} />
  {:else if s._type === 'exhibition.includedArtists'}
    <IncludedArtists artists={page.artists} />
  {:else if s._type === 'exhibition.note'}
    <Note props={s} />
  {:else if s._type === 'exhibition.promotion'}
    <Promotion props={s} />
  {:else if s._type === 'exhibition.artwork'}
    <Artwork props={s} />
  {:else if s._type === 'exhibition.gallery'}
    <Gallery props={s} />
  {:else if s._type === 'exhibition.newsAndMedia'}
    <NewsAndMedia props={s} />
  {/if}
{/each}
