<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import { cn } from '@/lib/cn';
  import type { VR } from '@/lib/types/common.types';

  export let vr: VR;
  $: ({ caption, url } = vr);

  let showLoading = false;

  function onIframeLoad() {
    showLoading = false;
  }
</script>

<section
  use:parallaxAnimation
  {...$$restProps}
  class={cn('mx-auto max-w-[72.9375rem] translate-y-[120px]', $$props.class)}>
  <div class="relative aspect-video h-full max-h-[40.938rem] w-full overflow-hidden rounded-xl">
    <iframe
      on:load={onIframeLoad}
      allowfullscreen
      class={cn(
        'h-full w-full overflow-hidden bg-gray-300',
        showLoading && 'invisible',
      )}
      src={url}
      title={caption || 'Virtual Reality Experience'} />

    <div
      class={cn(
        'absolute inset-0 flex h-full w-full animate-pulse items-center justify-center bg-gray-300',
        { hidden: !showLoading },
      )}>
      <span class="title-regular">Loading...</span>
    </div>
  </div>
  {#if !!caption}
    <span class="caption">{caption}</span>
  {/if}
</section>
