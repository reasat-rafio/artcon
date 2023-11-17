<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Documentation from '@/components/pages/[event]/Documentation.svelte';
  import Gallery from '@/components/pages/[event]/Gallery.svelte';
  import NewsAndMedia from '@/components/pages/[event]/NewsAndMedia.svelte';
  import Summary from '@/components/pages/[event]/Summary.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { EventDetailPageProps } from '@/lib/types/event-detail.types';

  export let data: PageProps<EventDetailPageProps>;
  $: ({
    page: {
      name,
      cta,
      status,
      type,
      startDate,
      endDate,
      seo,
      sections,
      asset,
      gallery,
      associationsList,
      description,
    },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

  $: ({ date, status: eventStatus } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));

  $: heroText = status || (eventStatus !== 'Ongoing' ? date : eventStatus);
</script>

<Seo {seo} siteOgImg={ogImage} />
<Hero
  props={{
    _type: 'common.hero',
    _key: '',
    asset,
    cta,
    type,
    title: name,
    text: heroText,
  }} />

<div class="relative mt-[100vh] bg-white">
  <Share href="/event" logo={logoLight}>Our events</Share>

  {#each sections as props}
    {#if props._type === 'common.imageAsset'}
      <ImageAsset {props} />
    {:else if props._type === 'event.summary'}
      <Summary
        props={{
          ...props,
          descriptionBlock: { associationsList, date, description, gallery },
        }} />
    {:else if props._type === 'event.documentation'}
      <Documentation {props} />
    {:else if props._type === 'event.gallery'}
      <Gallery {props} />
    {:else if props._type === 'event.newsAndMedia'}
      <NewsAndMedia {props} />
    {/if}
  {/each}
  <Footer {footer} {contact} logo={logoLight} />
</div>
