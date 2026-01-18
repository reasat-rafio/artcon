<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import { cn } from '@/lib/cn';
  import type { Quote } from '@/lib/types/common.types';

  export let quote: Quote;
  export let authorSize = '40px';
  export let isPreview = false;
  $: ({ author, text, url } = quote);
</script>

<section
  use:parallaxAnimation
  class={cn('max-w-[44.375rem] w-full translate-y-[120px]', $$props.class)}>
  <div
    class="head-2 bg-gradient-to-r from-imperial-red to-[#0000004D] bg-clip-text font-optiberling-agency text-transparent break-words">
    <blockquote class="inline" cite={url}>
      <p class="inline">“{text}”</p>
    </blockquote>
    {#if !!author}
      <div class="block" style="font-size: {authorSize}; {isPreview ? 'margin-top: 10px;' : ''}">
        {#if url}
          <a href={url} target="_blank" rel="noopener noreferrer" class="inline cursor-pointer italic hover:underline">– {author}</a>
        {:else}
          <p class="inline italic">– {author}</p>
        {/if}
      </div>
    {/if}
  </div>
</section>
