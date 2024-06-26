<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/exhibition/Listing.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import { createListingItemWithImage, uniqueTags } from '@/lib/helper';
  import { formatExhibitionListingProps } from '@/lib/modify-props';
  import type {
    CommonImageAsset,
    PageProps,
    Tag,
  } from '@/lib/types/common.types';
  import type { ExhibitionPageProps } from '@/lib/types/exhibition.types';
  import uiStore from '@/store/ui';

  export let data: PageProps<ExhibitionPageProps>;
  $: ({
    page: { sections, seo, exhibitions },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: filteredExhibition = exhibitions;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSearchParams, filterBySearchParams(activeSearchParams);
  $: tags = uniqueTags(exhibitions);
  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: exhibitionWithImages = createListingItemWithImage(
    filteredExhibition,
    sectionImages,
  );

  const filterBySearchParams = (activeSearchParams: string | null) => {
    uiStore.setPreventScrollToTop(true);

    if (!activeSearchParams) {
      filteredExhibition = exhibitions;
      return;
    }

    const fList = exhibitions.filter(
      ({ tag: { slug } }) => slug.current === activeSearchParams,
    );
    filteredExhibition = fList;
  };

  beforeNavigate(() => {
    uiStore.setPreventScrollToTop(false);
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'exhibitionPage.hero'}
    <Hero props={formatExhibitionListingProps(s)} />
  {/if}
{/each}

<FilteringNavbar {tags} {logoDark} {logoLight}>
  <svelte:fragment slot="name">Our exhibition</svelte:fragment>
</FilteringNavbar>
<div class="relative z-10 bg-white">
  <Listing list={exhibitionWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
