<script lang="ts">
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import Listing from '@/components/pages/exhibition/Listing.svelte';
  import SecondaryNav from '@/components/widgets/seondary-nav/SecondaryNav.svelte';
  import {
    createListingItemWithImage,
    formatExhibitionListingProps,
  } from '@/lib/helper';
  import type { CommonImageAsset, PageProps } from '@/lib/types/common.types';
  import type { ExhibitionPageProps } from '@/lib/types/exhibition.types';

  export let data: PageProps<ExhibitionPageProps>;
  $: ({
    page: { sections, seo, exhibitions, tags },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

  $: filteredExhibition = exhibitions;
  $: aciteveSearchParms = $page.url.searchParams.get('search');
  $: aciteveSearchParms, filterBySearchParams(aciteveSearchParms);
  $: sectionImages = sections.filter(
    ({ _type }) => _type === 'common.imageAsset',
  ) as CommonImageAsset[];
  $: exhibitionWithImages = createListingItemWithImage(
    filteredExhibition,
    sectionImages,
  );

  const filterBySearchParams = (aciteveSearchParms: string | null) => {
    if (!aciteveSearchParms) return;
    const fList = exhibitions.filter(
      ({ tag: { slug } }) => slug.current === aciteveSearchParms,
    );
    filteredExhibition = fList;
  };
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'exhibitionPage.hero'}
    <Hero props={formatExhibitionListingProps(s)} />
  {/if}
{/each}

<SecondaryNav {tags} href="/" logo={logoLight}>Our exhibition</SecondaryNav>
<Listing list={exhibitionWithImages} />
<Footer {footer} {contact} logo={logoLight} />
