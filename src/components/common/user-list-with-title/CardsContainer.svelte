<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div
  class={twMerge(
    'grid grid-cols-2 gap-[2rem] md:gap-[3.56rem] lg:grid-cols-3',
    $$props.class,
  )}>
  <slot />
</div>
