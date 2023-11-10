<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  export let el: 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' = 'h4';
  export let variant: 'sm' | 'lg' = 'lg';
</script>

<svelte:element
  this={el}
  class={twMerge(
    'md:body-light font-inter font-light text-dark-gunmetal',
    variant === 'lg' && 'text-[0.875rem] ',
    variant === 'sm' && 'text-[0.75rem] ',
    $$props.class,
  )}>
  <slot />
</svelte:element>
