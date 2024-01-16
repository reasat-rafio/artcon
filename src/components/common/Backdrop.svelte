<script lang="ts">
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { cn } from '@/lib/cn';

  const dispatch = createEventDispatcher();
</script>

<div
  transition:fade
  tabindex="0"
  role="button"
  aria-label="backdrop"
  on:click={() => dispatch('close')}
  on:keypress={() => dispatch('close')}
  class={cn(
    'fixed inset-0 z-demigod h-full w-full cursor-default bg-black-800/50 backdrop-blur-xl',
    $$props.class,
  )} />
