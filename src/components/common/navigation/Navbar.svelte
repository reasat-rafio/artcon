<script lang="ts">
  import clickOutSide from '@/lib/actions/clickOutSide';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import SearchIcon from '../../icons/Search.svelte';
  import { twMerge } from 'tailwind-merge';
  import Hamburger from '../Hamburger.svelte';
  import { darkNavPaths } from '@/lib/constant';
  import { page } from '$app/stores';
  import { cn } from '@/lib/cn';

  export let logo: SanityAsset;

  let searchIsActive = false;
  const setSearchBarActive = () => (searchIsActive = true);

  $: logo = logo;
  $: isDarkNavPaths = darkNavPaths.includes($page.url.pathname);
</script>

<nav class="absolute left-0 top-0 z-[1001] w-full">
  <div class="mt-[40px] flex w-full items-center pl-[2.5rem] pr-[5.87rem]">
    <a class="" href="/">
      <SanityImage
        class="h-[50px] object-contain"
        src={logo}
        sizes="100px"
        imageUrlBuilder={imageBuilder}
        alt="Artcon Logo" />
    </a>

    <div
      class={twMerge(
        'group ml-auto',
        isDarkNavPaths
          ? 'text-dark-gunmetal'
          : searchIsActive
          ? 'text-dark-gunmetal'
          : 'text-white',
      )}>
      <Hamburger class="block lg:hidden" />
      <button
        use:clickOutSide={() => (searchIsActive = false)}
        on:click={setSearchBarActive}
        class:bg-white={searchIsActive}
        class={cn(
          'hidden cursor-pointer space-x-5 rounded-[64px] border px-[28px] py-[11px] transition-colors duration-500 group-hover:bg-white lg:flex',
          isDarkNavPaths ? 'border-dark-gunmetal' : 'border-white',
        )}>
        <input
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
        <div
          class="scale-100 transition-transform duration-500 hover:scale-125 group-hover:text-dark-gunmetal">
          <SearchIcon />
        </div>
      </button>
    </div>
  </div>
</nav>
