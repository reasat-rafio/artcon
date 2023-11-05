<script lang="ts">
  import type { VR } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let vr: VR;
  $: ({ caption, url } = vr);
</script>

<section {...$$restProps} class={twMerge('max-w-[72.9375rem]', $$props.class)}>
  <div class="mx-auto aspect-video h-full max-h-[655px] overflow-hidden">
    <iframe
      allowfullscreen
      class="h-full w-full overflow-hidden rounded-[20px] bg-gray-300"
      src={url}
      title="Exhibition preview"
    />
  </div>
  {#if !!caption}
    <span class="caption">{caption}</span>
  {/if}
</section>
