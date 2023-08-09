<script lang="ts">
  import H4 from '@/components/ui/H4.svelte';
  import type { TeamProps } from '@/lib/types/aboutUs.types';
  import CoreTeam from './CoreTeam.svelte';
  import ExtraTeam from './ExtraTeam.svelte';

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
      {#if coreTeam.length}
        <CoreTeam {coreTeam} />
      {/if}
      {#if extraTeam.length}
        <ExtraTeam {extraTeam} />
      {/if}
    </div>
  </div>
</section>
