<script lang="ts">
  import { cn } from '@/lib/cn';

  export let anchors: string[];
  export let activeAnchor: string;
  export let activeAnchorIndex: number;
</script>

<aside class={cn($$props.class)}></aside>
