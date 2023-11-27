<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Collection from '@/components/pages/search/Collection.svelte';
  import Event from '@/components/pages/search/Event.svelte';
  import Exhibition from '@/components/pages/search/Exhibition.svelte';
  import Navigation from '@/components/pages/search/Navigation.svelte';
  import Project from '@/components/pages/search/Project.svelte';
  import Publication from '@/components/pages/search/Publication.svelte';
  import Vr from '@/components/pages/search/Vr.svelte';
  import Documentary from '@/components/pages/search/Documentary.svelte';
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
</script>

<Seo {seo} siteOgImg={ogImage} />
<Navigation logo={logoDark} />

{#if !!$searchStore?.data?.exhibitions?.length}
  <Exhibition />
{/if}
{#if !!$searchStore?.data?.events?.length}
  <Event />
{/if}
{#if !!$searchStore?.data?.collections?.length}
  <Collection />
{/if}
{#if !!$searchStore?.data?.vrs?.length}
  <Vr />
{/if}
{#if !!$searchStore?.data?.publications?.length}
  <Publication />
{/if}
{#if !!$searchStore?.data?.documentaries?.length}
  <Documentary />
{/if}
{#if !!$searchStore?.data?.projects?.length}
  <Project />
{/if}

<Footer {footer} {contact} logo={logoLight} />
