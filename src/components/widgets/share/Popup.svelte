<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale, blur } from 'svelte/transition';
  import { page } from '$app/stores';
  import CopyIcon from '@/components/icons/Copy.svelte';
  import XIcon from '@/components/icons/X.svelte';

  export let popupSate: 'visible' | 'hidden';

  let clipboardEl: HTMLInputElement;
  let copiedToClipboard = false;
  let pageUrl: string;
  let pageTitle: string;

  const SOCIALS = [
    { name: 'Gmail', icon: '/share-icons/gm.svg', type: 'gmail' },
    { name: 'Facebook', icon: '/share-icons/fb.svg', type: 'fb' },
    { name: 'LinkedIn', icon: '/share-icons/ln.svg', type: 'linkedin' },
    { name: 'WhatsApp', icon: '/share-icons/wa.svg', type: 'whatsapp' },
  ];

  onMount(() => {
    pageUrl = encodeURIComponent(document.URL);
    pageTitle = encodeURIComponent(document.title);

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

  const copyToClipBoard = () => {
    if (clipboardEl) {
      clipboardEl.select();
      clipboardEl.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(clipboardEl.value);
      copiedToClipboard = true;
    }
  };

  const socialWindow = (url: string, width: number, height: number) => {
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const params =
      'menubar=no,toolbar=no,status=no,width=' +
      width +
      ',height=' +
      height +
      ',top=' +
      top +
      ',left=' +
      left;
    window.open(url, '', params);
  };

  let url = null;
  const shareToSocialMedia = (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    },
  ) => {
    if (typeof window !== 'undefined' && pageUrl && pageTitle) {
      if (!(e.target instanceof HTMLButtonElement)) return;

      switch (e.target?.dataset?.type) {
        case 'fb':
          url = 'https://www.facebook.com/sharer.php?u=' + pageUrl;
          socialWindow(url, 570, 570);
          break;
        case 'gmail':
          url =
            'mailto:?subject=%22' +
            pageTitle +
            '%22&body=Read%20the%20article%20%22' +
            pageTitle +
            '%22%20on%20' +
            pageUrl;
          socialWindow(url, 570, 300);
          break;

        case 'linkedin':
          url =
            'https://www.linkedin.com/shareArticle?mini=true&url=' + pageUrl;
          socialWindow(url, 570, 570);
          break;
        case 'whatsapp':
          url = 'https://wa.me/?text=' + pageTitle + '%20' + pageUrl;
          socialWindow(url, 570, 450);
          break;

        default:
          break;
      }
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
  transition:fade />

<div
  class="fixed left-1/2 top-1/2 z-god h-min max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-white px-[40px] py-[32px]"
  in:scale={{ delay: 200 }}
  out:blur>
  <div class="relative flex flex-col space-y-[32px]">
    <div>
      <p class="space-y-[5px] text-[24px] font-semibold text-[#222]">
        Share this page
      </p>
      <p class="text-t2">If you like this content share it with your friends</p>
    </div>
    <ul class="flex justify-between space-x-[48px]">
      {#each SOCIALS as { icon, name, type }}
        <li class="flex flex-col items-center justify-center">
          <button
            data-type={type}
            class="mb-[8px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[rgba(34,34,34,0.06)] p-[20px]"
            on:click={shareToSocialMedia}>
            <img src={icon} alt={name} />
          </button>
          <p class="text-[12px] tracking-[0.24px] text-[#888888]">{name}</p>
        </li>
      {/each}
    </ul>
    <div
      class="flex space-x-1 rounded-[4px] border px-[18px] py-[16px] {copiedToClipboard
        ? 'border-[#198754]'
        : 'border-[rgba(0,0,0,0.12)]'}">
      <input
        bind:this={clipboardEl}
        disabled
        type="text"
        class="text-t2 flex-1 truncate border-none outline-none"
        value={$page.url.href} />

      <button class="outline-none active:scale-110" on:click={copyToClipBoard}>
        <CopyIcon />
      </button>
    </div>
  </div>

  <button
    on:click={() => (popupSate = 'hidden')}
    class="absolute right-4 top-4 transition-transform duration-300 hover:scale-150">
    <XIcon />
  </button>
</div>

<style lang="postcss">
  .text-t2 {
    @apply text-title-2 text-[#888888];
  }
</style>
