<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import SearchIcon from './SearchIcon.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SearchResult } from '@/lib/types/search.types';
  import searchStore from '@/store/search';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let logo: SanityAsset;

  let searchInputEl: HTMLInputElement;

  const callSearchApi = async (q: string) => {
    try {
      searchStore.setLoading(true);
      const res = await fetch(`/api/search?${q}`);
      const { data }: SearchResult = await res.json();
      searchStore.setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      searchStore.setLoading(false);
    }
  };

  async function searchAction(value: string) {
    const searchParams = new URLSearchParams({
      q: value,
    });

    goto($page.url.pathname + '?' + searchParams.toString(), {
      replaceState: true,
      noScroll: true,
    });

    await callSearchApi(searchParams.toString());
  }

  $: if ($searchStore.data) {
    searchInputEl?.focus();
    searchInputEl?.click();
  }

  onMount(() => {
    if ($page.url.searchParams.get('q')) {
      searchInputEl.value = $page.url.searchParams.get('q') as string;
    }

    searchInputEl?.focus();
    searchInputEl?.click();
  });
</script>

<nav
  class="sticky top-0 z-[1001] overflow-hidden bg-white pb-[0.5rem] pt-[1.25rem] lg:pb-[1.25rem] lg:pt-[2.55rem]">
  <div class="relative">
    <div class="absolute left-[2.5rem] top-0 hidden lg:block">
      <a href="/">
        <SanityImage
          class="h-[3.125rem] object-contain"
          src={logo}
          sizes="100px"
          imageUrlBuilder={imageBuilder}
          alt="Artcon Logo" />
      </a>
    </div>

    <div class="container-primary flex items-center">
      <div class="flex w-full flex-col gap-y-[0.75rem] lg:gap-y-[1.25rem]">
        <h1
          class="lg:body-regular max-lg:body-light-m !font-inter font-light lg:font-normal">
          Searched result for <strong>
            {$page.url.searchParams.get('q') ?? ''}
          </strong>
        </h1>

        <button
          class="flex cursor-pointer gap-x-2 rounded-2xl border border-quick-silver bg-white py-[0.5rem] pl-[1.75rem] pr-[1.5rem] transition-colors duration-500 group-hover:bg-white sm:w-[23.9375rem]">
          <input
            bind:this={searchInputEl}
            disabled={$searchStore.loading}
            on:keydown={(e) => {
              if (e.key === 'Enter') searchAction(searchInputEl.value);
            }}
            class="flex-1 bg-transparent pt-[2px] text-[0.84375rem] font-medium tracking-[0.01688rem] text-[#00000080] outline-none placeholder:text-[0.84375rem] placeholder:font-medium placeholder:tracking-[0.01688rem] placeholder:text-[#00000040]"
            type="text"
            placeholder="grass" />
          <button
            disabled={$searchStore.loading}
            on:click={() => searchAction(searchInputEl.value)}
            class="scale-100 text-quick-silver transition-transform duration-500 hover:scale-125">
            {#if $searchStore.loading}
              <div
                in:fade
                class="h-[1.438rem] w-[1.438rem] animate-spin rounded-full border-t-2 border-solid border-red-500">
              </div>
            {:else}
              <SearchIcon />
            {/if}
          </button>
        </button>
      </div>
    </div>
  </div>
</nav>
