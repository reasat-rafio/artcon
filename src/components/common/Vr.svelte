<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { VR } from '@/lib/types/common.types';

  export let vr: VR;
  $: ({ caption, url, thumbnail } = vr);

  let showIframe = false;
  let showLoading = false;
</script>

<section
  use:parallaxAnimation
  {...$$restProps}
  class={cn('mx-auto max-w-[72.9375rem] translate-y-[120px]', $$props.class)}>
  <button
    on:click={() => {
      showIframe = true;
      showLoading = true;
    }}
    class="relative aspect-video h-full max-h-[40.938rem] w-full overflow-hidden rounded-xl outline-none">
    {#if showIframe}
      <iframe
        on:load={() => (showLoading = false)}
        allowfullscreen
        class={cn(
          'h-full w-full overflow-hidden bg-gray-300',
          showLoading && 'invisible',
        )}
        src={url}
        title={caption || 'Virtual Reality Event'} />

      <div
        class={cn(
          'absolute inset-0 flex h-full w-full animate-pulse items-center justify-center bg-gray-300',
          { hidden: !showLoading },
        )}>
        <span class="title-regular">Loading...</span>
      </div>
    {:else}
      <SanityImage
        src={thumbnail}
        sizes="(min-width: 1024px) 70vw, 100vw"
        class="h-full w-full object-cover"
        imageUrlBuilder={imageBuilder}
        alt="VR thumbnail" />
    {/if}
  </button>
  {#if !!caption}
    <span class="caption">{caption}</span>
  {/if}
</section>
