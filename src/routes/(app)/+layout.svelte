<script lang="ts">
  import MobileNavDropdown from '@/components/common/navigation/MobileNavDropdown.svelte';
  import Navbar from '@/components/common/navigation/Navbar.svelte';
  import NavList from '@/components/common/navigation/nav-list/NavList.svelte';
  import ImagePopup from '@/components/widgets/image-popup/ImagePopup.svelte';
  import Lightbox from '@/components/widgets/light-box/Lightbox.svelte';
  import SharePopup from '@/components/widgets/share/SharePopup.svelte';
  import { darkNavPaths, excludedNavbarPaths } from '@/lib/constant.js';
  import { urlFor } from '@/lib/sanity/sanityClient';
  import imagePopupStore from '@/store/image-popup';
  import lightboxStore from '@/store/lightbox';
  import sharePopupStore from '@/store/share-popup';
  import uiStore from '@/store/ui';
  import '@fontsource/inter/300.css';
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '@fontsource/inter/700.css';
  import '@fontsource/outfit/500.css';
  import '@fontsource/outfit/600.css';
  import { BootstrapToast, ToastContainer } from 'svelte-toasts';

  export let data;
  $: ({
    pathname,
    site: {
      nav,
      logos: { favicon, logoLight, logoDark },
    },
  } = data);

  $: faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;

  $: logo = darkNavPaths.includes(pathname)
    ? $uiStore.mobileNavDropdownOpen
      ? logoLight
      : logoDark
    : logoLight;

  $: isExcludedNavbarPath = excludedNavbarPaths
    .map((path) => {
      if (path === pathname) return true; // Exact match for "/search"
      if (path.endsWith('*') && pathname.startsWith(path.slice(0, -1)))
        return true; // Subpath of "/preview/*"
      return false;
    })
    .find(Boolean);
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

{#if !isExcludedNavbarPath}
  <Navbar {logo} />
{/if}
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
{#if $sharePopupStore.show}
  <SharePopup />
{/if}
{#if $uiStore.mobileNavDropdownOpen}
  <MobileNavDropdown {nav} />
{/if}
