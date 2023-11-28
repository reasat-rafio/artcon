<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import type { PageProps } from '@/lib/types/common.types';

  export let data: PageProps<unknown>;

  $: ({
    page: { seo },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);
</script>

<Seo {seo} siteOgImg={ogImage} />

<div class="relative mt-[100vh] bg-white">
  <Footer {footer} {contact} logo={logoLight} />
</div>
