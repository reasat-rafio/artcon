<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<p class={twMerge('text-body-2 font-light md:text-body-1', $$props.class)}>
  <slot />
</p>
