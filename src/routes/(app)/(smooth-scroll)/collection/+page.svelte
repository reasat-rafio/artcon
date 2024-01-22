<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/collection/Listing.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import { createListingItemWithImage, uniqueTags } from '@/lib/helper';
  import { formatCollectionListingProps } from '@/lib/modify-props';
  import type { CollectionPageProps } from '@/lib/types/collection.types';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import { lenisStore } from '@/store/lenis';
  import { onMount } from 'svelte';

  export let data: PageProps<CollectionPageProps>;

  $: ({
    page: { sections, seo, collections },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  let contentBlockEl: HTMLDivElement;
  $: filteredCollections = collections;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSortParams = $page.url.searchParams.get('sort');
  $: activeArtistParams = $page.url.searchParams.get('artist');
  $: tags = uniqueTags(collections);
  $: activeSearchParams,
    activeArtistParams,
    activeSortParams,
    filterBySearchParams(
      activeSearchParams,
      activeSortParams,
      activeArtistParams,
    );

  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: collectionsWithImages = createListingItemWithImage(
    filteredCollections,
    sectionImages,
  );

  onMount(() => {
    setTimeout(() => {
      if ($lenisStore && activeArtistParams && contentBlockEl && browser) {
        $lenisStore.scrollTo(contentBlockEl);
      }
    }, 100);
  });

  const filterBySearchParams = (
    activeSearchParams: string | null,
    activeSortParams: string | null,
    activeArtistParams: string | null,
  ) => {
    let collectionsCopy = [...collections];

    if (!activeSearchParams && !activeSortParams && !activeArtistParams) {
      filteredCollections = collectionsCopy;
      return;
    }

    if (!!activeArtistParams) {
      const filteredCollection = collectionsCopy.filter(
        ({ artist: { slug } }) => slug.current === activeArtistParams,
      );
      collectionsCopy = filteredCollection;
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
        case 'artist-name':
          collectionsCopy = collectionsCopy.sort((a, b) =>
            a.artist.name.localeCompare(b.artist.name),
          );
          break;
        case 'media':
          collectionsCopy = collectionsCopy.sort((a, b) =>
            a.media.localeCompare(b.media),
          );
          break;
        case 'year':
          collectionsCopy = collectionsCopy.sort((a, b) => +a.year - +b.year);
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

<FilteringNavbar {tags} {logoDark} {logoLight}>
  <svelte:fragment slot="name">
    {activeArtistParams
      ? `${activeArtistParams}'s collection`
      : 'Our collection'}
  </svelte:fragment>
  <svelte:fragment slot="sorting-dropdown" let:SortingDropdown>
    <SortingDropdown />
  </svelte:fragment>
</FilteringNavbar>
<div bind:this={contentBlockEl} class="relative z-10 bg-white">
  <Listing list={collectionsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
