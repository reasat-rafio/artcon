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
    'body-light-m lg:body-light text-dark-gunmetal ',
    fontWeight,
    $$props.class,
  )}
  {...$$restProps}>
  <slot />
</p>
