<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextBlock } from 'sanity';
  export let value: PortableTextBlock;
</script>

<div class="{$$props.class ?? ''} text-title-2 !leading-relaxed">
  <PortableText {value} />
</div>
