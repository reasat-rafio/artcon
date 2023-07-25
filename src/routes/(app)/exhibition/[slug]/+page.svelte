<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhinitionDetailPageProps } from '@/lib/types/exhibitionDetail.types';

  export let data: PageProps<ExhinitionDetailPageProps>;
  let {
    page,
    site: { logos },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<section>Hi</section>
