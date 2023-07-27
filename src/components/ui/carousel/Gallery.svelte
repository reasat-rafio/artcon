<script lang="ts" generics="T">
  import { chunkArray } from '@/lib/helper';

  export let items: T[];
  export let slidesPerView;

  let chunks = chunkArray(items, slidesPerView);
</script>

{#each chunks as chunk}
  <div class="{$$props.class ?? ''} flex-[0_0_100%]">
    <slot {chunk} />
  </div>
{/each}
