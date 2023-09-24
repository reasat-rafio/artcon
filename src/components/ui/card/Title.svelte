<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let el: 'h4' | 'h5' | 'h6' = 'h5';
</script>

<svelte:element this={el} class={twMerge('head-lg', $$props.class)}>
  <slot />
</svelte:element>
