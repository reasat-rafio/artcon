<script lang="ts">
  import type { Youtube as YoutubeProps } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';
  import getYouTubeID from 'get-youtube-id';
  import Youtube from 'svelte-youtube-embed';

  export let yt: YoutubeProps;
  $: ({ caption, url } = yt);

  $: id = getYouTubeID(url as string);
</script>

<section
  {...$$restProps}
  class={twMerge('mx-auto max-w-[72.9375rem]', $$props.class)}>
  <div class="aspect-video h-full max-h-[655px] overflow-hidden">
    <div class="h-full w-full overflow-hidden rounded-[20px] bg-gray-300">
      <Youtube {id} altThumb={true} animations={false} />
    </div>
  </div>
  {#if !!caption}
    <span class="caption">{caption}</span>
  {/if}
</section>
