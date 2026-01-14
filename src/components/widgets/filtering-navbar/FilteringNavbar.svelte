<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Hamburger from '@/components/common/Hamburger.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Tag } from '@/lib/types/common.types';
  import uiStore from '@/store/ui';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { fade, scale, slide } from 'svelte/transition';
  import SortingDropdown from '../sorting-dropdown/SortingDropdown.svelte';

  export let logoLight: SanityAsset;
  export let logoDark: SanityAsset;
  export let tags: Tag[];

  let sectionEl: HTMLElement;
  let contentWrapperEl: HTMLElement;
  let showLogo = false;
  let positionFromTop = 0;
  let scrollY = 0;

  $: activeSearchParams = $page.url.searchParams.get('search');
  $: activeSortParams = $page.url.searchParams.get('sort');
  $: activeArtistParams = $page.url.searchParams.get('artist');
  const setLogoVisibility = () => {
    showLogo = sectionEl.getBoundingClientRect().top <= 10;
    setPositionFromTop();
  };

  onMount(() => {
    setPositionFromTop();
  });

  const setPositionFromTop = () => {
    positionFromTop = sectionEl.getBoundingClientRect().top;
  };

  const setSearchParams = (searchQuery: string) => {
    const searchParams = new URLSearchParams($page.url.searchParams.toString());
    searchParams.set('search', searchQuery);

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

  $: if (sectionEl) {
    if ($uiStore.mobileNavDropdownOpen) {
      gsap.killTweensOf(sectionEl);
      gsap.killTweensOf(contentWrapperEl);
      gsap.to(sectionEl, {
        backgroundColor: 'transparent',
        duration: 0,
      });
      gsap.to(contentWrapperEl, {
        borderBottomColor: 'transparent',
        borderBottomWidth: '0px',
        duration: 0,
      });
    } else {
      gsap.killTweensOf(sectionEl);
      gsap.killTweensOf(contentWrapperEl);
      gsap.to(sectionEl, {
        backgroundColor: 'white',
        duration: 0.3,
      });
      gsap.to(contentWrapperEl, {
        borderBottomColor: 'rgba(160, 160, 160, 0.5)',
        borderBottomWidth: '1px',
        duration: 0.3,
      });
    }
  }
</script>

<svelte:window bind:scrollY on:scroll={setLogoVisibility} />
<nav
  id="filtering-navbar"
  bind:this={sectionEl}
  class={cn('sticky top-0 z-[1003] mt-[100dvh] overflow-visible bg-white')}>
  <div class="relative">
    <div
      bind:this={contentWrapperEl}
      class="container-primary flex items-center h-[110px]">
      <div class="flex flex-1 items-center">
        {#if (!!activeSearchParams || !!activeSortParams || !!activeArtistParams) && !$uiStore.mobileNavDropdownOpen}
          <button
            aria-label="Scroll to previous slide"
            transition:slide={{ axis: 'x' }}
            on:click={clearSearchParams}
            title="Clear Search Filter"
            class="mr-[0.8rem] lg:mr-[2rem]">
            <ChevronLeftRounded
              class="h-[2rem] w-[2rem] md:h-[2.813rem] md:w-[2.813rem]" />
          </button>
        {/if}
        <div class="flex w-full items-center justify-center">
          <div class="flex-1">
            {#if $uiStore.mobileNavDropdownOpen}
              <a in:scale href="/">
                <SanityImage
                  class="h-[3.125rem] w-fit object-contain"
                  src={logoLight}
                  sizes="100px"
                  imageUrlBuilder={imageBuilder}
                  alt="Artcon Logo" />
              </a>
            {:else}
              <div class="flex h-full items-end gap-x-5">
                <div class="flex-1">
                  <h2
                    in:fade={{ delay: 500 }}
                    class="head-6 font-medium text-dark-gunmetal lg:text-head-4">
                    <slot name="name" />
                  </h2>
                  <ul
                    in:fade={{ delay: 500 }}
                    class=" flex flex-wrap gap-y-1 pt-[0.425rem]">
                    {#each tags as { name, slug: { current } }, index}
                      <li class="flex">
                        <button
                          class={cn(
                            'font-inter text-[0.7rem] font-light leading-[120%] tracking-[0.0175rem] transition-colors duration-200 hover:text-pigment-red sm:text-xs lg:text-[0.875rem]',
                            {
                              '!font-bold':
                                current === activeSearchParams,
                            },
                          )}
                          on:click|preventDefault={() =>
                            setSearchParams(current)}>
                          {name}
                        </button>
                        {#if index !== tags.length - 1}
                          <div class="flex h-full items-center justify-center">
                            <div
                              class="mx-[0.375rem] -mt-[10%] rounded-full text-pigment-red lg:mx-[0.656rem]">
                              •
                            </div>
                          </div>
                        {/if}
                      </li>
                    {/each}
                  </ul>
                </div>

                <slot name="sorting-dropdown" {SortingDropdown} />
              </div>
            {/if}
          </div>

          <Hamburger
            color={$uiStore.mobileNavDropdownOpen ? 'white' : '#1B1B1E'}
            scrollToTopPosition={scrollY + positionFromTop}
            class="block lg:hidden" />
        </div>
      </div>
    </div>
    {#if showLogo}
      <div
        transition:fade
        class="absolute left-[40px] top-1/2 z-[60] hidden -translate-y-1/2 lg:block">
        <a href="/">
          <SanityImage
            class="h-[50px] w-fit object-contain"
            src={logoDark}
            sizes="100px"
            imageUrlBuilder={imageBuilder}
            alt="Artcon Logo" />
        </a>
      </div>
    {/if}
  </div>
</nav>
