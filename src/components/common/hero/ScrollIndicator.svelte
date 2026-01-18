<script lang="ts">
  import ChevronDown from '@/components/icons/ChevronDown.svelte';
  import { cn } from '@/lib/cn';
</script>

<div
  id="pointer"
  class={cn(
    'absolute -mt-[50px] opacity-0 max-lg:bottom-[10%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0 lg:top-1/2 lg:-translate-y-1/2',
    $$props.class,
  )}>
  <div
    class="flex items-center justify-center space-x-[0.5rem] text-platinum lg:space-x-[1.06rem] lg:pr-[4.07rem]">
    <span class="text-[0.84375rem] font-normal uppercase tracking-[0.01688rem] shadow-text-discover">
      Discover our stories
    </span>
    <ChevronDown
      aria-label="Scroll to next slide"
      class="chevron-icon animate-bounce text-white" />
  </div>
</div>
