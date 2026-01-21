<script lang="ts">
  import type { TeamProps } from '@/lib/types/about-us.types';
  import CoreTeam from './CoreTeam.svelte';
  import OtherMember from './OtherMember.svelte';
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';

  export let team: TeamProps[];
  let coreTeam: TeamProps[] = [];
  let extraTeam: TeamProps[] = [];

  for (const member of team) {
    if (member.type === 'core') coreTeam = [...coreTeam, member];
    else if (member.type === 'extra') extraTeam = [...extraTeam, member];
  }
</script>

<section class="w-full max-w-full overflow-hidden {$$props.class}">
  <div class="container-primary pt-section">
    <h2 use:parallaxAnimation class="head-4 mb-lg translate-y-[120px]">
      Meet Our Team
    </h2>

    {#if !!coreTeam?.length}
      <CoreTeam {coreTeam} />
    {/if}
    {#if !!extraTeam?.length}
      <OtherMember {extraTeam} />
    {/if}
  </div>
</section>
