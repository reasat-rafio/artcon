<script lang="ts">
  import type { MarkComponentProps } from '@portabletext/svelte';
  export let portableText: MarkComponentProps<{
    paddingLeft: number;
  }>;

  let {
    value: { paddingLeft },
  } = portableText;
</script>

<span class="inline-block" style="padding-left: {paddingLeft}px;"
  ><slot />
</span>
