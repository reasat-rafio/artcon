<script>
  import { twMerge } from 'tailwind-merge';
</script>

<header class={twMerge('space-y-[8px] lg:space-y-[12px]', $$props.class)}>
  <slot />
</header>
