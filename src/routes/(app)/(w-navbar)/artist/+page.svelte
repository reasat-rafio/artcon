<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import type { ArtistPageProps } from '@/lib/types/artist.types';
  import type { PageProps } from '@/lib/types/common.types';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import { formatArtistListingProps } from '@/lib/modify-props';
  import List from '@/components/pages/artist/list/List.svelte';

  export let data: PageProps<ArtistPageProps>;

  $: ({
    page: { seo, sections, artists },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'artist.hero'}
    <Hero props={formatArtistListingProps(props)} />
  {/if}
{/each}

<div class="relative mt-[100vh] bg-white">
  <List {artists} />
  <Footer {footer} {contact} logo={logoLight} />
</div>
