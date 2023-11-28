<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Navbar from '@/components/common/navigation/Navbar.svelte';
  import Collection from '@/components/pages/search/Collection.svelte';
  import Documentary from '@/components/pages/search/Documentary.svelte';
  import Event from '@/components/pages/search/Event.svelte';
  import Exhibition from '@/components/pages/search/Exhibition.svelte';
  import Navigation from '@/components/pages/search/Navigation.svelte';
  import Project from '@/components/pages/search/Project.svelte';
  import Publication from '@/components/pages/search/Publication.svelte';
  import Vr from '@/components/pages/search/Vr.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { SearchPageProps } from '@/lib/types/search.types';
  import searchStore from '@/store/search';

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
    },
    site: {
      logos: { logoLight, logoDark, ogImage },
      footer,
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
  });

  let innerWidth = 0;
  $: slidesNumber = innerWidth >= 1280 ? 6 : innerWidth >= 768 ? 4 : 3;
</script>

<svelte:window bind:innerWidth />
<Seo {seo} siteOgImg={ogImage} />
<Navbar class="sticky block bg-white lg:hidden" logo={logoDark} />
<Navigation logo={logoDark} />

{#if !!$searchStore?.data?.exhibitions?.length}
  <Exhibition {slidesNumber} />
{/if}
{#if !!$searchStore?.data?.events?.length}
  <Event {slidesNumber} />
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

<Footer {footer} {contact} logo={logoLight} />
