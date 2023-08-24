<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ProjectDetailPageProps } from '@/lib/types/projectDetail.types';
  import ShareWidget from '@/components/widgets/share/Share.svelte';
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Summary from '@/components/pages/[project]/Summary.svelte';
  import Gallery from '@/components/pages/[project]/Gallery.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';

  export let data: PageProps<ProjectDetailPageProps>;
  $: ({
    page,
    site: { logos },
  } = data);

  $: status = calculateStatusBetweenDates({
    startDate: page.startDate,
    endDate: page?.endDate,
  });

  const getHeroTextField = (text: string | undefined) =>
    text || (status.status !== 'Ongoing' ? status.date : status.status);
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero
      props={{
        ...s,
        text: getHeroTextField(s.text),
      }}
    />
  {/if}
{/each}
<ShareWidget href="/project">Our Projects</ShareWidget>
{#each page.sections as s}
  {#if s._type === 'common.imageAsset'}
    <ImageAsset props={s} />
  {:else if s._type === 'project.summary'}
    <Summary props={{ ...s, date: status.date }} />
  {:else if s._type === 'project.gallery'}
    <Gallery props={s} />
  {/if}
{/each}
