<script lang="ts">
  import type { VR } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let hideCaption = false;
  export let vr: VR;
  $: ({ caption, url } = vr);
</script>

<section {...$$restProps} class={twMerge('sm:max-w-[1167px]', $$props.class)}>
  <div
    class="mx-auto h-[65vh] overflow-hidden sm:aspect-video sm:h-full sm:max-h-[655px]">
    <iframe
      allowfullscreen
      class="h-full w-full overflow-hidden rounded-xl bg-gray-300"
      src={url}
      title="Exhibition preview" />
  </div>
  {#if !!caption && !hideCaption}
    <span class="caption">{caption}</span>
  {/if}
</section>
