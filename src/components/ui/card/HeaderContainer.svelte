<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<header class={twMerge('space-y-[0.625rem]', $$props.class ?? '')}>
  <slot />
</header>
