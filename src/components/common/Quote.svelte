<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import { cn } from '@/lib/cn';
  import type { Quote } from '@/lib/types/common.types';

  export let quote: Quote;
  export let smallAuthor = false;
  $: ({ author, text, url } = quote);

  $: authorClass = cn(
    'block mt-[0.6rem]',
    smallAuthor
      ? 'text-lg md:text-xl lg:text-2xl'
      : 'text-2xl md:text-3xl lg:text-[2.5rem]',
  );
</script>

<section use:parallaxAnimation class={cn('max-w-[44.375rem] w-full translate-y-[120px]', $$props.class)}>
  {#if url}
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      class="block cursor-pointer hover:opacity-80 transition-opacity">
      <div
        class="head-2 bg-gradient-to-r from-imperial-red to-[#0000004D] bg-clip-text font-optiberling-agency text-transparent break-words">
        <blockquote class="inline" cite={url}>
          <p class="inline">“{text}”</p>
        </blockquote>
        {#if !!author}
          <div class={authorClass}>
            <p class="inline italic">– {author}</p>
          </div>
        {/if}
      </div>
    </a>
  {:else}
    <div
      class="head-2 bg-gradient-to-r from-imperial-red to-[#0000004D] bg-clip-text font-optiberling-agency text-transparent break-words">
      <blockquote class="inline">
        <p class="inline">“{text}”</p>
      </blockquote>
      {#if !!author}
        <div class={authorClass}>
          <p class="inline italic">– {author}</p>
        </div>
      {/if}
    </div>
  {/if}
</section>

