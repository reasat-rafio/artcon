<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import { cn } from '@/lib/cn';
  import type { Quote } from '@/lib/types/common.types';

  export let quote: Quote;
  $: ({ author, text, url } = quote);
</script>

<section
  use:parallaxAnimation
  class={cn('max-w-[44.375rem] translate-y-[120px]', $$props.class)}>
  <div
    class="head-2 bg-gradient-to-r from-imperial-red to-[#0000004D] bg-clip-text font-optiberling-agency text-transparent">
    <blockquote class="inline" cite={url}>
      <p class="inline">“{text}”</p>
    </blockquote>
    {#if !!author}
      <p class="inline">– {author}</p>
    {/if}
  </div>
</section>
