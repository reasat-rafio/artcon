<script lang="ts">
  import Title from './Title.svelte';
  import Subtitle from './Subtitle.svelte';
  import Image from './Image.svelte';
  import Asset from './Asset.svelte';
  import HeaderContainer from './HeaderContainer.svelte';
  import { cn } from '@/lib/cn';
  import { createEventDispatcher } from 'svelte';

  export let el: 'a' | 'div' = 'div';
  export let href: string | undefined = undefined;

  const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={el}
  {href}
  class={cn($$props.class)}
  on:click={() => dispatch('lightboxAction')}
  {...$$restProps}>
  <slot {Title} {Subtitle} Container={HeaderContainer} {Image} {Asset} />
</svelte:element>
