<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Summary from '@/components/pages/[collection]/Summary.svelte';
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
  }}
/>

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
          artist: {
            born: artist.born,
            country: artist.country,
            name: artist.name,
          },
        }}
      />
    {/if}
  {/each}

  <Footer {footer} {contact} logo={logoLight} />
</div>
