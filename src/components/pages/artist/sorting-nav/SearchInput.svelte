<script lang="ts">
  import { cn } from '@/lib/cn';
  import SearchIcon from '@/components/icons/Search.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let searchEl: HTMLInputElement;

  const setSearchParams = (
    event: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    },
  ) => {
    const searchParams = new URLSearchParams($page.url.searchParams.toString());
    searchParams.set('name', event.currentTarget.value);

    goto($page.url.pathname + '?' + searchParams.toString(), {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

<button
  class={cn(
    'my-auto flex h-fit w-full cursor-pointer items-center justify-center space-x-5 rounded-[4rem] border border-[#A5A5A8] py-[0.6875rem] pl-[1.75rem] pr-[1.5rem] transition-colors duration-500 group-hover:bg-white max-2xl:max-w-[23.9375rem] 2xl:w-[23.9375rem]',
    $$props.class,
  )}>
  <input
    bind:this={searchEl}
    on:change={setSearchParams}
    class={cn(
      'w-full bg-transparent text-[0.84375rem] text-[#A5A5A8] outline-none transition-all duration-500 ease-in-out placeholder:text-[0.84375rem] placeholder:text-[rgba(0,0,0,0.25)]',
    )}
    type="text"
    placeholder="Search artist" />
  <button class="scale-100 transition-transform duration-500 hover:scale-125">
    <SearchIcon class="text-[#A5A5A8]" />
  </button>
</button>
