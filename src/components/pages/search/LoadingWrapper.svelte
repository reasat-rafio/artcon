<script lang="ts">
  import CardSkeleton from '@/components/ui/card/CardSkeleton.svelte';
  import searchStore from '@/store/search';
  import { fade } from 'svelte/transition';

  const generateRandomNumber = () => Math.round(Math.random() * 3) + 2;
</script>

{#if $searchStore.loading}
  <div
    transition:fade
    class="grid flex-[0_0_100%] grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start pl-[1.56rem] md:grid-cols-2 xl:grid-cols-3">
    {#each Array.from({ length: generateRandomNumber() }) as _}
      <CardSkeleton />
    {/each}
  </div>
{:else}
  <slot />
{/if}
