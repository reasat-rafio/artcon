<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ShareIcon from '@/components/icons/ShareIcon.svelte';
  import SharePopup from './Popup.svelte';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { fade } from 'svelte/transition';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import Hamburger from '@/components/common/Hamburger.svelte';

  export let logo: SanityAsset;
  export let href: string;

  let sectionEl: HTMLElement;
  let popupSate: 'visible' | 'hidden' = 'hidden';
  let showLogo = false;
  const setLogoVisibility = () =>
    (showLogo = sectionEl.getBoundingClientRect().top <= 10);
</script>

<svelte:window on:scroll={setLogoVisibility} />
<nav bind:this={sectionEl} class="sticky top-0 z-50 overflow-hidden bg-white">
  <div class="relative">
    <div
      class="container-primary flex items-center border-b border-[#a0a0a0/50] pb-[1.44rem] pt-[1.37rem]">
      <div class="flex flex-1 items-center space-x-[1.25rem] lg:space-x-[2rem]">
        <a class="h-[45px] w-[45px]" {href}>
          <ChevronLeftRounded />
        </a>
        <h2 class="lg:head-4 head-6 font-medium text-dark-gunmetal">
          <slot />
        </h2>
      </div>

      <Hamburger color="#1B1B1E" class="block md:hidden" />
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
            src={logo}
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
