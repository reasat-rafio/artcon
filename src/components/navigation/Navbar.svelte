<script lang="ts">
  import clickOutSide from '@/lib/actions/clickOutSide';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import SearchIcon from '../icons/Search.svelte';
  import { twMerge } from 'tailwind-merge';
  import Hamburger from '../Hamburger.svelte';

  export let logo: SanityAsset;

  let sarchIsActive = false;
  const setSearchBarActive = () => (sarchIsActive = true);
</script>

<nav class="absolute left-0 top-0 z-40 w-full">
  <div class="mt-[40px] flex w-full items-center px-[2.5rem]">
    <a class="" href="/">
      <SanityImage
        class="h-[50px] object-contain"
        src={logo}
        sizes="100px"
        imageUrlBuilder={imageBuilder}
        alt="Artcon Logo"
      />
    </a>

    <div
      class={twMerge(
        'group ml-auto ',
        sarchIsActive ? 'text-dark-gunmetal' : 'text-white',
      )}
    >
      <Hamburger class="block md:hidden" />
      <button
        use:clickOutSide={() => (sarchIsActive = false)}
        on:click={setSearchBarActive}
        class={twMerge(
          'hidden cursor-pointer space-x-5 rounded-[64px] border px-[28px] py-[11px] transition-colors duration-500 group-hover:bg-white md:flex',
          sarchIsActive && ' bg-white',
        )}
      >
        <input
          class={twMerge(
            'bg-transparent text-[13.5px] outline-none transition-all duration-500 ease-in-out placeholder:text-[13.5px] placeholder:text-white group-hover:placeholder:text-dark-gunmetal',
            sarchIsActive
              ? 'w-[250px] text-dark-gunmetal placeholder:text-dark-gunmetal'
              : 'w-[70px]',
          )}
          type="text"
          placeholder={sarchIsActive
            ? 'Search artist, art work, news etc '
            : 'Search'}
        />
        <div
          class={twMerge(
            'scale-100 transition-transform duration-500 hover:scale-125 group-hover:text-dark-gunmetal',
          )}
        >
          <SearchIcon />
        </div>
      </button>
    </div>
  </div>
</nav>
