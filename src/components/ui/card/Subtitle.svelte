<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div class={twMerge('head-8', $$props.class)}>
  <slot />
</div>
