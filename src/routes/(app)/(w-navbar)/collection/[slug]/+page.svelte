<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import OthersDocument from '@/components/common/OthersDocument.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Artist from '@/components/pages/[collection]/Artist.svelte';
  import OtherCollection from '@/components/pages/[collection]/OtherCollection.svelte';
  import Documentations from '@/components/pages/[collection]/documentations/Documentations.svelte';
  import Summary from '@/components/pages/[collection]/summary/Summary.svelte';
  import Note from '@/components/pages/[exhibition]/Note.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import type { CollectionDetailPageProps } from '@/lib/types/collection-detail.types';
  import type { PageProps } from '@/lib/types/common.types';

  export let data: PageProps<CollectionDetailPageProps>;

  $: ({
    page: {
      name,
      seo,
      cta,
      asset,
      status,
      type,
      artist,
      sections,
      provenance,
      artworkImages,
      information,
      otherCollections,
      inquiryButton,
    },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);
</script>

<Seo {seo} siteOgImg={ogImage} />
<Hero
  props={{
    _key: '',
    asset,
    cta,
    type,
    _type: 'common.hero',
    title: artist.name,
    text: status,
  }} />

<div class="relative mt-[100vh] bg-white">
  <Share href="/artist" logo={logoLight}>Our collections</Share>

  {#each sections as props}
    {#if props._type === 'common.imageAsset'}
      <ImageAsset {props} />
    {:else if props._type === 'collection.summary'}
      <Summary
        props={{
          ...props,
          provenance,
          artworkName: name,
          artworkImages,
          information,
          inquiryButton,
          artist: {
            born: artist.born,
            country: artist.country,
            name: artist.name,
          },
        }} />
    {:else if props._type === 'common.note'}
      <Note {props} />
    {:else if props._type === 'collection.artist'}
      <Artist props={{ ...props, artist }} />
    {:else if props._type === 'collection.documentation'}
      <Documentations {props} />
    {/if}
  {/each}

  {#if !!otherCollections?.length}
    <OtherCollection title="Other collections" data={otherCollections} />
  {/if}
  <Footer {footer} {contact} logo={logoLight} />
</div>
