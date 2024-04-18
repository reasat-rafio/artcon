<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/documentary/Listing.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import { createListingItemWithImage, uniqueTags } from '@/lib/helper';
  import { formatDocumentaryListingProps } from '@/lib/modify-props';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { DocumentaryPageProps } from '@/lib/types/documentary.types';
  import uiStore from '@/store/ui';

  export let data: PageProps<DocumentaryPageProps>;

  $: ({
    page: { sections, seo, documentaries },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: tags = uniqueTags(documentaries);
  $: filteredDocumentaries = documentaries;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSearchParams, filterBySearchParams(activeSearchParams);

  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: documentariesWithImages = createListingItemWithImage(
    filteredDocumentaries,
    sectionImages,
  );

  const filterBySearchParams = (activeSearchParams: string | null) => {
    uiStore.setPreventScrollToTop(true);

    if (!activeSearchParams) {
      filteredDocumentaries = documentaries;
      return;
    }
    const fList = documentaries.filter(
      ({ category: { slug } }) => slug.current === activeSearchParams,
    );
    filteredDocumentaries = fList;
  };

  beforeNavigate(() => {
    uiStore.setPreventScrollToTop(false);
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'documentaryPage.hero'}
    <Hero props={formatDocumentaryListingProps(props)} />
  {/if}
{/each}

<FilteringNavbar {tags} {logoDark} {logoLight}>
  <svelte:fragment slot="name">Our audio visual</svelte:fragment>
</FilteringNavbar>
<div class="relative z-10 bg-white">
  <Listing list={documentariesWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
