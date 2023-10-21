<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Summary from '@/components/pages/[artist]/Summary.svelte';
  import type { ArtistDetailPageProps } from '@/lib/types/artistDetail.types';
  import type { PageProps } from '@/lib/types/common.types';
  import Exhibitions from '@/components/pages/[artist]/exhibitions/Exhibitions.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import Artwork from '@/components/common/artwork/Artwork.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';

  export let data: PageProps<ArtistDetailPageProps>;

  $: ({
    page: { siteDocuments, personalDocuments, seo, artworks, exhibitions },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);
  $: console.log(exhibitions);
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

      <!-- {:else if s._type === 'artist.exhibitions'}
      <Exhibitions props={s} /> -->
    {/if}
  {/each}
  <Footer {footer} {contact} logo={logoLight} />
</div>
