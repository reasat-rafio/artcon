<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div class={twMerge('text-head-8', $$props.class)}>
  <slot />
</div>
