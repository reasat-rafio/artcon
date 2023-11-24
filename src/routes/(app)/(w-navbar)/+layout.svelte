<script lang="ts">
  import type { SiteProps } from '@/lib/types/common.types';
  import Navbar from '@/components/common/navigation/Navbar.svelte';
  import { page } from '$app/stores';
  import { darkNavPaths } from '@/lib/constant';

  export let data: { site: SiteProps };
  $: ({
    site: {
      logos: { logoDark, logoLight },
    },
  } = data);

  $: logo = darkNavPaths.includes($page.url.pathname) ? logoDark : logoLight;
</script>

<Navbar {logo} />
<slot />
