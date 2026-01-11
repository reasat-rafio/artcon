<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import { createListingItemWithImage, uniqueTags } from '@/lib/helper';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { PublicationPageProps } from '@/lib/types/publication.types';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import Listing from '@/components/pages/publication/Listing.svelte';
  import { formatPublicationListingProps } from '@/lib/modify-props';
  import { beforeNavigate } from '$app/navigation';
  import uiStore from '@/store/ui';

  export let data: PageProps<PublicationPageProps>;

  $: ({
    page: { sections, seo, publications, categories },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: filteredPublications = publications;
  $: tags = uniqueTags(publications);
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSearchParams, filterBySearchParams(activeSearchParams);
  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: publicationsWithImages = createListingItemWithImage(
    filteredPublications,
    sectionImages,
  );

  const filterBySearchParams = (activeSearchParams: string | null) => {
    uiStore.setPreventScrollToTop(true);

    if (!activeSearchParams) {
      filteredPublications = publications;
      return;
    }

    const fList = publications.filter(
      ({ category: { slug } }) => slug.current === activeSearchParams,
    );
    filteredPublications = fList;
  };

  beforeNavigate(() => {
    uiStore.setPreventScrollToTop(false);
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'publication.hero'}
    <Hero props={formatPublicationListingProps(s)} />
  {/if}
{/each}
<div class="relative z-10 mt-[100dvh] bg-white">
  <FilteringNavbar {tags} {logoDark} {logoLight}>
    <svelte:fragment slot="name">Our Publication</svelte:fragment>
  </FilteringNavbar>
  <Listing list={publicationsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
