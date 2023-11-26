<script lang="ts">
  import SearchIcon from '@/components/icons/Search.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let logo: SanityAsset;
</script>

<nav class="sticky top-0 z-50 overflow-hidden bg-white">
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
        <h1 class="body-regular !font-normal">Searched result for</h1>
        <button
          class="hidden cursor-pointer space-x-5 rounded-[64px] border border-[#A5A5A8] bg-white px-[28px] py-[11px] transition-colors duration-500 group-hover:bg-white lg:flex">
          <input
            class="w-[23.9375rem] bg-transparent text-[13.5px] outline-none transition-all duration-500 ease-in-out placeholder:text-[13.5px] placeholder:text-[#A5A5A8] group-hover:placeholder:text-dark-gunmetal"
            type="text"
            placeholder={'Search'} />
          <div
            class="scale-100 text-[#A5A5A8] transition-transform duration-500 hover:scale-125">
            <SearchIcon />
          </div>
        </button>
      </div>
    </div>
  </div>
</nav>
