<script lang="ts">
  import { cn } from '@/lib/cn';
  import type { SortedArtists } from '@/lib/types/artist.types';
  import Artist from './Artist.svelte';

  export let artistGroup: SortedArtists[];
  export let activeAnchor: string;
</script>

<div class={cn('', $$props.class)}>
  {#each artistGroup as { title, artists }, index}
    <section id={title} class={index !== 0 ? 'mt-[3.125rem]' : ''}>
      <h2
        class="!font-outfit m-0 text-[1.50363rem] font-medium tracking-[-0.03006rem] text-[#000]/40">
        {title}
      </h2>

      <div class="space-y-[2.5rem]">
        {#each artists as artist (artist.slug.current)}
          <Artist bind:activeAnchor {artist} {title} />
        {/each}
      </div>
    </section>
  {/each}
</div>
