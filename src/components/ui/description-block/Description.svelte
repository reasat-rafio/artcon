<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<p class={twMerge('md:body-light body-light-m', $$props.class)}>
  <slot />
</p>
