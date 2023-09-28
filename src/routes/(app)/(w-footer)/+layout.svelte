<script lang="ts">
  import Footer from '@/components/footer/Footer.svelte';
  import type { SiteProps } from '@/lib/types/common.types';
  import '@fontsource-variable/inter';

  export let data: { site: SiteProps };
  $: ({
    site: {
      logos: { logoLight },
      footer,
      contact,
    },
  } = data);
</script>

<slot />
<Footer {footer} {contact} logo={logoLight} />
