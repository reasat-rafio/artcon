<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div
  data-load-animate="y"
  class={twMerge('text-eerie-black space-y-[0.38rem] ', $$props.class)}>
  <slot />
</div>
