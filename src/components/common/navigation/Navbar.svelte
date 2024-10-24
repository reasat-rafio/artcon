<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import clickOutSide from '@/lib/actions/clickOutSide';
  import { cn } from '@/lib/cn';
  import { darkNavPaths } from '@/lib/constant';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import searchStore from '@/store/search';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import SearchIcon from '../../icons/Search.svelte';
  import Hamburger from '../Hamburger.svelte';
  import uiStore from '@/store/ui';
  import { fade } from 'svelte/transition';

  export let logo: SanityAsset;

  let searchInputEl: HTMLInputElement;
  let searchIsActive = false;
  const setSearchBarActive = () => {
    searchIsActive = true;
    searchInputEl.focus();
  };

  $: isDarkNavPaths = darkNavPaths.includes($page.url.pathname);
  $: hamburgerColor = isDarkNavPaths
    ? $uiStore.mobileNavDropdownOpen
      ? 'white'
      : 'black'
    : 'white';
  $: placeholder = searchIsActive
    ? 'Search artist, art work, news etc '
    : 'Search';

  const redirectToSearchPage = (value: string) => {
    const searchParams = new URLSearchParams({ q: value });
    goto('/search?' + searchParams.toString());
  };
</script>

<nav class={cn('absolute left-0 top-0 z-[1005] w-full', $$props.class)}>
  <div
    class={cn(
      'flex w-full items-center px-[1.25rem] lg:pl-[2.5rem] lg:pr-[2.37rem]',
    )}>
    {#key logo?.asset?._id}
      <a class="pt-[1.25rem] lg:pt-[2.5rem]" href="/">
        <SanityImage
          class="h-[50px] w-fit object-contain"
          src={logo}
          sizes="100px"
          imageUrlBuilder={imageBuilder}
          alt="Artcon Logo" />
      </a>
    {/key}

    <div
      class={cn(
        'group ml-auto pt-[1.25rem] transition-transform  duration-300 will-change-transform lg:pt-[1.9rem]',
        {
          'text-dark-gunmetal': isDarkNavPaths,
          'text-white': !isDarkNavPaths && !searchIsActive,
          'lg:-translate-x-[3.5rem]': $page.url.pathname === '/',
        },
      )}>
      <Hamburger color={hamburgerColor} class="block lg:hidden" />
      {#if !$page.url.pathname.includes('search')}
        <button
          transition:fade
          on:click={setSearchBarActive}
          on:keydown={setSearchBarActive}
          use:clickOutSide={() => (searchIsActive = false)}
          class={cn(
            'hidden cursor-pointer items-center space-x-[1.2rem] rounded-2xl border py-[0.8rem] pl-[1.85rem] pr-[1.6rem] transition-colors duration-500 group-hover:bg-white lg:flex',
            {
              'border-dark-gunmetal': isDarkNavPaths,
              'border-white': !isDarkNavPaths,
              'bg-white': searchIsActive,
            },
          )}>
          <div class="relative flex flex-1 items-center justify-center">
            <input
              type="search"
              bind:this={searchInputEl}
              {placeholder}
              disabled={$searchStore.loading}
              on:keydown={(e) => {
                if (e.key === 'Enter')
                  redirectToSearchPage(searchInputEl.value);
              }}
              aria-label="Search"
              class={cn(
                'bg-transparent text-[0.84375rem] !font-normal tracking-[0.01688rem] outline-none transition-all duration-500 ease-in-out placeholder:text-[0.84375rem] placeholder:!font-normal',
                {
                  'w-[250px]': searchIsActive,
                  'w-[60px]': !searchIsActive,
                  'placeholder:text-dark-gunmetal': isDarkNavPaths,
                  'placeholder:text-white group-hover:placeholder:text-[#000]/40':
                    !isDarkNavPaths,
                  'text-dark-gunmetal placeholder:text-[#000]/40':
                    !isDarkNavPaths && searchIsActive,
                },
              )} />
            <div class="absolute inset-0 -m-3 cursor-text" aria-hidden="true" />
          </div>

          <div class="relative flex items-center">
            <button
              type="submit"
              aria-label="Submit search"
              disabled={$searchStore.loading}
              on:click|stopPropagation={() =>
                redirectToSearchPage(searchInputEl.value)}
              class="focus:ring-primary scale-100 transition-transform duration-500 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 group-hover:text-dark-gunmetal">
              <SearchIcon />
            </button>
            <div
              class="absolute inset-0 -m-3 cursor-pointer"
              aria-hidden="true" />
          </div>
        </button>
      {/if}
    </div>
  </div>
</nav>
