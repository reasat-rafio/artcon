<script lang="ts">
  import Footer from '@/components/footer/Footer.svelte';
  import type { SiteProps } from '@/lib/types/common.types';
  import Navbar from '@/components/navigation/Navbar.svelte';

  export let data: { site: SiteProps };
  $: ({
    site: {
      logos: { logoLight, logoDark },
      footer,
      contact,
    },
  } = data);
</script>

<Navbar logo={logoDark} />
<slot />
<Footer {footer} {contact} logo={logoLight} />
