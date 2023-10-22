<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Summary from '@/components/pages/[artist]/Summary.svelte';
  import OtherArtists from '@/components/pages/[artist]/OtherArtists.svelte';
  import type { ArtistDetailPageProps } from '@/lib/types/artistDetail.types';
  import type { PageProps } from '@/lib/types/common.types';
  import Share from '@/components/widgets/share/Share.svelte';
  import Artwork from '@/components/common/artwork/Artwork.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import OtherExhibitions from '@/components/common/OtherExhibitions.svelte';
  import Publication from '@/components/pages/[artist]/publication/Publication.svelte';

  export let data: PageProps<ArtistDetailPageProps>;

  $: ({
    page: {
      siteDocuments,
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
{#each siteDocuments.sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}
<div class="relative mt-[100vh] bg-white">
  <Share href="/" logo={logoLight}>Our artist</Share>

  {#each siteDocuments.sections as s}
    {#if s._type === 'common.imageAsset'}
      <ImageAsset props={s} />
    {:else if s._type === 'artist.summary'}
      <Summary
        props={{
          ...s,
          personalDocuments,
        }}
      />
    {:else if s._type === 'common.artwork'}
      <Artwork props={{ ...s, artworks }} />
    {:else if s._type === 'artist.publication'}
      <Publication publications={allPublications} />
    {/if}
  {/each}

  {#if !!exhibitions?.length}
    <OtherExhibitions
      title={`${personalDocuments.name}’s other exhibition with us`}
      {exhibitions}
    />
  {/if}

  {#if !!otherArtists?.length}
    <OtherArtists artists={otherArtists} />
  {/if}

  <Footer {footer} {contact} logo={logoLight} />
</div>
