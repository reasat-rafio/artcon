<script lang="ts">
  import Hamburger from '@/components/common/Hamburger.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ShareIcon from '@/components/icons/ShareIcon.svelte';
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import uiStore from '@/store/ui';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { onMount } from 'svelte';
  import { fade, scale, slide } from 'svelte/transition';
  import SharePopup from './Popup.svelte';

  export let logoLight: SanityAsset;
  export let logoDark: SanityAsset;
  export let href: string;

  let sectionEl: HTMLElement;
  let popupSate: 'visible' | 'hidden' = 'hidden';
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
</script>

<svelte:window
  bind:scrollY
  on:scroll={setLogoVisibility}
  on:resize={setPositionFromTop} />
<nav
  bind:this={sectionEl}
  class={cn(
    'sticky top-0 z-[1003] overflow-hidden transition-all duration-300',
    {
      'bg-white': !$uiStore.mobileNavDropdownOpen,
      'bg-transparent': $uiStore.mobileNavDropdownOpen,
    },
  )}>
  <div class="relative">
    <div
      class={cn(
        'container-primary flex items-center pb-[1.44rem] pt-[1.37rem]',
        { 'border-b border-[#a0a0a0/50]': !$uiStore.mobileNavDropdownOpen },
      )}>
      <div class="flex flex-1 items-center space-x-[1.25rem] lg:space-x-[2rem]">
        {#if $uiStore.mobileNavDropdownOpen}
          <a in:scale href="/">
            <SanityImage
              class="h-[50px] object-contain"
              src={logoLight}
              sizes="100px"
              imageUrlBuilder={imageBuilder}
              alt="Artcon Logo" />
          </a>
        {:else}
          <a in:scale class="h-[45px] w-[45px]" {href}>
            <ChevronLeftRounded />
          </a>
          <h2 class="lg:head-4 head-6 font-medium text-dark-gunmetal">
            <slot />
          </h2>
        {/if}
      </div>

      <Hamburger
        color={$uiStore.mobileNavDropdownOpen ? 'white' : '#1B1B1E'}
        scrollToTopPosition={scrollY + positionFromTop}
        class="block md:hidden" />
      <button
        on:click={() => (popupSate = 'visible')}
        class="group hidden aspect-square h-[1.875rem] w-[1.875rem] rounded-full md:block lg:h-[2.8125rem] lg:w-[2.8125rem]">
        <ShareIcon
          class="ml-auto text-[#A5A5A8] transition-colors duration-300 group-hover:text-dark-gunmetal" />
      </button>
    </div>
    {#if showLogo}
      <div
        transition:fade
        class="absolute left-[40px] top-1/2 hidden -translate-y-1/2 lg:block">
        <a href="/">
          <SanityImage
            class="h-[50px] object-contain"
            src={logoDark}
            sizes="100px"
            imageUrlBuilder={imageBuilder}
            alt="Artcon Logo" />
        </a>
      </div>
    {/if}
  </div>
</nav>

{#if popupSate === 'visible'}
  <SharePopup bind:popupSate />
{/if}
