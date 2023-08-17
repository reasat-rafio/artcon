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
    <Carousel class="mb-xl" let:Gallery>
      <Gallery
        class="grid grid-cols-3 gap-x-[25px] gap-y-[56px] pr-[25px]"
        slidesPerPage={6}
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
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.Title>{title}</C.Title>
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
