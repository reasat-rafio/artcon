<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ShareIcon from '@/components/icons/ShareIcon.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import SahrePopup from './Popup.svelte';

  export let href: string;

  let popupSate: 'visiable' | 'hidden' = 'hidden';
</script>

<section class="border-b border-[#A5A5A8] py-[27px]">
  <div class="container flex">
    <div class="flex flex-1 items-center space-x-[32px]">
      <a class="h-[45px] w-[45px]" {href}>
        <ChevronLeftRounded />
      </a>
      <H4><slot /></H4>
    </div>
    <button on:click={() => (popupSate = 'visiable')} class="h-[28px] w-[27px]">
      <ShareIcon />
    </button>
  </div>
</section>

{#if popupSate === 'visiable'}
  <SahrePopup bind:popupSate />
{/if}
