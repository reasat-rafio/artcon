<script lang="ts">
  import { page } from '$app/stores';
  import NoSearchResultFound from '@/components/common/NoSearchResultFound.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import MobileNavDropdown from '@/components/common/navigation/MobileNavDropdown.svelte';
  import Collection from '@/components/pages/search/Collection.svelte';
  import Documentary from '@/components/pages/search/Documentary.svelte';
  import Event from '@/components/pages/search/Event.svelte';
  import Exhibition from '@/components/pages/search/Exhibition.svelte';
  import Project from '@/components/pages/search/Project.svelte';
  import Publication from '@/components/pages/search/Publication.svelte';
  import Vr from '@/components/pages/search/Vr.svelte';
  import Artist from '@/components/pages/search/artist/Artist.svelte';
  import SearchBar from '@/components/pages/search/search-bar/SearchBar.svelte';
  import { darkNavPaths } from '@/lib/constant';
  import type { PageProps } from '@/lib/types/common.types';
  import type { SearchPageProps } from '@/lib/types/search.types';
  import searchStore from '@/store/search';
  import uiStore from '@/store/ui';
  import { onMount } from 'svelte';

  export let data: PageProps<SearchPageProps>;

  $: ({
    page: {
      seo,
      vrs,
      collections,
      documentaries,
      events,
      exhibitions,
      projects,
      publications,
      artists,
    },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      nav,
      contact,
    },
  } = data);

  $: searchStore.setData({
    seo,
    vrs,
    collections,
    documentaries,
    events,
    exhibitions,
    projects,
    publications,
    artists,
  });

  let contentEl: HTMLDivElement;
  let footerHeight: number;
  let innerWidth = 0;
  $: slidesNumber = innerWidth >= 1280 ? 6 : innerWidth >= 768 ? 4 : 3;

  $: searchResultFound =
    !!$searchStore?.data?.exhibitions?.length ||
    !!$searchStore?.data?.events?.length ||
    !!$searchStore?.data?.collections?.length ||
    !!$searchStore?.data?.vrs?.length ||
    !!$searchStore?.data?.publications?.length ||
    !!$searchStore?.data?.documentaries?.length ||
    !!$searchStore?.data?.projects?.length ||
    !!$searchStore?.data?.artists?.length;

  $: logo = darkNavPaths.includes($page.url.pathname)
    ? $uiStore.mobileNavDropdownOpen
      ? logoLight
      : logoDark
    : logoLight;

  onMount(() => {
    setSectionMinHeight();
  });

  function setSectionMinHeight() {
    const footerEl = document.getElementById('footer');

    if (footerEl && contentEl) {
      footerHeight = footerEl.offsetHeight;
      contentEl.style.minHeight = `calc(100dvh - ${footerHeight}px)`;
    }
  }
</script>

<svelte:window bind:innerWidth on:reset={setSectionMinHeight} />
<Seo {seo} siteOgImg={ogImage} />

{#if $uiStore.mobileNavDropdownOpen}
  <MobileNavDropdown {nav} />
{/if}

<div bind:this={contentEl}>
  <SearchBar {logo} />
  <div>
    {#if searchResultFound}
      {#if !!$searchStore?.data?.exhibitions?.length}
        <Exhibition {slidesNumber} />
      {/if}
      {#if !!$searchStore?.data?.events?.length}
        <Event {slidesNumber} />
      {/if}
      {#if !!$searchStore?.data?.artists?.length}
        <Artist />
      {/if}
      {#if !!$searchStore?.data?.collections?.length}
        <Collection {slidesNumber} />
      {/if}
      {#if !!$searchStore?.data?.vrs?.length}
        <Vr {slidesNumber} />
      {/if}
      {#if !!$searchStore?.data?.publications?.length}
        <Publication {slidesNumber} />
      {/if}
      {#if !!$searchStore?.data?.documentaries?.length}
        <Documentary {slidesNumber} />
      {/if}
      {#if !!$searchStore?.data?.projects?.length}
        <Project {slidesNumber} />
      {/if}
    {:else}
      <NoSearchResultFound
        message="Looks like we couldn't find what you're looking for. Try refining your search criteria." />
    {/if}
  </div>
</div>

<Footer {footer} {contact} logo={logoDark} />
