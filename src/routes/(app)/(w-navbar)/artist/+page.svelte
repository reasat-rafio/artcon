<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import type { ArtistPageProps } from '@/lib/types/artist.types';
  import type { PageProps } from '@/lib/types/common.types';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  import { formatArtistListingProps } from '@/lib/modify-props';
  import List from '@/components/pages/artist/list/List.svelte';
  import SortingNav from '@/components/pages/artist/sorting-nav/SortingNav.svelte';
  import { page } from '$app/stores';

  export let data: PageProps<ArtistPageProps>;

  $: ({
    page: { seo, sections, artists, tags },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

  $: filteredArtists = artists;
  $: tagSearchParam = $page.url.searchParams.get('tag');
  $: nameSearchParam = $page.url.searchParams.get('name');
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
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'artist.hero'}
    <Hero props={formatArtistListingProps(props)} />
  {/if}
{/each}

<div class="relative mt-[100vh] bg-white">
  <SortingNav {tags} logo={logoLight}>Our Artists</SortingNav>
  <List artists={filteredArtists} />
  <Footer {footer} {contact} logo={logoLight} />
</div>
