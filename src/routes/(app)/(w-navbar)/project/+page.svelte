<script lang="ts">
  import { page } from '$app/stores';

  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import SecondaryNav from '@/components/widgets/secondary-nav/SecondaryNav.svelte';
  import {
    createListingItemWithImage,
    formatProjectListingProps,
  } from '@/lib/helper';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { ProjectPageProps } from '@/lib/types/project.types';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/project/Listing.svelte';

  export let data: PageProps<ProjectPageProps>;
  $: ({
    page: { sections, seo, tags, projects },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

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
<div class="relative mt-[100vh] bg-white">
  <SecondaryNav {tags} href="/" logo={logoLight}>Our projects</SecondaryNav>
  <Listing list={projectsWithImages} />
  <Footer {footer} {contact} logo={logoLight} />
</div>
