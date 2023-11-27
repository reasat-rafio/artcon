<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Navigation from '@/components/pages/search/Navigation.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { SearchPageProps } from '@/lib/types/search.types';

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

  let vrsData = new Set(vrs);
  let collectionsData = new Set(collections);
  let documentariesData = new Set(documentaries);
  let eventsData = new Set(events);
  let exhibitionsData = new Set(exhibitions);
  let projectsData = new Set(projects);
  let publicationsData = new Set(publications);
</script>

<Seo {seo} siteOgImg={ogImage} />
<Navigation logo={logoDark} />
<Footer {footer} {contact} logo={logoLight} />
