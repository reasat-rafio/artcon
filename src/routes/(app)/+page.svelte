<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Overlay from '@/components/common/hero/Overlay.svelte';
  import Contact from '@/components/pages/landing/Contact.svelte';
  import Hero from '@/components/pages/landing/Hero.svelte';
  import SliderDesktop from '@/components/pages/landing/slider/SliderDesktop.svelte';
  import SliderMobile from '@/components/pages/landing/slider/SliderMobile.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { HomePageProps } from '@/lib/types/landing.types';

  export let data: PageProps<HomePageProps>;
  let {
    page,
    site: { logos, contact },
  } = data;

  let rootEl: HTMLDivElement;
  let windowWidth = 0;
  $: showContact = rootEl?.scrollLeft > rootEl?.clientWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />
<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div id="landing-page">
  <Overlay />
  <div
    bind:this={rootEl}
    class="relative lg:fixed lg:inset-0 lg:isolate lg:h-[100dvh] lg:w-screen lg:overflow-hidden">
    {#each page.sections as s}
      {#if s._type === 'common.hero'}
        <Hero
          class="fixed inset-0 lg:fixed"
          props={{ ...s, scrollAmount: rootEl?.scrollLeft }} />
        {#if showContact && windowWidth >= 1024}
          <Contact {contact} />
        {/if}
      {:else if s._type === 'landing.collections'}
        {#if windowWidth < 1024}
          <SliderMobile props={{ ...s, contact }} />
        {:else}
          <SliderDesktop bind:rootEl props={s} />
        {/if}
      {/if}
    {/each}
  </div>
</div>
