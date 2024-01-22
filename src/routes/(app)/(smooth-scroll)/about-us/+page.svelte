<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import AboutUs from '@/components/pages/about-us/AboutUs.svelte';
  import TeamBanner from '@/components/pages/about-us/TeamBanner.svelte';
  import Team from '@/components/pages/about-us/team/Team.svelte';
  import type { AboutUsPageProps } from '@/lib/types/about-us.types';
  import type { PageProps } from '@/lib/types/common.types';

  export let data: PageProps<AboutUsPageProps>;
  let {
    page,
    site: {
      footer,
      contact,
      logos: { logoDark, ogImage },
    },
  } = data;
</script>

<Seo seo={page?.seo} siteOgImg={ogImage} />
{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}

<div class="relative z-10 mt-[100dvh] bg-white">
  {#each page.sections as s}
    {#if s._type === 'aboutUsPage.aboutUs'}
      <AboutUs props={s} />
    {:else if s._type === 'aboutUsPage.teamBanner'}
      <TeamBanner props={s} />
    {/if}
  {/each}

  {#if !!page?.team?.length}
    <Team team={page.team} />
  {/if}

  <Footer {footer} {contact} logo={logoDark} />
</div>
