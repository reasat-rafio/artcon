<script lang="ts">
  export let weight: 'light' | 'normal' | 'semibold' = 'normal';

  $: fontWeight =
    weight === 'light'
      ? 'font-light'
      : weight === 'semibold'
      ? 'font-semibold'
      : 'font-normal';
</script>

<p class="{$$props.class} {fontWeight} text-body-1 text-dark-gunmetal">
  <slot />
</p>
