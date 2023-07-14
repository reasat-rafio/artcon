<script lang="ts">
  import '@fontsource-variable/inter';
  import Navbar from '@/components/navigation/Navbar.svelte';
  import { urlFor } from '@/lib/sanity/sanityClient';
  import type { SiteProps } from '@/lib/types/common.types';
  import NavItems from '@/components/navigation/NavItems.svelte';

  export let data: { site: SiteProps };
  let {
    site: {
      nav,
      logos: { favicon, logo },
    },
  } = data;

  let faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

<Navbar {logo} />
<NavItems {nav} />
<slot />
