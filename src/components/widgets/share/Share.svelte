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
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  export let logoLight: SanityAsset;
  export let logoDark: SanityAsset;
  export let href: string;

  let sectionEl: HTMLElement;
  let contentWrapperEl: HTMLElement;
  let showLogo = false;
  let positionFromTop = 0;
  let scrollY = 0;

  const setPositionFromTop = () => {
    positionFromTop = sectionEl.getBoundingClientRect().top;
  };

  onMount(() => {
    setPositionFromTop();
  });

  const setLogoVisibility = () => {
    showLogo = sectionEl.getBoundingClientRect().top <= 10;
    setPositionFromTop();
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

<svelte:window
  bind:scrollY
  on:scroll={setLogoVisibility}
  on:resize={setPositionFromTop} />
<nav
  bind:this={sectionEl}
  class="sticky left-0 top-0 z-[1003] mt-[100dvh] overflow-hidden transition-all duration-300">
  <div class="relative">
    <div
      bind:this={contentWrapperEl}
      class="container-primary flex items-center max-lg:py-[1.1rem] lg:pb-[1.44rem] lg:pt-[1.37rem]">
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
            in:fade={{ delay: 500 }}
            class="flex h-[2rem] w-[2rem] items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors duration-300 hover:border-dark-gunmetal hover:text-dark-gunmetal md:h-[2.813rem] md:w-[2.813rem]"
            {href}>
            <ChevronLeftRounded />
          </a>
          <h2
            in:fade={{ delay: 500 }}
            class="lg:head-4 head-6 font-medium text-dark-gunmetal">
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
    {#if showLogo}
      <div
        transition:fade
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
    {/if}
  </div>
</nav>
