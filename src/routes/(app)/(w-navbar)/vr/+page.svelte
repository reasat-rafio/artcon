<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/vr/Listing.svelte';
  import SecondaryNav from '@/components/widgets/secondary-nav/SecondaryNav.svelte';
  import { createListingItemWithImage } from '@/lib/helper';
  import { formatVrListingProps } from '@/lib/modify-props';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { VrPageProps } from '@/lib/types/vr.types';

  export let data: PageProps<VrPageProps>;
  $: ({
    page: { sections, seo, vrs, tags },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
  } = data);

  $: filteredVr = vrs;
  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSearchParams, filterBySearchParams(activeSearchParams);
  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: vrsWithImages = createListingItemWithImage(filteredVr, sectionImages);

  const filterBySearchParams = (activeSearchParams: string | null) => {
    if (!activeSearchParams) {
      filteredVr = vrs;
      return;
    }

    const fList = vrs.filter(
      ({ category: { slug } }) => slug.current === activeSearchParams,
    );
    filteredVr = fList;
  };
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'vrPage.hero'}
    <Hero props={formatVrListingProps(s)} />
  {/if}
{/each}

<div class="relative mt-[100vh] bg-white">
  <SecondaryNav {tags} logo={logoDark}>Our virtual reality</SecondaryNav>
  <Listing list={vrsWithImages} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
