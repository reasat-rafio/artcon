<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let weight: 'light' | 'normal' | 'semibold' = 'normal';

  $: fontWeight =
    weight === 'light'
      ? 'font-light'
      : weight === 'semibold'
      ? 'font-semibold'
      : 'font-normal';
</script>

<p
  class={twMerge(
    'text-title-2 text-dark-gunmetal lg:text-body-1',
    fontWeight,
    $$props.class,
  )}
>
  <slot />
</p>
