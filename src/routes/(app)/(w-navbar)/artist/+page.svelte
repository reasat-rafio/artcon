<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import type { ArtistPageProps } from '@/lib/types/artist.types';
  import type { PageProps } from '@/lib/types/common.types';

  export let data: PageProps<ArtistPageProps>;

  $: ({
    page: { seo },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

  $: console.log(data);
</script>

<Seo {seo} siteOgImg={ogImage} />

<div class="relative mt-[100vh] bg-white">
  <Footer {footer} {contact} logo={logoLight} />
</div>
