<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import {
    createListingItemWithImage,
    formatPublicationListingProps,
  } from '@/lib/helper';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { PublicationPageProps } from '@/lib/types/publication.types';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import SecondaryNav from '@/components/widgets/seondary-nav/SecondaryNav.svelte';
  import Listing from '@/components/pages/publication/Listing.svelte';

  export let data: PageProps<PublicationPageProps>;

  $: ({
    page: { sections, seo, publications, categories },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

  $: filteredPublications = publications;
  $: aciteveSearchParms = $page.url.searchParams.get('search');
  $: aciteveSearchParms, filterBySearchParams(aciteveSearchParms);
  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: publicationsWithImages = createListingItemWithImage(
    filteredPublications,
    sectionImages,
  );

  const filterBySearchParams = (aciteveSearchParms: string | null) => {
    if (!aciteveSearchParms) return;
    const fList = publications.filter(
      ({ category: { slug } }) => slug.current === aciteveSearchParms,
    );
    filteredPublications = fList;
  };
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'publication.hero'}
    <Hero props={formatPublicationListingProps(s)} />
  {/if}
{/each}
<div class="relative mt-[100vh] bg-white">
  <SecondaryNav tags={categories} href="/" logo={logoLight}
    >Our publication</SecondaryNav
  >
  <Listing list={publicationsWithImages} />
  <Footer useContainer {footer} {contact} logo={logoLight} />
</div>
