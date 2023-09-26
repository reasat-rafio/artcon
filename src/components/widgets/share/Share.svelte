<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ShareIcon from '@/components/icons/ShareIcon.svelte';
  import SahrePopup from './Popup.svelte';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { fade } from 'svelte/transition';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';

  export let logo: SanityAsset;
  export let href: string;

  let sectionEl: HTMLElement;
  let popupSate: 'visiable' | 'hidden' = 'hidden';
  let showLogo = false;
  const setLogoVisibility = () =>
    (showLogo = sectionEl.getBoundingClientRect().top <= 10);
</script>

<svelte:window on:scroll={setLogoVisibility} />
<section
  bind:this={sectionEl}
  class="sticky top-0 z-50 border-b border-[#A5A5A8] bg-white pb-[1.19rem] pt-[1.69rem] lg:pb-[1.69rem] lg:pt-[1.63rem]"
>
  <div class="relative">
    <div class="container flex items-center">
      <div class="flex flex-1 items-center space-x-[1.25rem] lg:space-x-[2rem]">
        <a class="h-[45px] w-[45px]" {href}>
          <ChevronLeftRounded />
        </a>
        <h2 class="text-head-6 font-medium text-dark-gunmetal lg:text-head-4">
          <slot />
        </h2>
      </div>
      <button
        on:click={() => (popupSate = 'visiable')}
        class="aspect-square h-[1.875rem] w-[1.875rem] rounded-full lg:h-[2.8125rem] lg:w-[2.8125rem]"
      >
        <ShareIcon />
      </button>
    </div>
    {#if showLogo}
      <div transition:fade class="absolute left-[40px] top-0 hidden 2xl:block">
        <a class="" href="/">
          <SanityImage
            class="h-[50px] object-contain"
            src={logo}
            sizes="100px"
            imageUrlBuilder={imageBuilder}
          />
        </a>
      </div>
    {/if}
  </div>
</section>

{#if popupSate === 'visiable'}
  <SahrePopup bind:popupSate />
{/if}
