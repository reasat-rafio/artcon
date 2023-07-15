<script lang="ts">
  import type { MarkComponentProps } from '@portabletext/svelte';
  export let portableText: MarkComponentProps<{
    hoverEffect: boolean;
    highlight: boolean;
    href: string;
  }>;

  let {
    value: { hoverEffect, highlight, href },
  } = portableText;
</script>

<a
  {href}
  class="{hoverEffect
    ? 'hover:text-blue-main/80 transition-colors duration-200 ease-linear'
    : ''} {highlight ? 'text-theme-primary' : ''} "
>
  <slot /></a
>
