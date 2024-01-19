<script lang="ts">
  import Backdrop from '@/components/common/Backdrop.svelte';
  import imagePopupStore from '@/store/image-popup';
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import XIcon from '@/components/icons/X.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';

  onMount(() => {
    window.addEventListener('keydown', closePopup);

    return () => {
      window.removeEventListener('keydown', closePopup);
    };
  });

  function closePopup() {
    imagePopupStore.setVisibility(false);
  }
</script>

<Backdrop on:close={closePopup} />

<div
  in:scale={{ delay: 200, duration: 300 }}
  out:scale={{ start: 0.8, delay: 0, duration: 300 }}
  class="fixed left-1/2 top-1/2 z-god flex h-full w-full max-w-screen-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center p-3 lg:p-5">
  {#if !!$imagePopupStore.image}
    <figure class="max-h-screen">
      <SanityImage
        lqip
        class="h-full object-contain "
        sizes="100vw"
        src={$imagePopupStore.image}
        imageUrlBuilder={imageBuilder}
        alt={$imagePopupStore.image.alt} />

      {#if !!$imagePopupStore.image?.caption}
        <figurecaption class="caption !text-rich-black">
          {$imagePopupStore.image?.caption}
        </figurecaption>
      {/if}
    </figure>
  {/if}
</div>

<button
  transition:scale
  on:click={closePopup}
  class="fixed right-2 top-2 z-god transition-transform hover:scale-110 lg:right-5 lg:top-5">
  <XIcon class="h-5 w-5" />
</button>
