<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import OthersDocument from '@/components/common/OthersDocument.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Artwork from '@/components/common/artwork/Artwork.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Summary from '@/components/pages/[artist]/Summary.svelte';
  import OtherArtists from '@/components/pages/[artist]/other-artists/OtherArtists.svelte';
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
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

  $: allPublications = [...publications, ...publicationsFromExhibitions];
</script>

<Seo {seo} siteOgImg={ogImage} />
<Hero
  props={{
    _key: '',
    _type: 'common.hero',
    text: status,
    title: personalDocuments.name,
    asset,
    cta,
    type,
  }} />
<div class="relative mt-[100vh] bg-white">
  <Share href="/artist" logo={logoLight}>Our artist</Share>

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
    <OthersDocument
      urlPrefix="/exhibition"
      title={`${personalDocuments.name}’s other exhibition with us`}
      data={exhibitions} />
  {/if}

  {#if !!otherArtists?.length}
    <OtherArtists artists={otherArtists} />
  {/if}

  <Footer {footer} {contact} logo={logoLight} />
</div>
