<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div
  data-load-animate="y"
  class={twMerge('space-y-[0.38rem] text-eerie-black ', $$props.class)}>
  <slot />
</div>
