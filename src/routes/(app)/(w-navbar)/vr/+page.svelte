<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import SecondaryNav from '@/components/widgets/seondary-nav/SecondaryNav.svelte';
  import { formatVrListingProps } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { VrPageProps } from '@/lib/types/vr.types';
  import Hero from '@/components/common/hero-list/Hero.svelte';
  export let data: PageProps<VrPageProps>;
  $: ({
    page: { sections, seo, vrs, tags },
    site: {
      logos: { logoLight, ogImage },
      footer,
      contact,
    },
  } = data);
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'vrPage.hero'}
    <Hero props={formatVrListingProps(s)} />
  {/if}
{/each}

<SecondaryNav {tags} href="/" logo={logoLight}>Our virtual reality</SecondaryNav
>
<Footer {footer} {contact} logo={logoLight} />
