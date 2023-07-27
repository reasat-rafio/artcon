<script lang="ts">
  import H6 from '../H6.svelte';
  import H8 from '../H8.svelte';
  import Image from './Image.svelte';

  export let href: string | undefined = undefined;
</script>

{#if !!href}
  <a class="{$$props.class ?? ''} " {href}>
    <slot Title={H6} Subtitle={H8} {Image} />
  </a>
{:else}
  <div class="{$$props.class ?? ''} ">
    <slot Title={H6} Subtitle={H8} {Image} />
  </div>
{/if}
