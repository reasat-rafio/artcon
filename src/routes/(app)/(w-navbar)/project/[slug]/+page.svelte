<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import OthersDocument from '@/components/common/other-document/OthersDocument.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Gallery from '@/components/pages/[project]/Gallery.svelte';
  import Summary from '@/components/pages/[project]/Summary.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ProjectDetailPageProps } from '@/lib/types/project-detail.types';

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
    },
    site: {
      logos: { logoDark, logoLight, ogImage },
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
  }} />

<div class="relative mt-[100vh] bg-white">
  <Share href="/project" logo={logoDark}>Our projects</Share>
  {#each sections as s}
    {#if s._type === 'common.imageAsset'}
      <ImageAsset props={s} />
    {:else if s._type === 'project.summary'}
      <Summary
        props={{
          ...s,
          descriptionBlock: {
            date,
            gallery,
            description,
            associationsList,
          },
        }} />
    {:else if s._type === 'project.gallery'}
      <Gallery props={s} />
    {/if}
  {/each}

  {#if !!otherProjects?.length}
    <OthersDocument
      title="Other projects"
      data={otherProjects}
      urlPrefix="/project" />
  {/if}

  <Footer {footer} {contact} logo={logoLight} />
</div>
