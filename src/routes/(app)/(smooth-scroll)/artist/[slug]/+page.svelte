<script lang="ts">
  import { page } from '$app/stores';
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Summary from '@/components/pages/[artist]/Summary.svelte';
  import Video from '@/components/pages/[artist]/Video.svelte';
  import Publication from '@/components/pages/[artist]/publication/Publication.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import ArtworkItems from '@/components/common/artwork/ArtworkItems.svelte';
  import type { ArtistDetailPageProps, Publication as PublicationType } from '@/lib/types/artist-detail.types';
  import type { PageProps } from '@/lib/types/common.types';

  export let data: PageProps<ArtistDetailPageProps>;

  $: ({
    page: {
      siteDocuments,
      personalDocuments,
      seo,
      artworks,
      customArtworks,
      exhibitions,
      otherArtists,
      publications,
      publicationsFromExhibitions,
      slug,
    },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: allPublications = [
    ...(publications ?? []),
    ...(publicationsFromExhibitions ?? []),
  ].reduce<PublicationType[]>((unique, pub) => {
    const isDuplicate = unique.some(
      (item) => item._createdAt === pub._createdAt || item.slug?.current === pub.slug?.current
    );
    return isDuplicate ? unique : [...unique, pub];
  }, []);
</script>

{#key $page.params.slug}
  <Seo {seo} siteOgImg={ogImage} />
  <Hero
    currentSlug={slug.current}
    props={{
      _type: 'common.hero',
      topTitle: siteDocuments?.topTitle,
      title: personalDocuments.name,
      asset: siteDocuments.asset,
      cta: siteDocuments?.cta,
      subtitle: siteDocuments?.subtitle,
    }} />
  <Share href="/artist" {logoDark} {logoLight}>Our Artist</Share>
  <div class="relative z-10 bg-white">
  {#if !!siteDocuments?.sections?.length}
    {#each siteDocuments.sections as s, index}
      {#if s._type === 'common.imageAsset'}
        <ImageAsset class="{index === 0 ? 'pb-section' : ''}" props={s} />
      {:else if s._type === 'artist.summary'}
        <Summary
          class="pb-section"
          props={{
            ...s,
            personalDocuments,
          }} />
      {:else if s._type === 'artist.video'}
        <Video class="pb-section" props={s} />
      {:else if s._type === 'common.artwork'}
        {#await import('@/components/common/artwork/Artwork.svelte') then Artwork}
          <Artwork.default
            class="pb-section"
            props={{
              ...s,
              artworks: s.artworks,
              artworkAtLast: true,
              ctaLink: s.artworkLink?.href || `/artist/${slug.current}/collection`,
              ctaTitle: s.artworkLink?.title,
            }} />
        {/await}
      {:else if s._type === 'artist.publication'}
        <Publication class="pb-section" publications={allPublications} artistName={personalDocuments.name} />
      {/if}
    {/each}

    {#if !!customArtworks?.length}
      <section class="pb-section container-primary pt-section">
        <ArtworkItems artworks={customArtworks} />
      </section>
    {/if}

    {#if !!exhibitions?.length}
      {#await import('@/components/common/other-document/OtherDocument.svelte') then OthersDocument}
        <OthersDocument.default
          urlPrefix="/exhibition"
          title="Other exhibition with us"
          data={exhibitions} />
      {/await}
    {/if}

    {#if !!otherArtists?.length}
      {#await import('@/components/pages/[artist]/other-artists/OtherArtists.svelte') then OtherArtists}
        <OtherArtists.default artists={otherArtists} />
      {/await}
    {/if}

      {#await import('@/components/common/footer/Footer.svelte') then Footer}
        <Footer.default {footer} {contact} logo={logoDark} />
      {/await}
    {/if}
  </div>
{/key}
