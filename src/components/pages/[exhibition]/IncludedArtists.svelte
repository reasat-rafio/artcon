<script lang="ts">
  import type {
    ArtistsProps,
    IncludedArtistsProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Summary from '../[artist]/Summary.svelte';
  import UserListWithTitle from '@/components/user-list-with-title/UserListWithTitle.svelte';
  import { isSoloExhibition } from '@/lib/helper';

  export let props: IncludedArtistsProps & { artists: ArtistsProps };
  $: ({ artists, statement } = props);

  $: statementProps = !!statement
    ? { description: statement.statement, title: statement.title }
    : undefined;
</script>

{#if isSoloExhibition(artists)}
  <Summary
    props={{
      ...artists.data,
      statement: statementProps,
      personalDocuments: artists.personalDocuments,
    }}
  />
{:else if !!artists?.length}
  <section class="py-section">
    <UserListWithTitle class="container" title="Artist in this ehibition">
      <svelte:fragment slot="list" let:CardsContainer let:Card>
        <CardsContainer>
          {#each artists as { artistPortrait, name, slug }}
            <Card
              el="a"
              url="/artist/{slug.current}"
              image={artistPortrait}
              title={name}
              subtitle={'role'}
            />
          {/each}
        </CardsContainer>
      </svelte:fragment>
    </UserListWithTitle>
  </section>
{/if}
