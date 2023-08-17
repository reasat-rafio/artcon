<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<header class={twMerge('space-y-[10px]', $$props.class ?? '')}>
  <slot />
</header>
