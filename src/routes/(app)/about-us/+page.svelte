<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import AboutUs from '@/components/pages/about-us/AboutUs.svelte';
  import TeamBanner from '@/components/pages/about-us/TeamBanner.svelte';
  import type { AboutUsPageProps } from '@/lib/types/aboutUs.types';
  import type { PageProps } from '@/lib/types/common.types';

  export let data: PageProps<AboutUsPageProps>;
  let {
    page,
    site: { logos },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />

{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {:else if s._type === 'aboutUsPage.aboutUs'}
    <AboutUs props={s} />
  {:else if s._type === 'aboutUsPage.teamBanner'}
    <TeamBanner props={s} />
  {/if}
{/each}
