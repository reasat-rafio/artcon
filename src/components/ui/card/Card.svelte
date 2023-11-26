<script lang="ts">
  import Title from './Title.svelte';
  import Subtitle from './Subtitle.svelte';
  import Image from './Image.svelte';
  import Asset from './Asset.svelte';
  import HeaderContainer from './HeaderContainer.svelte';
  import { cn } from '@/lib/cn';

  export let el: 'a' | 'div' = 'div';
  export let href: string | undefined = undefined;
</script>

<svelte:element this={el} {href} class={cn($$props.class)}>
  <slot {Title} {Subtitle} Container={HeaderContainer} {Image} {Asset} />
</svelte:element>
