<script lang="ts">
  import Footer from '@/components/footer/Footer.svelte';
  import NavItems from '@/components/navigation/NavItems.svelte';
  import Navbar from '@/components/navigation/Navbar.svelte';
  import { urlFor } from '@/lib/sanity/sanityClient';
  import type { SiteProps } from '@/lib/types/common.types';
  import '@fontsource-variable/inter';

  export let data: { site: SiteProps };
  $: ({
    site: {
      nav,
      logos: { favicon, logoLight, logoDark },
      footer,
      contact,
    },
  } = data);

  $: faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

<Navbar logo={logoDark} />
<!-- <NavItems {nav} /> -->
<slot />
<Footer {footer} {contact} logo={logoLight} />
