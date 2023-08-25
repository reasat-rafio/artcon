<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ShareIcon from '@/components/icons/ShareIcon.svelte';
  import H4 from '@/components/ui/H4.svelte';
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
  class="sticky top-0 z-50 border-b border-[#A5A5A8] bg-white py-[27px]"
>
  <div class="relative">
    <div class="container flex items-center">
      <div class="flex flex-1 items-center space-x-[32px]">
        <a class="h-[45px] w-[45px]" {href}>
          <ChevronLeftRounded />
        </a>
        <H4><slot /></H4>
      </div>
      <button
        on:click={() => (popupSate = 'visiable')}
        class="h-[28px] w-[27px]"
      >
        <ShareIcon />
      </button>
    </div>
    {#if showLogo}
      <div transition:fade class="absolute left-[40px] top-0">
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
