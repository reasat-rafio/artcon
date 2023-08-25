<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Seo from '@/components/Seo.svelte';
  import Note from '@/components/pages/[exhibition]/Note.svelte';
  import Publication from '@/components/pages/[exhibition]/publication/Publication.svelte';
  import Share from '@/components/pages/[exhibition]/Share.svelte';
  import Summary from '@/components/pages/[exhibition]/Summary.svelte';
  import IncludedArtists from '@/components/pages/[exhibition]/IncludedArtists.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type {
    ArtistsProps,
    ExhinitionDetailPageProps,
    SoloExhibitonProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Gallery from '@/components/pages/[exhibition]/gallery/Gallery.svelte';
  import NewsAndMedia from '@/components/pages/[exhibition]/news-media/NewsAndMedia.svelte';
  import Artwork from '@/components/pages/[exhibition]/artwork/Artwork.svelte';
  import { calculateStatusBetweenDates, isSoloExhibition } from '@/lib/helper';
  import OtherExhibitions from '@/components/pages/[exhibition]/OtherExhibitions.svelte';

  export let data: PageProps<ExhinitionDetailPageProps>;
  $: ({
    page: {
      name,
      otherExhibitions,
      publication,
      tags,
      cta,
      status,
      type,
      startDate,
      endDate,
      seo,
      sections,
      artists,
      artworks,
      asset,
      gallery,
      associationsList,
      description,
    },
    site: { logos },
  } = data);

  $: ({ date, status: exhibitionStatus } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));

  $: heroText =
    status || (exhibitionStatus !== 'Ongoing' ? date : exhibitionStatus);
  $: heroType =
    type ||
    (isSoloExhibition(artists)
      ? artists.personalDocuments.name
      : 'Group Exhibition');
</script>

<Seo {seo} siteOgImg={logos?.ogImage} />
<Hero
  props={{
    _type: 'common.hero',
    _key: '',
    asset,
    cta,
    title: name,
    text: heroText,
    type: heroType,
  }}
/>
<Share />
{#each sections as s}
  {#if s._type === 'common.imageAsset'}
    <ImageAsset props={s} />
  {:else if s._type === 'exhibition.summary'}
    <Summary
      props={{
        ...s,
        exhibition: {
          associationsList,
          date,
          name,
          description,
        },
      }}
    />
  {:else if s._type === 'exhibition.includedArtists'}
    <IncludedArtists props={{ ...s, artists }} />
  {:else if s._type === 'common.note'}
    <Note props={s} />
  {:else if s._type === 'exhibition.publication'}
    <Publication props={{ ...s, publication }} />
  {:else if s._type === 'exhibition.artwork'}
    <Artwork props={{ ...s, artworks }} />
    <!--{:else if s._type === 'exhibition.gallery'}
    <Gallery props={s} />
  {:else if s._type === 'exhibition.newsAndMedia'}
    <NewsAndMedia props={s} /> -->
  {/if}
{/each}
<!--
{#if !!otherExhibitions?.length}
  <OtherExhibitions exhibitions={otherExhibitions} />
{/if} -->
