<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import clickOutSide from '@/lib/actions/clickOutSide';
  import { cn } from '@/lib/cn';
  import { darkNavPaths } from '@/lib/constant';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import SearchIcon from '../../icons/Search.svelte';
  import Hamburger from '../Hamburger.svelte';

  export let logo: SanityAsset;

  let searchInputEl: HTMLInputElement;
  let searchIsActive = false;
  const setSearchBarActive = () => (searchIsActive = true);

  $: logo = logo;
  $: isDarkNavPaths = darkNavPaths.includes($page.url.pathname);

  const redirectToSearchPage = (value: string) => {
    const searchParams = new URLSearchParams({
      q: value,
    });
    goto('search?' + searchParams.toString());
  };
</script>

<nav class={cn('absolute left-0 top-0 z-[1002] w-full', $$props.class)}>
  <div
    class="flex w-full items-center px-[1.25rem] pt-[1.25rem] lg:pl-[2.5rem] lg:pr-[5.87rem] lg:pt-[2.5rem]">
    <a class="" href="/">
      <SanityImage
        class="h-[50px] object-contain"
        src={logo}
        sizes="100px"
        imageUrlBuilder={imageBuilder}
        alt="Artcon Logo" />
    </a>

    <div
      class={cn(
        'group ml-auto',
        isDarkNavPaths
          ? 'text-dark-gunmetal'
          : searchIsActive
          ? 'text-dark-gunmetal'
          : 'text-white',
      )}>
      <Hamburger
        color={isDarkNavPaths ? 'black' : 'white'}
        class="block lg:hidden" />
      <button
        use:clickOutSide={() => (searchIsActive = false)}
        on:click={setSearchBarActive}
        class:bg-white={searchIsActive}
        class={cn(
          'hidden cursor-pointer space-x-5 rounded-[64px] border px-[28px] py-[11px] transition-colors duration-500 group-hover:bg-white lg:flex',
          isDarkNavPaths ? 'border-dark-gunmetal' : 'border-white',
        )}>
        <input
          bind:this={searchInputEl}
          on:keydown={(e) => {
            if (e.keyCode === 13) redirectToSearchPage(searchInputEl.value);
          }}
          class={cn(
            'bg-transparent text-[13.5px] outline-none transition-all duration-500 ease-in-out placeholder:text-[13.5px] ',
            isDarkNavPaths
              ? 'placeholder:text-dark-gunmetal'
              : 'placeholder:text-white group-hover:placeholder:text-dark-gunmetal',
            searchIsActive ? 'w-[250px]' : 'w-[70px]',
            isDarkNavPaths
              ? searchIsActive && ''
              : searchIsActive &&
                  'text-dark-gunmetal placeholder:text-dark-gunmetal',
          )}
          type="text"
          placeholder={searchIsActive
            ? 'Search artist, art work, news etc '
            : 'Search'} />
        <button
          on:click={() => redirectToSearchPage(searchInputEl.value)}
          class="scale-100 transition-transform duration-500 hover:scale-125 group-hover:text-dark-gunmetal">
          <SearchIcon />
        </button>
      </button>
    </div>
  </div>
</nav>
