<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import type { GalleryProps } from '@/lib/types/exhibitionDetail.types';

  export let props: GalleryProps;
  let {
    descriptionBlock: { title, description },
    images,
  } = props;
</script>

<section class="py-xl">
  <div class="container">
    <!-- <Carousel {images} /> -->

    <Carousel class="mb-xl" let:Gallery>
      <Gallery
        class="grid grid-cols-3 gap-x-[25px] gap-y-[56px] pr-[25px]"
        slidesPerView={6}
        items={images}
        let:chunk
      >
        {#each chunk as image}
          <Card let:Image>
            <Image {image} />
          </Card>
        {/each}
      </Gallery>
    </Carousel>

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:Title let:IntroContainer>
        <IntroContainer>
          <Title>{title}</Title>
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
