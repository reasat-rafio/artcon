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

  export let logo: SanityAsset;

  let searchInputEl: HTMLInputElement;
  let searchIsActive = false;
  const setSearchBarActive = () => (searchIsActive = true);

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
    const searchParams = new URLSearchParams({
      q: value,
    });
    goto('/search?' + searchParams.toString());
  };
</script>

<nav class={cn('absolute left-0 top-0 z-[1005] w-full', $$props.class)}>
  <div
    class="flex w-full items-center px-[1.25rem] lg:pl-[2.5rem] lg:pr-[5.87rem]">
    {#key logo?.asset?._id}
      <a class="pt-[1.25rem] lg:pt-[2.5rem]" href="/">
        <SanityImage
          class="h-[50px] object-contain"
          src={logo}
          sizes="100px"
          imageUrlBuilder={imageBuilder}
          alt="Artcon Logo" />
      </a>
    {/key}

    <div
      class={cn('group ml-auto pt-[1.25rem] lg:pt-[1.9rem]', {
        'text-dark-gunmetal': isDarkNavPaths,
        'text-white': !isDarkNavPaths && !searchIsActive,
      })}>
      <Hamburger color={hamburgerColor} class="block lg:hidden" />
      <div
        use:clickOutSide={() => (searchIsActive = false)}
        on:click={setSearchBarActive}
        on:keydown={setSearchBarActive}
        role="button"
        tabindex="0"
        class={cn(
          'hidden cursor-pointer space-x-[1.2rem] rounded-2xl border py-[0.6rem] pl-[1.65rem] pr-[1.4rem] transition-colors duration-500 group-hover:bg-white lg:flex',
          {
            'border-dark-gunmetal': isDarkNavPaths,
            'border-white': !isDarkNavPaths,
            'bg-white': searchIsActive,
          },
        )}>
        <input
          type="text"
          bind:this={searchInputEl}
          {placeholder}
          disabled={$searchStore.loading}
          on:keydown={(e) => {
            if (e.key === 'Enter') redirectToSearchPage(searchInputEl.value);
          }}
          class={cn(
            'bg-transparent text-[0.84375rem] font-medium tracking-[0.01688rem] outline-none transition-all duration-500 ease-in-out placeholder:text-[0.84375rem] placeholder:font-medium',
            {
              'w-[250px]': searchIsActive,
              'w-[47px] ': !searchIsActive,
              'placeholder:text-dark-gunmetal': isDarkNavPaths,
              'placeholder:text-white group-hover:placeholder:text-dark-gunmetal':
                !isDarkNavPaths,
              'text-dark-gunmetal placeholder:text-dark-gunmetal':
                !isDarkNavPaths && searchIsActive,
            },
          )} />
        <button
          disabled={$searchStore.loading}
          on:click={() => redirectToSearchPage(searchInputEl.value)}
          class="scale-100 transition-transform duration-500 hover:scale-125 group-hover:text-dark-gunmetal">
          <SearchIcon />
        </button>
      </div>
    </div>
  </div>
</nav>
