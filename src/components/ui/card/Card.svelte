<script lang="ts">
  import Title from './Title.svelte';
  import Subtitle from './Subtitle.svelte';
  import Image from './Image.svelte';
  import HeaderContainer from './HeaderContainer.svelte';
  import { twMerge } from 'tailwind-merge';

  export let el: 'a' | 'div' = 'div';
  export let href: string | undefined = undefined;
</script>

<svelte:element this={el} {href} class={twMerge('', $$props.class)}>
  <slot {Title} {Subtitle} Container={HeaderContainer} {Image} />
</svelte:element>
