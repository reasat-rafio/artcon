<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let el: string = 'h6';
</script>

<svelte:element
  this={el}
  class={twMerge('font-abc-arizona-serif text-head-8', $$props.class ?? '')}
>
  <slot />
</svelte:element>
