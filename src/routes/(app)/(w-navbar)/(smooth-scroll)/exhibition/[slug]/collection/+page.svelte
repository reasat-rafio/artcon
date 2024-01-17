<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Listing from '@/components/pages/collection/Listing.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import {
    calculateStatusBetweenDates,
    createListingItemWithImage,
  } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhibitionArtworksPageProps } from '@/lib/types/exhibition-detail.types';
  import { lenisStore } from '@/store/lenis';
  import { onMount } from 'svelte';

  export let data: PageProps<ExhibitionArtworksPageProps>;
  $: ({
    page: {
      name,
      cta,
      subtitle,
      topTitle,
      startDate,
      endDate,
      seo,
      collections,
      asset,
      artists,
      tags,
    },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  let contentBlockEl: HTMLDivElement;

  $: ({ date, status } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));
  $: _topTitle = topTitle ?? (status !== 'Ongoing' ? date : status);
  $: _subTitle =
    subtitle ?? artists?.personalDocuments?.name ?? 'Group Exhibition';

  $: filteredCollections = collections;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSortParams = $page.url.searchParams.get('sort');
  $: activeArtistParams = $page.url.searchParams.get('artist');
  $: activeSearchParams,
    activeArtistParams,
    activeSortParams,
    filterBySearchParams(
      activeSearchParams,
      activeSortParams,
      activeArtistParams,
    );

  $: collectionsWithImages = createListingItemWithImage(
    filteredCollections,
    [],
  );

  onMount(() => {
    setTimeout(() => {
      if ($lenisStore && contentBlockEl && browser) {
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

<Seo seo={{ ...seo, title: `Artworks | ${name}` }} siteOgImg={ogImage} />
<Hero
  props={{
    _type: 'common.hero',
    asset,
    cta,
    title: name,
    topTitle: _topTitle,
    subtitle: _subTitle,
  }} />

<div bind:this={contentBlockEl} class="relative z-10 mt-[100vh] bg-white">
  <FilteringNavbar {tags} {logoDark} {logoLight}>
    <svelte:fragment slot="name">{name} collection</svelte:fragment>
    <svelte:fragment slot="sorting-dropdown" let:SortingDropdown>
      <SortingDropdown />
    </svelte:fragment>
  </FilteringNavbar>
  <Listing list={collectionsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
