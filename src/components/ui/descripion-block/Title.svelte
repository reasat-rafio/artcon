<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  export let el: 'h3' | 'h4' | 'h5' = 'h3';
</script>

<svelte:element
  this={el}
  class={twMerge('head-xl text-dark-gunmetal', $$props.class)}
>
  <slot />
</svelte:element>
