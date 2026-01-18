<script lang="ts">
  import type {
    ArtistsProps,
    IncludedArtistsProps,
  } from '@/lib/types/exhibition-detail.types';
  import Summary from '../../[artist]/Summary.svelte';
  import { isSoloExhibition } from '@/lib/helper';
  import ArtistList from './ArtistList.svelte';

  export let props: IncludedArtistsProps & { artists: ArtistsProps };
  $: ({ artists, statement } = props);

  $: statementProps = !!statement
    ? { description: statement.statement, title: statement.title }
    : undefined;
</script>

{#if isSoloExhibition(artists)}
  <Summary
    class="{$$props.class}"
    props={{
      ...artists.data,
      statement: statementProps,
      personalDocuments: artists.personalDocuments,
    }} />
{:else if !!artists?.length}
  <ArtistList class="{$$props.class}" {artists} />
{/if}
