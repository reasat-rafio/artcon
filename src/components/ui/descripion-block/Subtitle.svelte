<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  export let el: 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' = 'h4';
  export let variant: 'sm' | 'lg' = 'lg';
</script>

<svelte:element
  this={el}
  class={twMerge(
    'font-inter font-light text-dark-gunmetal',
    variant === 'lg' && 'body-1',
    variant === 'sm' && 'body-2',
    $$props.class,
  )}
>
  <slot />
</svelte:element>
