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

  $: logo = darkNavPaths.includes($page.url.pathname) ? logoDark : logoLight;
</script>

<Navbar {logo} />
{#if $uiStore.mobileNavDropdownOpen}
  <MobileNavDropdown {nav} />
{/if}
<slot />
