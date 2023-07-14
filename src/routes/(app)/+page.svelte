<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { HomePageProps } from '@/lib/types/landing.types';

  export let data: PageProps<HomePageProps>;
  let { page, site } = data;
</script>

<Seo seo={page?.seo} siteOgImg={site?.logos?.ogImage} />
<div class="">
  <!--  -->
</div>
