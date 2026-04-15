<script lang="ts">
  import { cn } from '@/lib/cn';
</script>

<div
  data-load-animate="y"
  class={cn('space-y-[0.38rem] text-eerie-black ', $$props.class)}>
  <slot />
</div>
