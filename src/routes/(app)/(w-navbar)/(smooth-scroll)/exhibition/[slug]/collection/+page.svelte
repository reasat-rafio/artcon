<script lang="ts">
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhibitionArtworksPageProps } from '@/lib/types/exhibition-detail.types';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import Seo from '@/components/common/Seo.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';

  export let data: PageProps<ExhibitionArtworksPageProps>;
  $: ({
    page: {
      name,
      cta,
      subtitle,
      topTitle,
      startDate,
      endDate,
      seo,
      artworks,
      asset,
      artists,
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
  }));
  $: _topTitle = topTitle ?? (status !== 'Ongoing' ? date : status);
  $: _subTitle =
    subtitle ?? artists?.personalDocuments?.name ?? 'Group Exhibition';
</script>

<Seo seo={{ ...seo, title: `Artworks | ${name}` }} siteOgImg={ogImage} />
<Hero
  props={{
    _type: 'common.hero',
    asset,
    cta,
    title: name,
    topTitle: _topTitle,
    subtitle: _subTitle,
  }} />
<div class="relative z-10 mt-[100vh] bg-white">
  <Footer {footer} {contact} logo={logoDark} />
</div>
