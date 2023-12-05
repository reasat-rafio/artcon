<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Tag } from '@/lib/types/common.types';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { fade, slide } from 'svelte/transition';
  import SearchInput from './SearchInput.svelte';
  import SortInput from './SortInput.svelte';
  import Tags from './Tags.svelte';

  export let logo: SanityAsset;
  export let tags: Tag[];
  export let searchEl: HTMLInputElement;

  let sectionEl: HTMLElement;
  let showLogo = false;

  $: activeSearchParams =
    $page.url.searchParams.get('tag') || $page.url.searchParams.get('name');
  const setLogoVisibility = () =>
    (showLogo = sectionEl.getBoundingClientRect().top <= 10);

  const clearSearchParams = () => {
    goto($page.url.pathname, {
      replaceState: true,
      noScroll: true,
    });
    searchEl.value = '';
  };
</script>

<svelte:window on:scroll={setLogoVisibility} />
<nav
  bind:this={sectionEl}
  class="top-0 z-50 overflow-hidden bg-white xl:sticky">
  <div class="relative">
    <div
      class="container-primary flex border-b-[0.5px] border-b-[#a0a0a0] pb-[1.19rem] pt-[1.69rem] lg:pb-[1.25rem] lg:pt-[1.5rem]">
      <div class="flex items-center pr-3">
        {#if !!activeSearchParams}
          <button
            transition:slide={{ axis: 'x' }}
            on:click={clearSearchParams}
            title="Clear Search Filter"
            class="mr-[1.25rem] h-[45px] w-[45px] lg:mr-[2rem]">
            <ChevronLeftRounded />
          </button>
        {/if}
        {#key activeSearchParams}
          <div>
            <h2 class="head-6 font-medium text-dark-gunmetal lg:text-head-4">
              <slot />
            </h2>
            <Tags {activeSearchParams} {tags} />
          </div>
        {/key}
      </div>

      <div class="ml-auto hidden gap-x-[1.375rem] xl:flex">
        <SortInput />
        <SearchInput bind:searchEl />
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
