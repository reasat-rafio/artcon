<script lang="ts">
  import UserListWithTitle from '@/components/common/user-list-with-title/UserListWithTitle.svelte';
  import type { OtherArtists } from '@/lib/types/artistDetail.types';
  export let artists: OtherArtists[];
</script>

<section class="container-primary py-section">
  <UserListWithTitle title="Other artists">
    <svelte:fragment slot="list" let:CardsContainer let:Card>
      <CardsContainer>
        {#each artists as { artistPortrait, name, slug, tag }}
          <Card
            el="a"
            url="/artist/{slug.current}"
            image={artistPortrait}
            title={name}
            subtitle={tag.name}
          />
        {/each}
      </CardsContainer>
    </svelte:fragment>
  </UserListWithTitle>
</section>
