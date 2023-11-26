<script lang="ts">
  import Footer from '@/components/common/footer/Footer.svelte';
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
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);
</script>

<Footer {footer} {contact} logo={logoLight} />
