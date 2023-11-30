<script lang="ts">
  import NavItems from '@/components/common/navigation/NavItems.svelte';
  import { urlFor } from '@/lib/sanity/sanityClient';
  import type { SiteProps } from '@/lib/types/common.types';
  import '@fontsource/inter/300.css';
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '@fontsource/inter/700.css';
  import '@fontsource/outfit/500.css';
  import '@fontsource/outfit/600.css';

  export let data: { site: SiteProps };
  $: ({
    site: {
      nav,
      logos: { favicon },
    },
  } = data);

  $: faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

<NavItems {nav} />
<slot />
