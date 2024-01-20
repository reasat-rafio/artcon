<script lang="ts">
  import NavList from '@/components/common/navigation/nav-list/NavList.svelte';
  import ImagePopup from '@/components/widgets/image-popup/ImagePopup.svelte';
  import Lightbox from '@/components/widgets/light-box/Lightbox.svelte';
  import { urlFor } from '@/lib/sanity/sanityClient';
  import imagePopupStore from '@/store/image-popup';
  import lightboxStore from '@/store/lightbox';
  import { BootstrapToast, ToastContainer } from 'svelte-toasts';

  import '@fontsource/inter/300.css';
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '@fontsource/inter/700.css';
  import '@fontsource/outfit/500.css';
  import '@fontsource/outfit/600.css';

  export let data;
  $: ({
    site: {
      nav,
      logos: { favicon },
    },
  } = data);

  $: faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

<NavList {nav} />
<slot />
<ToastContainer placement="bottom-right" let:data>
  <BootstrapToast {data} />
</ToastContainer>
{#if $lightboxStore.showLightbox}
  <Lightbox />
{/if}
{#if $imagePopupStore.show}
  <ImagePopup />
{/if}
