<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { fade } from 'svelte/transition';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Tag } from '@/lib/types/common.types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { twMerge } from 'tailwind-merge';

  export let logo: SanityAsset;
  export let href: string;
  export let tags: Tag[];

  let sectionEl: HTMLElement;
  let showLogo = false;

  $: aciteveSearchParms = $page.url.searchParams.get('search');
  const setLogoVisibility = () =>
    (showLogo = sectionEl.getBoundingClientRect().top <= 10);

  const setSearhParams = (searchQuery: string) => {
    const searchParams = new URLSearchParams({
      search: searchQuery,
    });
    goto($page.url.pathname + '?' + searchParams.toString(), {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

<svelte:window on:scroll={setLogoVisibility} />
<nav
  bind:this={sectionEl}
  class="sticky top-0 z-50 overflow-hidden border-b border-[#A5A5A8] bg-white pb-[1.19rem] pt-[1.69rem] lg:pb-[1.69rem] lg:pt-[1.63rem]"
>
  <div class="relative">
    <div class="container flex items-center">
      <div class="flex flex-1 items-center space-x-[1.25rem] lg:space-x-[2rem]">
        <a class="h-[45px] w-[45px]" {href}>
          <ChevronLeftRounded />
        </a>
        <div>
          <h2 class="text-head-6 font-medium text-dark-gunmetal lg:text-head-4">
            <slot />
          </h2>

          <ul class=" hidden space-x-2 pt-[0.2rem] sm:flex">
            {#each tags as { name, slug: { current } }, index}
              <li class="flex items-center space-x-2">
                <button
                  class={twMerge(
                    'text-[0.875rem] font-light tracking-[0.0175rem] transition-colors duration-200 hover:text-[#ED1C24]',
                    current === aciteveSearchParms && 'text-[#ED1C24]',
                  )}
                  on:click|preventDefault={() => setSearhParams(current)}
                >
                  {name}
                </button>
                {#if index !== tags.length - 1}
                  <div class="h-1 w-1 rounded-full bg-[#ED1C24]" />
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    {#if showLogo}
      <div transition:fade class="absolute left-[40px] top-0 hidden 2xl:block">
        <a class="" href="/">
          <SanityImage
            class="h-[50px] object-contain"
            src={logo}
            sizes="100px"
            imageUrlBuilder={imageBuilder}
            alt="Artcon Logo"
          />
        </a>
      </div>
    {/if}
  </div>
</nav>
