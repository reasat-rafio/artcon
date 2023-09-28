<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import type { ServicesPageProps } from '@/lib/types/services.types';
  import type { PageProps } from '@/lib/types/common.types';
  import Hero from '@/components/hero/Hero.svelte';
  import Services from '@/components/pages/services/Services.svelte';

  export let data: PageProps<ServicesPageProps>;
  let {
    page,
    site: { logos },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}
{#if page.services.length}
  <Services services={page.services} />
{/if}
