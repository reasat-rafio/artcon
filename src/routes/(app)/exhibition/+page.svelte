<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhibitionPageProps } from '@/lib/types/exhibition.types';

  export let data: PageProps<ExhibitionPageProps>;
  let {
    page,
    site: { logos },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div>
  {#each page.sections as s}
    {#if s._type === 'common.hero'}
      <Hero props={s} />
    {/if}
  {/each}
</div>
