<script lang="ts">
  import H4 from '@/components/ui/H4.svelte';
  import type { TeamProps } from '@/lib/types/aboutUs.types';
  import CoreTeam from './CoreTeam.svelte';
  import UserListWithTitle from '@/components/user-list-with-title/UserListWithTitle.svelte';

  export let team: TeamProps[];

  let coreTeam: TeamProps[] = [];
  let extraTeam: TeamProps[] = [];

  for (const member of team) {
    if (member.type === 'core') coreTeam = [...coreTeam, member];
    else if (member.type === 'extra') extraTeam = [...extraTeam, member];
  }
</script>

<!-- PersonaPane -->
<section class="py-xl">
  <div class="container">
    <H4 class="mb-lg">Meet Our Team</H4>

    <div class="pl-[5%]">
      {#if !!coreTeam?.length}
        <CoreTeam {coreTeam} />
      {/if}
      {#if !!extraTeam?.length}
        <UserListWithTitle title="Other team mambers">
          <svelte:fragment slot="list" let:CardsContainer let:Card>
            <CardsContainer>
              {#each extraTeam as { image, name, role, url }}
                {@const el = url ? 'a' : 'div'}
                <Card {el} {image} title={name} subtitle={role} />
              {/each}
            </CardsContainer>
          </svelte:fragment>
        </UserListWithTitle>
      {/if}
    </div>
  </div>
</section>
