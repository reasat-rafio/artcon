<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { VR } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let hideCaption = false;
  export let vr: VR;

  $: ({ caption, url, thumbnail } = vr);

  let showIframe = false;
  let showLoading = false;
</script>

<section {...$$restProps} class={twMerge('sm:max-w-[1167px]', $$props.class)}>
  <button
    on:click={() => {
      showIframe = true;
      showLoading = true;
    }}
    class="relative mx-auto h-[65vh] w-full overflow-hidden rounded-xl sm:aspect-video sm:h-full sm:max-h-[40.938rem]">
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
        sizes="(min-width: 1024px) 50vw, 100vw"
        class="h-full w-full object-cover"
        imageUrlBuilder={imageBuilder}
        alt="VR thumbnail" />
    {/if}
  </button>
  {#if !!caption && !hideCaption}
    <span class="caption">{caption}</span>
  {/if}
</section>
