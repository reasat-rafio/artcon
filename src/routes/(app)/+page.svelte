<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  // import Contact from '@/components/pages/landing/Contact.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { HomePageProps } from '@/lib/types/landing.types';
  import Collections from '@/components/pages/landing/collections/Collections.svelte';

  export let data: PageProps<HomePageProps>;
  let {
    page,
    site: { logos },
  } = data;

  let rootEl: HTMLDivElement;
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div
  on:wheel={(event) => {
    const scrollAmount = event.deltaY;
    rootEl.scrollLeft += scrollAmount;
  }}
  class="fixed inset-0 h-screen w-screen overflow-hidden"
  bind:this={rootEl}
>
  {#each page.sections as s}
    {#if s._type === 'common.hero'}
      <Hero class="fixed inset-0" props={s} />
    {:else if s._type === 'landing.collections'}
      <Collections props={s} />
    {/if}
  {/each}
</div>
