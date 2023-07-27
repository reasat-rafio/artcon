<script lang="ts">
  import DescriptionBlock from '@/components/DescriptionBlock.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import type { GalleryProps } from '@/lib/types/exhibitionDetail.types';

  export let props: GalleryProps;
  let {
    descriptionBlock: { title, description },
    images,
  } = props;
</script>

<section>
  <div class="container pt-xl">
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

    <DescriptionBlock class="mb-xl" {description}>
      <H4>{title}</H4>
    </DescriptionBlock>
  </div>
</section>
