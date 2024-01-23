<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/project/Listing.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import { createListingItemWithImage, uniqueTags } from '@/lib/helper';
  import { formatProjectListingProps } from '@/lib/modify-props';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { ProjectPageProps } from '@/lib/types/project.types';

  export let data: PageProps<ProjectPageProps>;
  $: ({
    page: { sections, seo, projects },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: tags = uniqueTags(projects);
  $: filteredProjects = projects;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSearchParams, filterBySearchParams(activeSearchParams);
  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: projectsWithImages = createListingItemWithImage(
    filteredProjects,
    sectionImages,
  );

  const filterBySearchParams = (activeSearchParams: string | null) => {
    if (!activeSearchParams) {
      filteredProjects = projects;
      return;
    }
    const fList = projects.filter(
      ({ tag: { slug } }) => slug.current === activeSearchParams,
    );
    filteredProjects = fList;
  };
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'projectPage.hero'}
    <Hero props={formatProjectListingProps(s)} />
  {/if}
{/each}

<FilteringNavbar {tags} {logoDark} {logoLight}>
  <svelte:fragment slot="name">Our projects</svelte:fragment>
</FilteringNavbar>
<div class="relative z-10 bg-white">
  <Listing list={projectsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
