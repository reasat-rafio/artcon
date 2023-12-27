<script lang="ts">
  import SanityStudio from '@/components/pages/[studio]/SanityStudio.svelte';
  import { urlFor } from '@/lib/sanity/sanityClient.js';
  import config from '@/studio/sanity.config';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let data: { site: { favicon: SanityAsset } };

  $: ({
    site: { favicon },
  } = data);

  $: faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>
<SanityStudio {config} />
