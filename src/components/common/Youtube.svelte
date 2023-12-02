<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Youtube as YoutubeProps } from '@/lib/types/common.types';
  import getYouTubeID from 'get-youtube-id';
  import Youtube from 'svelte-youtube-embed';

  export let yt: YoutubeProps;
  $: ({ caption, url, thumbnail } = yt);

  $: id = getYouTubeID(url as string);
  let youtubeWrapperEl: HTMLDivElement;
</script>

<section
  {...$$restProps}
  class={cn('mx-auto max-w-[72.9375rem]', $$props.class)}>
  <div class="aspect-video h-full max-h-[655px] overflow-hidden">
    <div
      bind:this={youtubeWrapperEl}
      class="h-full w-full overflow-hidden rounded-[20px] bg-gray-300">
      {#if !!thumbnail}
        <Youtube {id} altThumb={true} animations={false}>
          <figure class="h-full w-full" slot="thumbnail">
            <SanityImage
              class="h-full w-full object-cover"
              src={thumbnail}
              imageUrlBuilder={imageBuilder}
              sizes="(min-width: 1024px) 70vw, 100vw"
              alt="youtube thumbnail" />
          </figure>
        </Youtube>
      {:else}
        <Youtube {id} altThumb={true} animations={false} />
      {/if}
    </div>
  </div>
  {#if !!caption}
    <span class="caption">{caption}</span>
  {/if}
</section>
