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
  import { onMount, type ComponentType } from 'svelte';

  export let data: PageProps<ExhibitionDetailPageProps>;
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
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  let Artwork: ComponentType;
  let Gallery: ComponentType;
  let NewsAndMedia: ComponentType;
  let OthersDocument: ComponentType;
  let Footer: ComponentType;

  onMount(async () => {
    Artwork = (await import('@/components/common/artwork/Artwork.svelte'))
      .default;
    Gallery = (await import('@/components/pages/[exhibition]/Gallery.svelte'))
      .default;
    NewsAndMedia = (
      await import('@/components/pages/[exhibition]/NewsAndMedia.svelte')
    ).default;
    OthersDocument = (
      await import('@/components/common/other-document/OtherDocument.svelte')
    ).default;
    Footer = (await import('@/components/common/footer/Footer.svelte')).default;
  });

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
    asset,
    cta,
    title: name,
    text: heroText,
    type: heroType,
  }} />
<div class="relative mt-[100vh] bg-white">
  <Share href="/exhibition" {logoLight} {logoDark}>Our exhibition</Share>
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
      <svelte:component
        this={Artwork}
        props={{ ...s, artworks, artworkAtLast: true }} />
    {:else if s._type === 'exhibition.gallery'}
      <svelte:component this={Gallery} props={s} />
    {:else if s._type === 'exhibition.newsAndMedia'}
      <svelte:component this={NewsAndMedia} props={s} />
    {/if}
  {/each}

  {#if !!otherExhibitions?.length}
    <svelte:component
      this={OthersDocument}
      urlPrefix="/exhibition"
      title="Other exhibition"
      data={otherExhibitions} />
  {/if}
  <svelte:component this={Footer} {footer} {contact} logo={logoDark} />
</div>
