<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Artwork from '@/components/common/artwork/Artwork.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Summary from '@/components/pages/[artist]/Summary.svelte';
  import Publication from '@/components/pages/[artist]/publication/Publication.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import type { ArtistDetailPageProps } from '@/lib/types/artist-detail.types';
  import type { PageProps } from '@/lib/types/common.types';

  export let data: PageProps<ArtistDetailPageProps>;

  $: ({
    page: {
      siteDocuments: { asset, sections, cta, status, type },
      personalDocuments,
      seo,
      artworks,
      exhibitions,
      otherArtists,
      publications,
      publicationsFromExhibitions,
    },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: allPublications = [...publications, ...publicationsFromExhibitions];
</script>

<Seo {seo} siteOgImg={ogImage} />
<Hero
  props={{
    _type: 'common.hero',
    text: status,
    title: personalDocuments.name,
    asset,
    cta,
    type,
  }} />
<div class="relative mt-[100vh] bg-white">
  <Share href="/artist" {logoDark} {logoLight}>Our artist</Share>

  {#each sections as s}
    {#if s._type === 'common.imageAsset'}
      <ImageAsset props={s} />
    {:else if s._type === 'artist.summary'}
      <Summary
        props={{
          ...s,
          personalDocuments,
        }} />
    {:else if s._type === 'common.artwork'}
      <Artwork props={{ ...s, artworks }} />
    {:else if s._type === 'artist.publication'}
      <Publication publications={allPublications} />
    {/if}
  {/each}

  {#if !!exhibitions?.length}
    {#await import('@/components/common/other-document/OtherDocument.svelte') then OthersDocument}
      <OthersDocument.default
        urlPrefix="/exhibition"
        title={`${personalDocuments.name}’s other exhibition with us`}
        data={exhibitions} />
    {/await}
  {/if}

  {#if !!otherArtists?.length}
    {#await import('@/components/pages/[artist]/other-artists/OtherArtists.svelte') then OtherArtists}
      <OtherArtists.default artists={otherArtists} />
    {/await}
  {/if}

  {#await import('@/components/common/footer/Footer.svelte') then Footer}
    <Footer.default {footer} {contact} logo={logoLight} />
  {/await}
</div>
