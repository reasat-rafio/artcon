<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Services from '@/components/pages/services/Services.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ServicesPageProps } from '@/lib/types/services.types';

  export let data: PageProps<ServicesPageProps>;
  let {
    page,
    site: {
      logos: { ogImage, logoDark },
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

<div class="relative z-10 mt-[100vh] bg-white">
  {#if page.services.length}
    <Services services={page.services} />
  {/if}
  <Footer {footer} {contact} logo={logoDark} />
</div>
