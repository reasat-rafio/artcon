<script lang="ts">
  import type {
    ArtistsProps,
    GroupExhibirtionProps,
    IncludedArtistsProps,
    SoloExhibitonProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Summary from '../[artist]/Summary.svelte';
  import UserListWithTitle from '@/components/user-list-with-title/UserListWithTitle.svelte';

  export let props: IncludedArtistsProps & { artists: ArtistsProps };
  $: ({ artists, statement } = props);
  $: soloExhibition =
    artists.length === 1 ? (artists as SoloExhibitonProps[]) : null;
  $: groupExhibition =
    artists.length > 1 ? (artists as GroupExhibirtionProps[]) : null;
  $: statementProps = !!statement
    ? { description: statement.statement, title: statement.title }
    : undefined;
</script>

{#if !!soloExhibition?.length}
  <Summary
    props={{
      ...soloExhibition[0].data,
      statement: statementProps,
      personalDocuments: soloExhibition[0].personalDocuments,
    }}
  />
{:else if !!groupExhibition?.length}
  <section class="py-xl">
    <UserListWithTitle class="container" title="Artist in this ehibition">
      <svelte:fragment slot="list" let:CardsContainer let:Card>
        <CardsContainer>
          {#each groupExhibition as { artistPortrait, name, slug }}
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
