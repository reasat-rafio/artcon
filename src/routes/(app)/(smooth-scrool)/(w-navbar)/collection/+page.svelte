<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/collection/Listing.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import { createListingItemWithImage } from '@/lib/helper';
  import { formatCollectionListingProps } from '@/lib/modify-props';
  import type { CollectionPageProps } from '@/lib/types/collection.types';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';

  export let data: PageProps<CollectionPageProps>;

  $: ({
    page: { sections, seo, collections, tags },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: filteredCollections = collections;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSortParams = $page.url.searchParams.get('sort');
  $: activeSearchParams,
    activeSortParams,
    filterBySearchParams(activeSearchParams, activeSortParams);

  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: collectionsWithImages = createListingItemWithImage(
    filteredCollections,
    sectionImages,
  );

  const filterBySearchParams = (
    activeSearchParams: string | null,
    activeSortParams: string | null,
  ) => {
    let collectionsCopy = collections;

    if (!activeSearchParams && !activeSortParams) {
      filteredCollections = collectionsCopy;
      return;
    }

    if (!!activeSearchParams) {
      const filteredCollection = collectionsCopy.filter(
        ({ tag: { slug } }) => slug.current === activeSearchParams,
      );
      collectionsCopy = filteredCollection;
    }

    if (!!activeSortParams) {
      switch (activeSortParams) {
        case 'available':
          collectionsCopy = collectionsCopy.filter(
            ({ isAvailable }) => isAvailable === true,
          );
          break;
        case 'sold':
          collectionsCopy = collectionsCopy.filter(
            ({ displaySold }) => displaySold === true,
          );
          break;
        case 'newest':
          collectionsCopy = collectionsCopy.sort(
            (a, b) =>
              new Date(b._createdAt).getTime() -
              new Date(a._createdAt).getTime(),
          );
          break;
        case 'oldest':
          collectionsCopy = collectionsCopy.sort(
            (a, b) =>
              new Date(a._createdAt).getTime() -
              new Date(b._createdAt).getTime(),
          );
          break;
        default:
          collectionsCopy = collections;
          break;
      }
    }

    filteredCollections = collectionsCopy;
  };
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'collection.hero'}
    <Hero props={formatCollectionListingProps(props)} />
  {/if}
{/each}
<div class="relative mt-[100vh] bg-white">
  <FilteringNavbar {tags} {logoDark} {logoLight}>
    <svelte:fragment slot="name">Our collection</svelte:fragment>
    <svelte:fragment slot="sorting-dropdown" let:SortingDropdown>
      <SortingDropdown />
    </svelte:fragment>
  </FilteringNavbar>
  <Listing list={collectionsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
