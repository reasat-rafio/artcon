<script lang="ts">
  import { cn } from '@/lib/cn';

  import type { SortedArtists } from '@/lib/types/artist.types';
  import Artist from './Artist.svelte';
  import { fade } from 'svelte/transition';

  export let artistGroup: SortedArtists[];
  export let activeAnchor: string;
</script>

<div class={cn('', $$props.class)}>
  {#each artistGroup as { title, artists }}
    <section id={title}>
      <h2
        class="!font-outfit text-[1.50363rem] font-medium tracking-[-0.03006rem] text-[#ED1C24]">
        {title}
      </h2>

      <div class="space-y-[2.5rem]">
        {#each artists as artist}
          <Artist bind:activeAnchor {artist} {title} />
        {/each}
      </div>
    </section>
  {/each}
</div>
