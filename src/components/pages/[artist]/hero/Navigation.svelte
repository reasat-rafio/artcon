<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';
  import { blur, fade, fly, slide } from 'svelte/transition';

  export let activeBlockIndex: number;
  export let blocksLength: number;
  export let scrollDirection: 'forward' | 'backward';

  const dispatch = createEventDispatcher();
</script>

<nav class="absolute bottom-0 left-0 z-20 w-full">
  <div class="flex justify-between px-5 py-10 text-white">
    <button on:click={() => dispatch('sliedPrev')}>
      <ChevronLeftRounded color="white" />
    </button>
    <div>
      <span>
        {activeBlockIndex + 1}
      </span>
      / {blocksLength}
    </div>
    <button on:click={() => dispatch('slideNext')}>
      <ChevronRightRounded color="white" />
    </button>
  </div>
</nav>
