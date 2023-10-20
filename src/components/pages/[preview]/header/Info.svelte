<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div
  data-load-animate="y"
  class={twMerge('space-y-[6px] text-[#1B1B1E] ', $$props.class)}
>
  <div class="text-title-2 font-light">
    <slot name="title-1" />
  </div>
  <div class="whitespace-normal break-all text-subtitle-2">
    <slot name="title-2" />
  </div>
</div>
