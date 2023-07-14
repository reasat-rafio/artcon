<script lang="ts">
  import Navbar from '@/components/navigation/Navbar.svelte';
  import { urlFor } from '@/lib/sanity/sanityClient';
  import type { SiteProps } from '@/lib/types/common.types';

  export let data: { site: SiteProps };
  let {
    site: {
      logos: { favicon },
    },
  } = data;

  let faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;

  console.log('====================================');
  console.log(faviconImage);
  console.log('====================================');
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>
<Navbar />
<slot />
