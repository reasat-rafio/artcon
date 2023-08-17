<script lang="ts">
  import type { PromotionProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import ParallaxScrollImage from '@/components/parallax-scroll-image/ParallaxScrollImage.svelte';

  export let props: PromotionProps;
  let {
    descriptionBlock: { title, cta, information, description, subtitle },
    coverImage,
    ebook,
    quote,
  } = props;
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <svlete:element this="article">
      <ParallaxScrollImage class="mb-xl">
        <svelte:fragment slot="first-image" let:Image>
          <Image image={coverImage} />
        </svelte:fragment>
        <svelte:fragment slot="second-image" let:Image>
          <Image el="a" href={ebook.url} image={ebook.image} />
        </svelte:fragment>
      </ParallaxScrollImage>
    </svlete:element>

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
