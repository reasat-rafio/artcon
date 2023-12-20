<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import SearchIcon from '@/components/icons/Search.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SearchResult } from '@/lib/types/search.types';
  import searchStore from '@/store/search';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

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

<nav class="sticky top-[5rem] z-[1001] overflow-hidden bg-white lg:top-0">
  <div class="relative">
    <div
      class="absolute left-[2.5rem] top-1/2 hidden -translate-y-1/2 lg:block">
      <a href="/">
        <SanityImage
          class="h-[3.125rem] object-contain"
          src={logo}
          sizes="100px"
          imageUrlBuilder={imageBuilder}
          alt="Artcon Logo" />
      </a>
    </div>

    <div
      class="container-primary flex items-center pb-[0.75rem] pt-[2rem] lg:pb-[1.37rem] lg:pt-[2.25rem]">
      <div class="flex w-full flex-col space-y-[0.75rem] lg:space-y-[1.25rem]">
        <h1
          class="lg:body-regular max-lg:body-light-m font-light lg:font-normal">
          Searched result for <strong>
            {$page.url.searchParams.get('q') ?? ''}
          </strong>
        </h1>
        <button
          class="border-quick-silver flex w-full cursor-pointer space-x-2 rounded-[64px] border bg-white pb-[0.75rem] pl-[1.75rem] pr-[1.5rem] pt-[0.69rem] transition-colors duration-500 group-hover:bg-white sm:w-[26rem] lg:space-x-5">
          <input
            bind:this={searchInputEl}
            disabled={$searchStore.loading}
            on:keydown={(e) => {
              if (e.key === 'Enter') searchAction(searchInputEl.value);
            }}
            class="placeholder:text-quick-silver flex-1 bg-transparent text-[13.5px] outline-none transition-all duration-500 ease-in-out placeholder:text-[13.5px] group-hover:placeholder:text-dark-gunmetal"
            type="text"
            placeholder={'Search'} />
          <button
            disabled={$searchStore.loading}
            on:click={() => searchAction(searchInputEl.value)}
            class="text-quick-silver scale-100 transition-transform duration-500 hover:scale-125">
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
