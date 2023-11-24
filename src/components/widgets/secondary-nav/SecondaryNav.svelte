<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Tag } from '@/lib/types/common.types';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { fade, scale, slide } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  export let logo: SanityAsset;
  export let tags: Tag[];

  let sectionEl: HTMLElement;
  let showLogo = false;

  $: activeSearchParams = $page.url.searchParams.get('search');
  const setLogoVisibility = () =>
    (showLogo = sectionEl.getBoundingClientRect().top <= 10);

  const setSearchParams = (searchQuery: string) => {
    const searchParams = new URLSearchParams({
      search: searchQuery,
    });
    goto($page.url.pathname + '?' + searchParams.toString(), {
      replaceState: true,
      noScroll: true,
    });
  };

  const clearSearchParams = () => {
    goto($page.url.pathname, {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

<svelte:window on:scroll={setLogoVisibility} />
<nav bind:this={sectionEl} class="sticky top-0 z-50 overflow-hidden bg-white">
  <div class="relative">
    <div
      class="container-primary flex items-center border-b-[0.5px] border-b-[#a0a0a0] pb-[1.19rem] pt-[1.69rem] lg:pb-[1.25rem] lg:pt-[1.5rem]">
      <div class="flex flex-1 items-center">
        {#if !!activeSearchParams}
          <button
            title="Clear Search Filter"
            transition:slide={{ axis: 'x' }}
            on:click={clearSearchParams}
            class="mr-[1.25rem] h-[45px] w-[45px] lg:mr-[2rem]">
            <ChevronLeftRounded />
          </button>
        {/if}
        {#key activeSearchParams}
          <div>
            <h2 class="head-6 font-medium text-dark-gunmetal lg:text-head-4">
              <slot />
            </h2>

            <ul class="hidden pt-[0.425rem] sm:flex">
              {#each tags as { name, slug: { current } }, index}
                <li class="flex">
                  <button
                    class={twMerge(
                      'font-inter text-[0.875rem] font-light leading-[120%] tracking-[0.0175rem] transition-colors duration-200 hover:text-[#ED1C24]',
                      current === activeSearchParams && 'text-[#ED1C24]',
                    )}
                    on:click|preventDefault={() => setSearchParams(current)}>
                    {name}
                  </button>
                  {#if index !== tags.length - 1}
                    <div class="flex h-full items-center justify-center">
                      <div
                        class="mx-[10.5px] -mt-[10%] h-1 w-1 rounded-full bg-[#ED1C24]" />
                    </div>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/key}
      </div>
    </div>
    {#if showLogo}
      <div
        transition:fade
        class="absolute left-[40px] top-1/2 hidden -translate-y-1/2 2xl:block">
        <a class="" href="/">
          <SanityImage
            class="h-[50px] object-contain"
            src={logo}
            sizes="100px"
            imageUrlBuilder={imageBuilder}
            alt="Artcon Logo" />
        </a>
      </div>
    {/if}
  </div>
</nav>
