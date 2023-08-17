<script lang="ts">
  import H6 from '../H6.svelte';
  import H8 from '../H8.svelte';
  import Image from './Image.svelte';
  import HeaderContainer from './HeaderContainer.svelte';

  export let el: 'a' | 'div' = 'div';
  export let href: string | undefined = undefined;
</script>

<svelte:element this={el} {href} class={$$props.class ?? ''}>
  <slot Title={H6} Subtitle={H8} Container={HeaderContainer} {Image} />
</svelte:element>
