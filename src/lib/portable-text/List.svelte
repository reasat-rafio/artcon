<script lang="ts">
  import type { ListComponentProps } from '@portabletext/svelte';

  export let portableText: ListComponentProps;
  let {
    value: { listItem },
  } = portableText;

  const elementMap: { [key: string]: string } = {
    menu: 'menu',
    number: 'ol',
    primaryBullet: 'ul',
  };

  const el = elementMap[listItem] ?? 'ul';
</script>

<svelte:element
  this={el}
  class:space-y-2={listItem === 'bullet'}
  class:number_el={listItem === 'number'}
>
  <slot />
</svelte:element>

<style>
  .number_el {
    @apply ml-[1.5em] list-decimal;
  }
</style>
