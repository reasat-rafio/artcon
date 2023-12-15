<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import type { FormattedItem } from '@/lib/helper';
  import type { Event } from '@/lib/types/event.types';
  import Cards from './Cards.svelte';
  import NoSearchResultFound from '@/components/common/NoSearchResultFound.svelte';

  export let list: FormattedItem<Event>[];
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
    <NoSearchResultFound />
  {/if}
</div>
