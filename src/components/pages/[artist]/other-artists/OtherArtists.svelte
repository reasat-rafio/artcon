<script lang="ts">
  import type { OtherArtists } from '@/lib/types/artist-detail.types';
  import Card from './Card.svelte';

  export let artists: OtherArtists[];
</script>

<section
  class="container-primary pb-section border-t border-light-gray/40 pt-section">
  <h3 class="head-xl mb-md">Other artists</h3>
  <div
    class="grid grid-cols-1 gap-x-[3.56rem] gap-y-[3.12rem] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
    {#each artists as { artistPortrait, name, slug, tag }}
      <Card
        el="a"
        url="/artist/{slug.current}"
        image={artistPortrait}
        title={name}
        subtitle={tag.name} />
    {/each}
  </div>
</section>
