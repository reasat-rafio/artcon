<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Exhibition from '@/components/pages/search/Exhibition.svelte';
  import Event from '@/components/pages/search/Event.svelte';
  import Navigation from '@/components/pages/search/Navigation.svelte';
  import Publication from '@/components/pages/search/Publication.svelte';
  import Project from '@/components/pages/search/Project.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { SearchPageProps } from '@/lib/types/search.types';
  import Collection from '@/components/pages/search/Collection.svelte';
  import Vr from '@/components/pages/search/Vr.svelte';
  import Documentary from '@/components/pages/search/documentary.svelte';

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
</script>

<Seo {seo} siteOgImg={ogImage} />
<Navigation logo={logoDark} />

{#if !!exhibitions?.length}
  <Exhibition {exhibitions} />
{/if}
{#if !!events?.length}
  <Event {events} />
{/if}
{#if !!collections?.length}
  <Collection {collections} />
{/if}
{#if !!vrs?.length}
  <Vr {vrs} />
{/if}
{#if !!publications?.length}
  <Publication {publications} />
{/if}
{#if !!documentaries?.length}
  <Documentary {documentaries} />
{/if}
{#if !!projects?.length}
  <Project {projects} />
{/if}

<Footer {footer} {contact} logo={logoLight} />
