<script lang="ts" generics="T">
  import { chunkArray } from '@/lib/helper';

  export let items: T[];
  export let slidesPerPage;

  let chunks = chunkArray(items, slidesPerPage);
</script>

{#each chunks as chunk}
  <div class="{$$props.class ?? ''} relative flex-[0_0_100%]">
    <slot {chunk} />
  </div>
{/each}
