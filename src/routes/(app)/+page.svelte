<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import ContactDesktop from '@/components/pages/landing/ContactDesktop.svelte';
  import Hero from '@/components/pages/landing/Hero.svelte';
  import DesktopCollections from '@/components/pages/landing/collections/desktop/Collections.svelte';
  import MobileCollections from '@/components/pages/landing/collections/mobile/Collections.svelte';
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
<div
  bind:this={rootEl}
  class="lg:fixed lg:inset-0 lg:isolate lg:h-screen lg:w-screen lg:overflow-hidden"
>
  {#each page.sections as s}
    {#if s._type === 'common.hero'}
      <Hero class="fixed inset-0" props={{ ...s, scrollAmount: 0 }} />
      {#if showContact && windowWidth < 1024}
        <ContactDesktop {contact} />
      {/if}
    {:else if s._type === 'landing.collections'}
      {#if windowWidth < 1024}
        <MobileCollections props={s} />
      {:else}
        <DesktopCollections bind:rootEl props={s} />
      {/if}
    {/if}
  {/each}
</div>
