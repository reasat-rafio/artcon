<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import type { FormattedItem } from '@/lib/helper';
  import type { Vr } from '@/lib/types/vr.types';
  import Cards from './Cards.svelte';

  export let list: FormattedItem<Vr>[];
</script>

<div>
  {#if !!list?.length}
    {#each list as { items, image }}
      <section
        class="py-section container-primary lg:pr-[2rem] xl:pr-[4.375rem]">
        <Cards {items} />
      </section>

      {#if !!image}
        <ImageAsset props={image} />
      {/if}
    {/each}
  {:else}
    <div class="py-section container">
      <h3 class="head-3">No Virtual Reality Found</h3>
    </div>
  {/if}
</div>
