<script lang="ts">
  import { cn } from '@/lib/cn';
</script>

<div
  class={cn(
    'overlay pointer-events-none absolute left-0 top-0 z-20 hidden h-screen w-full max-w-[24rem] lg:block',
    $$props.class,
  )} />

<style>
  .overlay {
    background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
</style>
