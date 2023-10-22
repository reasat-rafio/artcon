<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ProjectDetailPageProps } from '@/lib/types/projectDetail.types';
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Summary from '@/components/pages/[project]/Summary.svelte';
  import Gallery from '@/components/pages/[project]/Gallery.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import Share from '@/components/widgets/share/Share.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';

  export let data: PageProps<ProjectDetailPageProps>;
  $: ({
    page: {
      name,
      startDate,
      endDate,
      sections,
      seo,
      asset,
      associationsList,
      description,
      gallery,
      cta,
      status,
      tag,
      otherProjects,
      type,
    },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

  $: ({ date, status: projectStatus } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));

  $: heroText = status || (projectStatus !== 'Ongoing' ? date : projectStatus);
</script>

<Seo {seo} siteOgImg={ogImage} />

<Hero
  props={{
    _type: 'common.hero',
    _key: '',
    asset,
    cta,
    title: name,
    text: heroText,
    type: tag.name,
  }}
/>

<div class="relative mt-[100vh] bg-white">
  <Share href="/" logo={logoLight}>Our projects</Share>
  {#each sections as s}
    {#if s._type === 'common.imageAsset'}
      <ImageAsset props={s} />
    {:else if s._type === 'project.summary'}
      <Summary props={{ ...s, date: date }} />
    {:else if s._type === 'project.gallery'}
      <Gallery props={s} />
    {/if}
  {/each}

  <Footer {footer} {contact} logo={logoLight} />
</div>
