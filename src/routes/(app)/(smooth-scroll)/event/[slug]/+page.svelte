<script lang="ts">
  import { page } from '$app/stores';
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import OthersDocument from '@/components/common/other-document/OtherDocument.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Documentation from '@/components/pages/[event]/Documentation.svelte';
  import Gallery from '@/components/pages/[event]/Gallery.svelte';
  import NewsAndMedia from '@/components/pages/[event]/NewsAndMedia.svelte';
  import Summary from '@/components/pages/[event]/Summary.svelte';
  import Video from '@/components/pages/[event]/Video.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { EventDetailPageProps } from '@/lib/types/event-detail.types';

  export let data: PageProps<EventDetailPageProps>;
  $: ({
    page: {
      name,
      cta,
      topTitle,
      subtitle,
      startDate,
      endDate,
      seo,
      sections,
      asset,
      gallery,
      associationsList,
      description,
      otherEvents,
      tag,
      slug,
    },
    site: {
      logos: { logoDark, ogImage, logoLight },
      footer,
      contact,
    },
  } = data);

  $: ({ date, status } = calculateStatusBetweenDates({
    startDate,
    endDate,
    longFormat: true,
  }));

  $: _topTitle = topTitle ?? (status !== 'Ongoing' ? date : status);
</script>

{#key $page.params.slug}
  <Seo {seo} siteOgImg={ogImage} />
  <Hero
    props={{
      _type: 'common.hero',
      asset,
      cta,
      topTitle: _topTitle,
      title: name,
      subtitle: subtitle ?? tag?.name,
    }} />

  <Share href="/event" {logoLight} {logoDark}>Our events</Share>
  <div class="relative z-10 bg-white">
  {#each sections as props}
    {#if props._type === 'common.imageAsset'}
      <ImageAsset {props} />
    {:else if props._type === 'event.summary'}
      <Summary
        props={{
          ...props,
          descriptionBlock: { associationsList, date, description, gallery },
        }} />
    {:else if props._type === 'event.video'}
      <Video {props} />
    {:else if props._type === 'event.documentation'}
      <Documentation {props} />
    {:else if props._type === 'event.gallery'}
      <Gallery {props} />
    {:else if props._type === 'event.newsAndMedia'}
      <NewsAndMedia {props} />
    {/if}
  {/each}

    {#if !!otherEvents?.length}
      <OthersDocument
        urlPrefix="/event"
        title="Other events"
        data={otherEvents} />
    {/if}

    <Footer {footer} {contact} logo={logoDark} />
  </div>
{/key}
