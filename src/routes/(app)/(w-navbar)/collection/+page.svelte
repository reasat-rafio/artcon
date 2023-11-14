<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import SecondaryNav from '@/components/widgets/secondary-nav/SecondaryNav.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import type { CollectionPageProps } from '@/lib/types/collection.types';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import { formatCollectionListingProps } from '@/lib/helper';

  export let data: PageProps<CollectionPageProps>;

  $: ({
    page: { sections, seo, collections, tags },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'collection.hero'}
    <Hero props={formatCollectionListingProps(props)} />
  {/if}
{/each}
<div class="relative mt-[100vh] bg-white">
  <SecondaryNav {tags} href="/" logo={logoLight}>Our publication</SecondaryNav>
  <!-- <Listing list={publicationsWithImages} /> -->
  <Footer {footer} {contact} logo={logoLight} />
</div>
