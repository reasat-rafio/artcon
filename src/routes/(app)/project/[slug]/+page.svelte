<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ProjectDetailPageProps } from '@/lib/types/projectDetail.types';
  import ShareWidget from '@/components/widgets/share/Share.svelte';
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Summary from '@/components/pages/[project]/Summary.svelte';
  import Gallery from '@/components/pages/[project]/Gallery.svelte';
  import { getEventStatus } from '@/lib/helper';

  export let data: PageProps<ProjectDetailPageProps>;
  let {
    page,
    site: { logos },
  } = data;

  const { date, status } = getEventStatus({
    startDate: page.startDate,
    endDate: page.endDate,
  });
</script>

<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero
      props={{
        ...s,
        text: s.text || (status !== 'Ongoing' ? date : status),
      }}
    />
  {/if}
{/each}
<ShareWidget href="/project">Our Projects</ShareWidget>
{#each page.sections as s}
  {#if s._type === 'common.imageAsset'}
    <ImageAsset props={s} />
  {:else if s._type === 'project.summary'}
    <Summary props={{ ...s, date }} />
  {:else if s._type === 'project.gallery'}
    <Gallery props={s} />
  {/if}
{/each}
