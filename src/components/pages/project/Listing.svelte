<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import NoSearchResultFound from '@/components/common/NoSearchResultFound.svelte';
  import type { FormattedItem } from '@/lib/helper';
  import type { Project } from '@/lib/types/project.types';
  import Cards from './Cards.svelte';

  export let list: FormattedItem<Project>[];
</script>

<div>
  {#if !!list?.length}
    {#each list as { items, image }}
      <section
        class="py-section container-primary  ">
        <Cards {items} />
      </section>

      {#if !!image}
        <ImageAsset props={image} />
      {/if}
    {/each}
  {:else}
    <NoSearchResultFound />
  {/if}
</div>
