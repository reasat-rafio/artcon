<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import List from '@/components/pages/artist/list/List.svelte';
  import SearchInput from '@/components/pages/artist/sorting-nav/SearchInput.svelte';
  // import SortInput from '@/components/pages/artist/sorting-nav/SortInput.svelte';
  import SortingNav from '@/components/pages/artist/sorting-nav/SortingNav.svelte';
  import { uniqueTags } from '@/lib/helper';
  import { formatArtistListingProps } from '@/lib/modify-props';
  import type { ArtistPageProps } from '@/lib/types/artist.types';
  import type { PageProps } from '@/lib/types/common.types';
  import uiStore from '@/store/ui';

  export let data: PageProps<ArtistPageProps>;

  $: ({
    page: { seo, sections, artists },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
  } = data);

  let searchEl: HTMLInputElement;
  $: filteredArtists = artists;
  $: tagSearchParam = $page.url.searchParams.get('tag');
  $: nameSearchParam = $page.url.searchParams.get('name');
  $: tags = uniqueTags(artists);
  $: tagSearchParam,
    nameSearchParam,
    filterBySearchParams({ name: nameSearchParam, tag: tagSearchParam });

  const filterBySearchParams = ({
    name,
    tag,
  }: {
    name: string | null;
    tag: string | null;
  }) => {
    uiStore.setPreventScrollToTop(true);

    if (!name && !tag) {
      filteredArtists = artists;
      return;
    }

    if (!!tag) {
      const filterByTag = artists.filter(
        ({ tag: { slug } }) => slug.current === tag,
      );
      filteredArtists = filterByTag;
    }
    if (!!name) {
      const baseForFilter = !!tag ? filteredArtists : artists;
      filteredArtists = baseForFilter?.filter((artist) =>
        artist?.name?.toLowerCase()?.includes(name?.toLowerCase() ?? ''),
      );
    }
  };

  beforeNavigate(() => {
    uiStore.setPreventScrollToTop(false);
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'artist.hero'}
    <Hero props={formatArtistListingProps(props)} />
  {/if}
{/each}

<div class="relative z-10 mt-[100dvh] bg-white">
  <SortingNav bind:searchEl {tags} logo={logoDark}>Our Artists</SortingNav>

  <div
    class="container-primary flex flex-col justify-between gap-y-[1.25rem] py-[2.5rem] md:flex-row xl:hidden">
    <!-- <SortInput /> -->
    <SearchInput bind:searchEl class="" />
  </div>

  <List artists={filteredArtists} />
  <Footer {footer} {contact} logo={logoDark} />
</div>
