<script lang="ts">
  import Hamburger from '@/components/common/Hamburger.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ShareIcon from '@/components/icons/ShareIcon.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import sharePopupStore from '@/store/share-popup';
  import uiStore from '@/store/ui';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { gsap } from 'gsap';
  import { scale } from 'svelte/transition';

  export let logoLight: SanityAsset;
  export let logoDark: SanityAsset;
  export let href: string;

  let sectionEl: HTMLElement;
  let contentWrapperEl: HTMLElement;
  const showLogo = true;
  let positionFromTop = 0;
  let scrollY = 0;


</script>

<svelte:window bind:scrollY />
<nav
  bind:this={sectionEl}
  class="sticky left-0 top-0 z-[1003] mt-[100dvh] overflow-hidden bg-white shadow-md">  
  <div class="relative">
    <div
      bind:this={contentWrapperEl}
      style="border-bottom: 1px solid rgba(160, 160, 160, 0.5);"
      class="container-primary flex items-center max-lg:py-[1.1rem] lg:pb-[1.44rem] lg:pt-[1.37rem] bg-white">
      <div class="flex flex-1 items-center space-x-[1.25rem] lg:space-x-[2rem]">
        {#if $uiStore.mobileNavDropdownOpen}
          <a transition:scale href="/">
            <SanityImage
              class="h-[50px] w-fit  object-contain"
              src={logoLight}
              sizes="100px"
              imageUrlBuilder={imageBuilder}
              alt="Artcon Logo" />
          </a>
        {:else}
          <a
            aria-label="Redirect to previous page"
            class="flex h-[2rem] w-[2rem] items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors duration-300 hover:border-dark-gunmetal hover:text-dark-gunmetal md:h-[2.813rem] md:w-[2.813rem]"
            {href}>
            <ChevronLeftRounded />
          </a>
          <h2
            class="lg:head-4 head-6 font-medium text-sonic-silver">
            <slot />
          </h2>
        {/if}
      </div>

      <Hamburger
        color={$uiStore.mobileNavDropdownOpen ? 'white' : '#1B1B1E'}
        scrollToTopPosition={scrollY + positionFromTop}
        class="block lg:hidden" />
      <button
        aria-label="Share to social media"
        on:click={() => sharePopupStore.setVisibility(true)}
        class="group hidden aspect-square h-[1.875rem] w-[1.875rem] rounded-full lg:block lg:h-[2.8125rem] lg:w-[2.8125rem]">
        <ShareIcon
          class="ml-auto text-quick-silver transition-colors duration-300 group-hover:text-dark-gunmetal" />
      </button>
    </div>
    <div
      class="absolute left-[40px] top-1/2 hidden -translate-y-1/2 lg:block">
      <a href="/">
        <SanityImage
          class="h-[50px] w-fit object-contain"
          src={logoDark}
          sizes="100px"
          imageUrlBuilder={imageBuilder}
          alt="Artcon Logo" />
      </a>
    </div>
  </div>
</nav>
