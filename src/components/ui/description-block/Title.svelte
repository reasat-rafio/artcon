<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  export let el: 'h2' | 'h3' | 'h4' | 'h5' = 'h3';
</script>

<svelte:element
  this={el}
  class={twMerge(
    'head-5-m lg:head-4 font-optiberling-agency  text-dark-gunmetal',
    $$props.class,
  )}>
  <slot />
</svelte:element>
