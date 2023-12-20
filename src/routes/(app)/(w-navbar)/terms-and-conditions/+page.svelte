<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type {
    Cta as CtaProps,
    PageProps,
    SeoProps,
  } from '@/lib/types/common.types';
  import type { PortableTextBlock } from 'sanity';

  type Props = {
    seo: SeoProps;
    title: string;
    cta?: CtaProps;
    termsConditions: PortableTextBlock[];
  };

  export let data: PageProps<Props>;

  $: ({
    page: { seo, termsConditions, title, cta },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
  } = data);
</script>

<Seo {seo} siteOgImg={ogImage} />
<div class="py-section container-primary">
  <DescriptionBlock class="max-lg:mb-section">
    <svelte:fragment slot="intro" let:C>
      <C.Title class="lg:mb-10">{title}</C.Title>
    </svelte:fragment>
    <svelte:fragment slot="description" let:Description>
      <Description>
        <PortableText boldType="light" value={termsConditions} />
      </Description>

      {#if !!cta?.title && !!cta?.href}
        <Cta
          className="mt-[3.12rem] block border-raisin-black text-raisin-black"
          href={cta.href}>
          {cta.title}
        </Cta>
      {/if}
    </svelte:fragment>
  </DescriptionBlock>
</div>
<Footer {footer} {contact} logo={logoDark} />
