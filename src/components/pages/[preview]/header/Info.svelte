<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div
  data-load-animate="y"
  class={twMerge('space-y-[0.38rem] text-[#1B1B1E] ', $$props.class)}>
  <slot />
</div>
