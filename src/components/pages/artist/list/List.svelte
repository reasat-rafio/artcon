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
  <div
    class="container-primary flex pb-[2.5rem] pt-[3.12rem] sm:pb-[4.5rem] lg:gap-x-[2rem] xl:gap-x-[6rem] xl:pb-[9rem] 2xl:gap-x-[11.44rem]">
    <Artist
      class="flex-1 max-2xl:space-y-[1.25rem]"
      bind:activeAnchor
      artistGroup={sortedArtistWithTitleAsFirstLetter} />
    <NavigationAnchor {anchors} {activeAnchor} />
  </div>
</section>
