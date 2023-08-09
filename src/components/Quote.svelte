<script lang="ts">
  import type { Quote } from '@/lib/types/common.types';

  export let quote: Quote;
  let { author, text, url } = quote;
</script>

<section class="{$$props.class ?? ''} max-w-[740px]">
  <div
    class="bg-gradient-to-r from-[#EA234080] to-[#0000004D] bg-clip-text font-abc-arizona-serif text-head-2 text-transparent"
  >
    <blockquote class="inline" cite={url}>
      <p class="inline">“{text}”</p>
    </blockquote>
    {#if !!author}
      <p class="inline">– {author}</p>
    {/if}
  </div>
</section>
