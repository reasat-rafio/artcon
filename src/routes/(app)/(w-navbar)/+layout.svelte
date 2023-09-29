<script lang="ts">
  import type { SiteProps } from '@/lib/types/common.types';
  import Navbar from '@/components/navigation/Navbar.svelte';

  export let data: { site: SiteProps };
  $: ({
    site: {
      logos: { logoDark },
    },
  } = data);
</script>

<Navbar logo={logoDark} />
<slot />
