<script lang="ts">
  import type { PromotionProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import Images from '../featured/Images.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';

  export let props: PromotionProps;
  let {
    descriptionBlock: { title, cta, information, description, subtitle },
    images,
    quote,
  } = props;
</script>

<section>
  <div class="container py-xl">
    <Quote class="mb-xl" {quote} />
    <Images class="mb-xl" {images} />

    <DescriptionBlock>
      <svelte:fragment
        slot="intro"
        let:IntroContainer
        let:HeaderContainer
        let:PortableTextBlock
        let:Title
        let:Subtitle
        let:Cta
      >
        <IntroContainer class="space-y-[36px]">
          <HeaderContainer>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </HeaderContainer>

          <PortableTextBlock value={information} />
          <Cta href={cta.href}>{cta.title}</Cta>
        </IntroContainer>
      </svelte:fragment>
      <svelte:fragment
        slot="description"
        let:DescriptionContainer
        let:Description
      >
        <DescriptionContainer>
          <Description>{description}</Description>
        </DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
