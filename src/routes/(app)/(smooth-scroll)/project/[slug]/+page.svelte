<script lang="ts">
  import { page } from '$app/stores';
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import OthersDocument from '@/components/common/other-document/OtherDocument.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Gallery from '@/components/pages/[project]/Gallery.svelte';
  import Summary from '@/components/pages/[project]/Summary.svelte';
  import Video from '@/components/pages/[project]/Video.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ProjectDetailPageProps } from '@/lib/types/project-detail.types';

  export let data: PageProps<ProjectDetailPageProps>;
  $: ({
    page: {
      _id,
      name,
      startDate,
      endDate,
      sections,
      seo,
      asset,
      associationsList,
      associationsButton,
      description,
      gallery,
      cta,
      topTitle,
      subtitle,
      tag,
      otherProjects,
    },
    site: {
      logos: { logoDark, logoLight, ogImage },
      footer,
      contact,
    },
  } = data);

  $: ({ date, status } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));

  $: _topTitle = topTitle ?? (status !== 'Ongoing' ? date : status);
</script>

{#key $page.params.slug}
  <Seo {seo} siteOgImg={ogImage} />

  <Hero
    currentSlug={$page.params.slug}
    props={{
      _type: 'common.hero',
      asset,
      cta,
      title: name,
      topTitle: _topTitle,
      subtitle: subtitle ?? tag.name,
    }} />

  <Share href="/project" {logoLight} {logoDark}>Our Projects</Share>
  <div class="relative z-10 bg-white">
  {#each sections as s, index}
    {#if s._type === 'common.imageAsset'}
      <ImageAsset class="{index === 0 ? 'pb-section' : ''}" props={s} />
    {:else if s._type === 'project.summary'}
      <Summary
        class="pb-section"
        props={{
          ...s,
          descriptionBlock: {
            date,
            gallery,
            description,
            associationsList,
            associationsButton,
          },
        }} />
    {:else if s._type === 'project.video'}
      <Video class="pb-section" props={s} />
    {:else if s._type === 'project.gallery'}
      <Gallery class="pb-section" props={s} />
    {/if}
  {/each}

    {#if !!otherProjects?.length}
      <OthersDocument
        title="Other projects"
        data={otherProjects}
        urlPrefix="/project" />
    {/if}

    <Footer {footer} {contact} logo={logoDark} />
  </div>
{/key}
