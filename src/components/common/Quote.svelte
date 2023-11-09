<script lang="ts">
  import type { Quote } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let quote: Quote;
  $: ({ author, text, url } = quote);
</script>

<section class={twMerge('max-w-[44.375rem]', $$props.class)}>
  <div
    class="head-2 bg-gradient-to-r from-[#EA234080] to-[#0000004D] bg-clip-text font-optiberling-agency text-transparent">
    <blockquote class="inline" cite={url}>
      <p class="inline">“{text}”</p>
    </blockquote>
    {#if !!author}
      <p class="inline">– {author}</p>
    {/if}
  </div>
</section>
