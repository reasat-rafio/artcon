<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Artwork from '@/components/common/artwork/Artwork.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import IncludedArtists from '@/components/pages/[exhibition]/IncludedArtists.svelte';
  import Note from '@/components/pages/[exhibition]/Note.svelte';
  import OtherExhibitions from '@/components/common/OtherExhibitions.svelte';
  import Summary from '@/components/pages/[exhibition]/Summary.svelte';
  import Gallery from '@/components/pages/[exhibition]/gallery/Gallery.svelte';
  import NewsAndMedia from '@/components/pages/[exhibition]/news-media/NewsAndMedia.svelte';
  import Publication from '@/components/pages/[exhibition]/publication/Publication.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import { calculateStatusBetweenDates, isSoloExhibition } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhinitionDetailPageProps } from '@/lib/types/exhibitionDetail.types';

  export let data: PageProps<ExhinitionDetailPageProps>;
  $: ({
    page: {
      name,
      otherExhibitions,
      publication,
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
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
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

<Seo {seo} siteOgImg={ogImage} />
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
<div class="relative mt-[100vh] bg-white">
  <Share href="/" logo={logoLight}>Our Exhibition</Share>
  {#each sections as s}
    {#if s._type === 'common.imageAsset'}
      <ImageAsset props={s} />
    {:else if s._type === 'exhibition.summary'}
      <Summary
        props={{
          ...s,
          descriptionBlock: {
            date,
            gallery,
            description,
            associationsList,
          },
        }}
      />
    {:else if s._type === 'exhibition.includedArtists'}
      <IncludedArtists props={{ ...s, artists }} />
    {:else if s._type === 'common.note'}
      <Note props={s} />
    {:else if s._type === 'exhibition.publication'}
      <Publication props={{ ...s, publication }} />
    {:else if s._type === 'common.artwork'}
      <Artwork props={{ ...s, artworks }} />
    {:else if s._type === 'exhibition.gallery'}
      <Gallery props={s} />
    {:else if s._type === 'exhibition.newsAndMedia'}
      <NewsAndMedia props={s} />
    {/if}
  {/each}

  {#if !!otherExhibitions?.length}
    <OtherExhibitions title="Other Exhibition" exhibitions={otherExhibitions} />
  {/if}
  <Footer {footer} {contact} logo={logoLight} />
</div>
