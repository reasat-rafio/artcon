<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import type { ServicesPageProps } from '@/lib/types/services.types';
  import type { PageProps } from '@/lib/types/common.types';
  import Hero from '@/components/hero/Hero.svelte';
  import Services from '@/components/pages/services/Services.svelte';
  import Footer from '@/components/footer/Footer.svelte';

  export let data: PageProps<ServicesPageProps>;
  let {
    page,
    site: {
      logos: { ogImage, logoLight },
      footer,
      contact,
    },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={ogImage} />
{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}

<div class="relative mt-[100vh] bg-white">
  {#if page.services.length}
    <Services services={page.services} />
  {/if}
  <Footer {footer} {contact} logo={logoLight} />
</div>
