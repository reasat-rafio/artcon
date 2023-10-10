<script lang="ts">
  import { twMerge } from 'tailwind-merge';
</script>

<div
  data-load-animate="y"
  class={twMerge(
    'space-y-[6px] pt-[1.5rem] text-[#1B1B1E] lg:pt-[2rem]',
    $$props.class,
  )}
>
  <div class="text-title-2 font-light">
    <slot name="title-1" />
    <!-- {gallery.name} -->
  </div>
  <div class="text-subtitle-2">
    <slot name="title-2" />
    <!-- <span class="font-light">{date}</span> |
    <span class="font-medium text-[#ED1C24]">{status}</span> -->
  </div>
</div>
