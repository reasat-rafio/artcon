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

  export let logo: SanityAsset;

  let searchInputEl: HTMLInputElement;

  const callSearchApi = async (q: string) => {
    try {
      const res = await fetch(`/api/search?${q}`);
      const { data }: SearchResult = await res.json();
      searchStore.setData(data);
    } catch (error) {
      console.log(error);
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

    searchInputEl.focus();
    searchInputEl?.click();
  });
</script>

<nav class="sticky top-0 z-[1001] overflow-hidden bg-white">
  <div class="relative">
    <div class="absolute left-[40px] top-1/2 hidden -translate-y-1/2 lg:block">
      <a href="/">
        <SanityImage
          class="h-[50px] object-contain"
          src={logo}
          sizes="100px"
          imageUrlBuilder={imageBuilder}
          alt="Artcon Logo" />
      </a>
    </div>

    <div class="container-primary flex items-center pb-[1.37rem] pt-[2.25rem]">
      <div class="flex flex-col space-y-[1.25rem]">
        <h1 class="body-regular !font-normal">
          Searched result for <strong>
            {$page.url.searchParams.get('q') ?? ''}
          </strong>
        </h1>
        <button
          class="hidden cursor-pointer space-x-5 rounded-[64px] border border-[#A5A5A8] bg-white px-[28px] py-[11px] transition-colors duration-500 group-hover:bg-white lg:flex">
          <input
            bind:this={searchInputEl}
            on:keydown={(e) => {
              if (e.keyCode === 13) searchAction(searchInputEl.value);
            }}
            class="w-[23.9375rem] bg-transparent text-[13.5px] outline-none transition-all duration-500 ease-in-out placeholder:text-[13.5px] placeholder:text-[#A5A5A8] group-hover:placeholder:text-dark-gunmetal"
            type="text"
            placeholder={'Search'} />
          <button
            on:click={() => searchAction(searchInputEl.value)}
            class="scale-100 text-[#A5A5A8] transition-transform duration-500 hover:scale-125">
            <SearchIcon />
          </button>
        </button>
      </div>
    </div>
  </div>
</nav>
