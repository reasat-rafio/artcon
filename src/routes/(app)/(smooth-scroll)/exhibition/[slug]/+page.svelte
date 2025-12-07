<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Note from '@/components/pages/[exhibition]/Note.svelte';
  import Summary from '@/components/pages/[exhibition]/Summary.svelte';
  import IncludedArtists from '@/components/pages/[exhibition]/included-artists/IncludedArtists.svelte';
  import Publication from '@/components/pages/[exhibition]/publication/Publication.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import { calculateStatusBetweenDates, isSoloExhibition } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhibitionDetailPageProps } from '@/lib/types/exhibition-detail.types';

  export let data: PageProps<ExhibitionDetailPageProps>;
  $: ({
    page: {
      name,
      otherExhibitions,
      publication,
      cta,
      subtitle,
      topTitle,
      startDate,
      endDate,
      seo,
      sections,
      artists,
      asset,
      gallery,
      associationsList,
      description,
      slug,
    },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: ({ date, status } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));
  $: _topTitle = topTitle ?? (status !== 'Ongoing' ? date : status);
  $: _subTitle =
    subtitle ??
    (isSoloExhibition(artists)
      ? artists.personalDocuments.name
      : 'Group Exhibition');
</script>

<Seo {seo} siteOgImg={ogImage} />
<Hero
  props={{
    _type: 'common.hero',
    asset,
    cta,
    title: name,
    topTitle: _topTitle,
    subtitle: _subTitle,
  }} />
<Share href="/exhibition" {logoLight} {logoDark}>Our exhibition</Share>
<div class="relative z-10 bg-white">
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
        }} />
    {:else if s._type === 'exhibition.includedArtists'}
      <IncludedArtists props={{ ...s, artists }} />
    {:else if s._type === 'common.note'}
      <Note props={s} />
    {:else if s._type === 'exhibition.publication' && !!publication}
      <Publication props={{ ...s, publication }} />
    {:else if s._type === 'common.artwork'}
      {#await import('@/components/common/artwork/Artwork.svelte') then Artwork}
        <Artwork.default
          props={{
            ...s,
            artworks: s.artworks,
            artworkAtLast: true,
            ctaLink: s.artworkLink?.href || `/exhibition/${slug.current}/collection`,
            ctaTitle: s.artworkLink?.title,
          }} />
      {/await}
      <div style="display: none;">Debug artworkLink: {JSON.stringify(s.artworkLink)}</div>
      <div style="display: none;">Debug ctaLink: {s.artworkLink?.href || `/exhibition/${slug.current}/collection`}</div>
      <div style="display: none;">Debug ctaTitle: {s.artworkLink?.title}</div>
    {:else if s._type === 'exhibition.gallery'}
      {#await import('@/components/pages/[exhibition]/Gallery.svelte') then Gallery}
        <Gallery.default props={s} />
      {/await}
    {:else if s._type === 'exhibition.newsAndMedia'}
      {#await import('@/components/pages/[exhibition]/NewsAndMedia.svelte') then NewsAndMedia}
        <NewsAndMedia.default props={s} />
      {/await}
    {/if}
  {/each}

  {#if !!otherExhibitions?.length}
    {#await import('@/components/common/other-document/OtherDocument.svelte') then OthersDocument}
      <OthersDocument.default
        urlPrefix="/exhibition"
        title="Other exhibition"
        data={otherExhibitions} />
    {/await}
  {/if}

  {#await import('@/components/common/footer/Footer.svelte') then Footer}
    <Footer.default {footer} {contact} logo={logoDark} />
  {/await}
</div>
