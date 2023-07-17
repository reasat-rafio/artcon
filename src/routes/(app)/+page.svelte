<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Contact from '@/components/pages/landing/Contact.svelte';
  import Hero from '@/components/pages/landing/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { HomePageProps } from '@/lib/types/landing.types';

  export let data: PageProps<HomePageProps>;
  let {
    page,
    site: { logos, contact },
  } = data;

  let rootEl: HTMLDivElement;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div bind:this={rootEl}>
  {#each page.sections as s}
    {#if s._type === 'landingPage.hero'}
      <Hero props={s} />
    {/if}
  {/each}
  <Contact {contact} />
</div>
