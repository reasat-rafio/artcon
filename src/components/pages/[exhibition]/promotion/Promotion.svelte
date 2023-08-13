<script lang="ts">
  import type { PromotionProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import ParallaxScrollImage from '@/components/ParallaxScrollImage.svelte';

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
    <ParallaxScrollImage class="mb-xl" {images} />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer class="space-y-[36px]">
          <C.HeaderContainer>
            <C.Title>{title}</C.Title>
            <C.Subtitle>{subtitle}</C.Subtitle>
          </C.HeaderContainer>

          <C.PortableTextBlock value={information} />
          <C.Cta href={cta.href}>{cta.title}</C.Cta>
        </C.IntroContainer>
      </svelte:fragment>
      <svelte:fragment slot="description" let:C>
        <C.DescriptionContainer>
          <C.Description>
            <C.PortableTextBlock value={description} />
          </C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
