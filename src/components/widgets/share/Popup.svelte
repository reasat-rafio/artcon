<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale, blur, slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import CopyIcon from '@/components/icons/Copy.svelte';
  import XIcon from '@/components/icons/X.svelte';

  export let popupSate: 'visiable' | 'hidden';

  let clipboardEl: HTMLInputElement;
  let copyedToClipboard = false;
  const SOCIALS = [
    { name: 'Twitter', icon: '/share-icons/x.svg' },
    { name: 'Facebook', icon: '/share-icons/fb.svg' },
    { name: 'Thread', icon: '/share-icons/th.svg' },
    { name: 'WhatsApp', icon: '/share-icons/wa.svg' },
  ];

  onMount(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    const disableScrolling = () => {
      window.scrollTo(scrollLeft, scrollTop);
    };

    window.addEventListener('scroll', disableScrolling);
    return () => {
      window.removeEventListener('scroll', disableScrolling);
    };
  });

  const copyToClipBorad = () => {
    if (clipboardEl) {
      clipboardEl.select();
      clipboardEl.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(clipboardEl.value);
      copyedToClipboard = true;
    }
  };
</script>

<div
  tabindex="0"
  role="button"
  aria-label="backdrop"
  on:click={() => (popupSate = 'hidden')}
  on:keypress={() => (popupSate = 'hidden')}
  class="fixed inset-0 z-demigod h-full w-full cursor-default bg-black-800/50 backdrop-blur-lg"
  transition:fade
/>

<div
  class="fixed left-1/2 top-1/2 z-god h-min max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-white px-[40px] py-[32px]"
  in:scale={{ delay: 200 }}
  out:blur
>
  <div class="relative flex flex-col space-y-[32px]">
    <div>
      <p class="space-y-[5px] text-[24px] font-semibold text-[#222]">
        Share this page
      </p>
      <p class="text-t2">If you like this content share it with your friends</p>
    </div>
    <ul class="flex justify-between space-x-[48px]">
      {#each SOCIALS as { icon, name }}
        <li class="flex flex-col items-center justify-center">
          <button
            class="mb-[8px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[rgba(34,34,34,0.06)] p-[20px]"
          >
            <img src={icon} alt={name} />
          </button>
          <p class="text-[12px] tracking-[0.24px] text-[#888888]">{name}</p>
        </li>
      {/each}
    </ul>
    <div
      class="flex space-x-1 rounded-[4px] border px-[18px] py-[16px] {copyedToClipboard
        ? 'border-[#198754]'
        : 'border-[rgba(0,0,0,0.12)]'}"
    >
      <input
        bind:this={clipboardEl}
        disabled
        type="text"
        class="text-t2 flex-1 truncate border-none outline-none"
        value={$page.url.href}
      />

      <button class="outline-none active:scale-110" on:click={copyToClipBorad}>
        <CopyIcon />
      </button>
    </div>
  </div>

  <button
    on:click={() => (popupSate = 'hidden')}
    class="absolute right-4 top-4 transition-transform duration-300 hover:scale-150"
  >
    <XIcon />
  </button>
</div>

<style lang="postcss">
  .text-t2 {
    @apply text-title-2 text-[#888888];
  }
</style>
