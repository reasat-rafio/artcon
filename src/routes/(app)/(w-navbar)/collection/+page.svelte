<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/collection/Listing.svelte';
  import SecondaryNav from '@/components/widgets/secondary-nav/SecondaryNav.svelte';
  import { createListingItemWithImage } from '@/lib/helper';
  import { formatCollectionListingProps } from '@/lib/modify-props';
  import type { CollectionPageProps } from '@/lib/types/collection.types';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';

  export let data: PageProps<CollectionPageProps>;

  $: ({
    page: { sections, seo, collections, tags },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
  } = data);

  $: filteredCollections = collections;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSearchParams, filterBySearchParams(activeSearchParams);

  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: collectionsWithImages = createListingItemWithImage(
    filteredCollections,
    sectionImages,
  );

  const filterBySearchParams = (activeSearchParams: string | null) => {
    if (!activeSearchParams) {
      filteredCollections = collections;
      return;
    }
    const fList = collections.filter(
      ({ tag: { slug } }) => slug.current === activeSearchParams,
    );
    filteredCollections = fList;
  };
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'collection.hero'}
    <Hero props={formatCollectionListingProps(props)} />
  {/if}
{/each}
<div class="relative mt-[100vh] bg-white">
  <SecondaryNav {tags} logo={logoDark}>Our collection</SecondaryNav>
  <Listing list={collectionsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
