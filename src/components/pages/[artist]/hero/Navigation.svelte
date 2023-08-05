<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { createEventDispatcher } from 'svelte';

  export let activeBlockIndex: number;
  export let blocksLength: number;

  const dispatch = createEventDispatcher();
</script>

<nav class="absolute bottom-0 left-0 z-20 w-full">
  <div class="flex justify-between px-5 py-10 text-white">
    <button on:click={() => dispatch('slideNext')}>
      <ChevronLeftRounded color="white" />
    </button>
    <div>{activeBlockIndex + 1} / {blocksLength}</div>
    <button on:click={() => dispatch('sliedPrev')}>
      <ChevronRightRounded color="white" />
    </button>
  </div>
</nav>
