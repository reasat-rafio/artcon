<script lang="ts">
  import type { Tag } from '@/lib/types/common.types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { cn } from '@/lib/cn';

  export let tags: Tag[];
  export let activeSearchParams: string | null;

  const setSearchParams = (searchQuery: string) => {
    const searchParams = new URLSearchParams($page.url.searchParams.toString());
    searchParams.set('tag', searchQuery);
    goto($page.url.pathname + '?' + searchParams.toString(), {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

<ul class="hidden pt-[0.425rem] sm:flex">
  {#each tags as { name, slug: { current } }, index}
    <li class="flex">
      <button
        class={cn(
          'font-inter text-[0.875rem] font-light leading-[120%] tracking-[0.0175rem] transition-colors duration-200 hover:text-[#ED1C24]',
          { 'text-[#ED1C24]': current === activeSearchParams },
        )}
        on:click|preventDefault={() => setSearchParams(current)}>
        {name}
      </button>
      {#if index !== tags.length - 1}
        <div class="flex h-full items-center justify-center">
          <div
            class="mx-[10.5px] -mt-[10%] h-1 w-1 rounded-full bg-[#ED1C24]" />
        </div>
      {/if}
    </li>
  {/each}
</ul>
