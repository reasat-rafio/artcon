<script lang="ts">
  import type { TeamProps } from '@/lib/types/about-us.types';
  import CoreTeam from './CoreTeam.svelte';
  import UserListWithTitle from '@/components/common/user-list-with-title/UserListWithTitle.svelte';

  export let team: TeamProps[];

  let coreTeam: TeamProps[] = [];
  let extraTeam: TeamProps[] = [];

  for (const member of team) {
    if (member.type === 'core') coreTeam = [...coreTeam, member];
    else if (member.type === 'extra') extraTeam = [...extraTeam, member];
  }
</script>

<section class="py-section">
  <div class="container">
    <h2 class="mb-lg text-[2rem] tracking-[0.04rem]">Meet Our Team</h2>
    <div>
      {#if !!coreTeam?.length}
        <CoreTeam {coreTeam} />
      {/if}
      {#if !!extraTeam?.length}
        <UserListWithTitle title="Other team mambers">
          <svelte:fragment slot="list" let:CardsContainer let:Card>
            <CardsContainer>
              {#each extraTeam as { image, name, role, url }}
                <Card
                  el={url ? 'a' : 'div'}
                  {image}
                  title={name}
                  subtitle={role}
                  {url} />
              {/each}
            </CardsContainer>
          </svelte:fragment>
        </UserListWithTitle>
      {/if}
    </div>
  </div>
</section>
