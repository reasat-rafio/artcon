<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/vr/Listing.svelte';
  import FilteringNavbar from '@/components/widgets/filtering-navbar/FilteringNavbar.svelte';
  import { createListingItemWithImage, uniqueTags } from '@/lib/helper';
  import { formatVrListingProps } from '@/lib/modify-props';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { VrPageProps } from '@/lib/types/vr.types';
  import uiStore from '@/store/ui';

  export let data: PageProps<VrPageProps>;
  $: ({
    page: { sections, seo, vrs },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: tags = uniqueTags(vrs);
  $: filteredVr = vrs;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSearchParams, filterBySearchParams(activeSearchParams);
  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: vrsWithImages = createListingItemWithImage(filteredVr, sectionImages);

  const filterBySearchParams = (activeSearchParams: string | null) => {
    uiStore.setPreventScrollToTop(true);

    if (!activeSearchParams) {
      filteredVr = vrs;
      return;
    }

    const fList = vrs.filter(
      ({ category: { slug } }) => slug.current === activeSearchParams,
    );
    filteredVr = fList;
  };

  beforeNavigate(() => {
    uiStore.setPreventScrollToTop(false);
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'vrPage.hero'}
    <Hero props={formatVrListingProps(s)} />
  {/if}
{/each}

<FilteringNavbar {tags} {logoDark} {logoLight}>
  <svelte:fragment slot="name">Our Virtual Reality</svelte:fragment>
</FilteringNavbar>
<div class="relative z-10 bg-white">
  <Listing list={vrsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
