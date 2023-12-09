<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/documentary/Listing.svelte';
  import SecondaryNav from '@/components/widgets/secondary-nav/SecondaryNav.svelte';
  import { createListingItemWithImage } from '@/lib/helper';
  import { formatDocumentaryListingProps } from '@/lib/modify-props';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { DocumentaryPageProps } from '@/lib/types/documentary.types';

  export let data: PageProps<DocumentaryPageProps>;

  $: ({
    page: { sections, seo, categories, documentaries },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
  } = data);

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
    if (!activeSearchParams) {
      filteredDocumentaries = documentaries;
      return;
    }
    const fList = documentaries.filter(
      ({ category: { slug } }) => slug.current === activeSearchParams,
    );
    filteredDocumentaries = fList;
  };
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'documentaryPage.hero'}
    <Hero props={formatDocumentaryListingProps(props)} />
  {/if}
{/each}
<div class="relative mt-[100vh] bg-white">
  <SecondaryNav tags={categories} logo={logoDark}>Our documentary</SecondaryNav>
  <Listing list={documentariesWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
