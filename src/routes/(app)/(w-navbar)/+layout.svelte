<script lang="ts">
  import type { SiteProps } from '@/lib/types/common.types';
  import Navbar from '@/components/common/navigation/Navbar.svelte';
  import { page } from '$app/stores';
  import { darkNavPaths } from '@/lib/constant';
  import MobileNavDropdown from '@/components/common/navigation/MobileNavDropdown.svelte';
  import uiStore from '@/store/ui';

  export let data: { site: SiteProps };
  $: ({
    site: {
      nav,
      logos: { logoDark, logoLight },
    },
  } = data);

  let windowWidth = 0;
  $: logo = darkNavPaths.includes($page.url.pathname) ? logoDark : logoLight;
  $: if (windowWidth >= 1024) uiStore.setMobileNavDropdown(false);
</script>

<svelte:window bind:innerWidth={windowWidth} />
<Navbar {logo} />
{#if $uiStore.mobileNavDropdownOpen}
  <MobileNavDropdown {nav} />
{/if}
<slot />
