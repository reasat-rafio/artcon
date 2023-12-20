<script lang="ts">
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
  <div class="flex justify-center px-5 py-5 text-white lg:py-10">
    <div
      class="flex items-center space-x-1 font-optiberling-agency font-medium">
      {#key activeBlockIndex}
        <button
          on:click={() => dispatch('slidePrev')}
          in:fly={{
            y: scrollDirection === 'forward' ? 5 : -5,
            duration: 600,
            easing: sineOut,
          }}>
          {zeroPad(activeBlockIndex + 1)}
        </button>
      {/key}
      <button on:click={() => dispatch('slideNext')}>
        / {zeroPad(blocksLength)}
      </button>
    </div>
  </div>
</nav>
