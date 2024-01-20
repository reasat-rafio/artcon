<script lang="ts">
  import type { SiteProps } from '@/lib/types/common.types';
  import Navbar from '@/components/common/navigation/Navbar.svelte';
  import { darkNavPaths } from '@/lib/constant';
  import MobileNavDropdown from '@/components/common/navigation/MobileNavDropdown.svelte';
  import uiStore from '@/store/ui';

  export let data: { site: SiteProps; pathname: string };
  $: ({
    pathname,
    site: {
      nav,
      logos: { logoDark, logoLight },
    },
  } = data);

  $: logo = darkNavPaths.includes(pathname)
    ? $uiStore.mobileNavDropdownOpen
      ? logoLight
      : logoDark
    : logoLight;
</script>

<Navbar {logo} />
<slot />
{#if $uiStore.mobileNavDropdownOpen}
  <MobileNavDropdown {nav} />
{/if}
