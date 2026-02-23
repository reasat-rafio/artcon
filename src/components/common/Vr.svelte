<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { cn } from '@/lib/cn';
  import type { VR } from '@/lib/types/common.types';

  export let vr: VR;
  $: ({ caption, url, coverImage, isActive } = vr);

  let showLoading = false;

  function onIframeLoad() {
    showLoading = false;
  }

  // Show cover image if VR is inactive or temporarily inactive
  $: shouldShowCoverImage = isActive === 'inactive' || isActive === 'temporarily-inactive';
</script>

<section
  use:parallaxAnimation
  {...$$restProps}
  class={cn('mx-auto max-w-[72.9375rem] translate-y-[120px]', $$props.class)}>
  {#if shouldShowCoverImage && !!coverImage}
    <div class="relative aspect-video h-full max-h-[40.938rem] w-full overflow-hidden rounded-xl">
      <SanityImage
        src={coverImage}
        sizes="(min-width: 1024px) 50vw, 100vw"
        class="h-full w-full object-cover"
        imageUrlBuilder={imageBuilder}
        alt="VR cover image" />
    </div>
  {:else}
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
  {/if}
  {#if !!caption}
    <span class="caption">{caption}</span>
  {/if}
</section>
