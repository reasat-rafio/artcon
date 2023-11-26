<script lang="ts">
  import Footer from '@/components/common/footer/Footer.svelte';
  import Navigation from '@/components/pages/search/Navigation.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { SearchPageProps } from '@/lib/types/search.types';

  export let data: PageProps<SearchPageProps>;

  $: ({
    page: {
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

  $: vrs;
  $: collections;
  $: documentaries;
  $: events;
  $: exhibitions;
  $: projects;
  $: publications;
</script>

<Navigation logo={logoDark} />
<Footer {footer} {contact} logo={logoLight} />
