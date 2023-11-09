<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { zeroPad } from '@/lib/helper';
  import { createEventDispatcher } from 'svelte';
  import { sineOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  export let activeBlockIndex: number;
  export let blocksLength: number;
  export let scrollDirection: 'forward' | 'backward';

  const dispatch = createEventDispatcher();
</script>

<nav class="absolute bottom-0 left-0 z-20 w-full">
  <div class="flex justify-between px-5 py-5 text-white lg:py-10">
    <button on:click={() => dispatch('sliedPrev')}>
      <ChevronLeftRounded color="white" />
    </button>
    <div
      class="flex items-center space-x-1 font-optiberling-agency font-medium"
    >
      {#key activeBlockIndex}
        <span
          in:fly={{
            y: scrollDirection === 'forward' ? 5 : -5,
            duration: 600,
            easing: sineOut,
          }}
        >
          {zeroPad(activeBlockIndex + 1)}
        </span>
      {/key}
      <span>
        / {zeroPad(blocksLength)}
      </span>
    </div>
    <button on:click={() => dispatch('slideNext')}>
      <ChevronRightRounded color="white" />
    </button>
  </div>
</nav>
