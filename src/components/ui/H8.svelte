<script lang="ts">
  export let el: string = 'h6';
</script>

<svelte:element
  this={el}
  class="{$$props.class ?? ''} font-abc-arizona-serif text-head-8"
>
  <slot />
</svelte:element>
