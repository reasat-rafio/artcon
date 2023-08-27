<script lang="ts">
  import clickOutSide from '@/lib/actions/clickOutSide';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import SearchIcon from '../icons/Search.svelte';

  export let logo: SanityAsset;

  let sarchIsActive = false;
  const setSearchBarActive = () => (sarchIsActive = true);
</script>

<nav class="absolute left-0 top-0 z-40 w-full">
  <div class="mt-[40px] flex w-full items-center px-[40px]">
    <a class="" href="/">
      <SanityImage
        class="h-[50px] object-contain"
        src={logo}
        sizes="100px"
        imageUrlBuilder={imageBuilder}
      />
    </a>

    <div class="ml-auto text-white">
      <button
        use:clickOutSide={() => (sarchIsActive = false)}
        on:click={setSearchBarActive}
        class="flex cursor-pointer space-x-5 rounded-[64px] border px-[28px] py-[11px]"
      >
        <input
          class="{sarchIsActive
            ? 'w-[200px]'
            : 'w-[70px]'} bg-transparent text-[13.5px] outline-none transition-all duration-300 ease-in-out placeholder:text-[13.5px] placeholder:text-white"
          type="text"
          placeholder="Search"
        />
        <button
          class="scale-100 transition-transform duration-300 hover:scale-125"
        >
          <SearchIcon />
        </button>
      </button>
    </div>
  </div>
</nav>
