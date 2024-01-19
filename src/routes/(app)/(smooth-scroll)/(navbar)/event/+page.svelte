<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/event/Listing.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import { createListingItemWithImage } from '@/lib/helper';
  import { formatEventListingProps } from '@/lib/modify-props';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { EventPageProps } from '@/lib/types/event.types';

  export let data: PageProps<EventPageProps>;

  $: ({
    page: { sections, seo, events, tags },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: filteredEvents = events;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSearchParams, filterBySearchParams(activeSearchParams);

  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: eventsWithImages = createListingItemWithImage(
    filteredEvents,
    sectionImages,
  );

  const filterBySearchParams = (activeSearchParams: string | null) => {
    if (!activeSearchParams) {
      filteredEvents = events;
      return;
    }
    const fList = events.filter(
      ({ tag: { slug } }) => slug.current === activeSearchParams,
    );
    filteredEvents = fList;
  };
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'event.hero'}
    <Hero props={formatEventListingProps(props)} />
  {/if}
{/each}

<div class="relative z-10 mt-[100vh] bg-white">
  <FilteringNavbar {tags} {logoDark} {logoLight}>
    <svelte:fragment slot="name">Our events</svelte:fragment>
  </FilteringNavbar>
  <Listing list={eventsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
