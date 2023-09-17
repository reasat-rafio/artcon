<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { HomePageProps } from '@/lib/types/landing.types';
  import Collections from '@/components/pages/landing/collections/Collections.svelte';

  export let data: PageProps<HomePageProps>;
  let {
    page,
    site: { logos },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div class="overflow-hidden">
  {#each page.sections as s}
    {#if s._type === 'common.hero'}
      <Hero class="fixed inset-0" props={s} />
    {:else if s._type === 'landing.collections'}
      <Collections props={s} />
    {/if}
  {/each}
</div>
