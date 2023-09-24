<script lang="ts">
  import Vr from '@/components/pages/landing/collections/VR.svelte';
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import uiStore from '@/store/ui';
  import Exhibition from './Exhibition.svelte';

  export let props: CollectionsProps & { DEFAULT_COLUMN_W_PERCENTAGE: number };
  $: ({ collections, DEFAULT_COLUMN_W_PERCENTAGE } = props);

  let rootEl: HTMLElement;
  let containerEl: HTMLDivElement;
  $: containerWidth =
    collections?.length * DEFAULT_COLUMN_W_PERCENTAGE +
    50 +
    ($uiStore.seclectedPreviewIndex !== null
      ? 100 - DEFAULT_COLUMN_W_PERCENTAGE
      : 0);
</script>

<section bind:this={rootEl} class="pointer-events-none translate-x-[100vw]">
  <div bind:this={containerEl} style="width: {containerWidth}vw;" class="flex">
    {#each collections as collection, index}
      {#if collection._type === 'vr'}
        <Vr props={{ ...collection, index, DEFAULT_COLUMN_W_PERCENTAGE }} />
      {:else if collection._type === 'exhibition'}
        <Exhibition
          props={{ ...collection, index, DEFAULT_COLUMN_W_PERCENTAGE }}
        />
      {/if}
    {/each}
  </div>
</section>
