<script lang="ts">
  import type { TeamProps } from '@/lib/types/about-us.types';
  import CoreTeam from './CoreTeam.svelte';
  import OtherMember from './OtherMember.svelte';

  export let team: TeamProps[];
  let coreTeam: TeamProps[] = [];
  let extraTeam: TeamProps[] = [];

  for (const member of team) {
    if (member.type === 'core') coreTeam = [...coreTeam, member];
    else if (member.type === 'extra') extraTeam = [...extraTeam, member];
  }
</script>

<section>
  <div class="container-primary py-section">
    <h2 class="head-4 mb-lg">Meet our team</h2>

    {#if !!coreTeam?.length}
      <CoreTeam {coreTeam} />
    {/if}
    {#if !!extraTeam?.length}
      <OtherMember {extraTeam} />
    {/if}
  </div>
</section>
