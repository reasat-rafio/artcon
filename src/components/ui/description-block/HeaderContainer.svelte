<script>
  import { twMerge } from 'tailwind-merge';
</script>

<header
  class={twMerge(
    'flex flex-col gap-y-[0.25rem] lg:gap-y-[0.5rem]',
    $$props.class,
  )}>
  <slot />
</header>
