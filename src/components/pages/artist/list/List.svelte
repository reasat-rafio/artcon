<script lang="ts">
  import type {
    Artist as ArtistProps,
    SortedArtists,
  } from '@/lib/types/artist.types';
  import Artist from './Artists.svelte';
  import NavigationAnchor from './NavigationAnchor.svelte';

  export let artists: ArtistProps[];

  let sortedArtistWithTitleAsFirstLetter: SortedArtists[];
  let anchors: string[] = [];
  let activeAnchor = anchors[0];
  let activeAnchorIndex = 0;

  $: {
    const newSortedArtistListWithTitleAsFirstLetter: SortedArtists[] =
      Object.values(
        artists?.reduce((newVal: Record<string, SortedArtists>, artist) => {
          let firstLetter = artist.name[0].toLocaleUpperCase();
          !newVal[firstLetter]
            ? (newVal[firstLetter] = { title: firstLetter, artists: [artist] })
            : newVal[firstLetter].artists.push(artist);
          return newVal;
        }, {}),
      );

    const alphabeticalSorting = newSortedArtistListWithTitleAsFirstLetter.sort(
      (a, b) => (a.title > b.title ? 1 : -1),
    );

    sortedArtistWithTitleAsFirstLetter = alphabeticalSorting;
    anchors = alphabeticalSorting.map(({ title }) => title);
  }
</script>

<section>
  <div class="container-primary flex gap-x-[11.44rem] pb-[9rem] pt-[3.12rem]">
    <Artist
      class="flex-1"
      bind:activeAnchor
      artistGroup={sortedArtistWithTitleAsFirstLetter} />
    <NavigationAnchor {anchors} {activeAnchor} {activeAnchorIndex} />
  </div>
</section>
