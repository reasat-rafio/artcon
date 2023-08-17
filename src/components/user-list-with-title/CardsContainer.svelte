<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div class={twMerge('grid grid-cols-3 gap-[22px]', $$props.class ?? '')}>
  <slot />
</div>
