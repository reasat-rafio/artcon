<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { VR } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  type State = 'thumbnail' | 'video' | 'iframe';

  export let hideCaption = false;
  export let vr: VR;
  export let autoPlay = false;

  $: ({ caption, url, thumbnail } = vr);

  let state: State = autoPlay ? 'iframe' : 'thumbnail';
  let showLoading = autoPlay;

  function onClickAction() {
    showLoading = true;
    state = 'iframe';
  }
</script>

<section {...$$restProps} class={twMerge($$props.class)}>
  <button
    on:click={onClickAction}
    disabled={autoPlay}
    class="relative mx-auto aspect-video h-fit w-full overflow-hidden rounded-xl disabled:cursor-default">
    {#if state === 'thumbnail'}
      <SanityImage
        src={thumbnail}
        sizes="(min-width: 1024px) 50vw, 100vw"
        class="h-full w-full object-cover"
        imageUrlBuilder={imageBuilder}
        alt="VR thumbnail" />
    {:else if state === 'iframe'}
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
    {/if}
  </button>
  {#if !!caption && !hideCaption}
    <span class="caption">{caption}</span>
  {/if}
</section>
