<script lang="ts">
  import DescriptionBlock from '@/components/DescriptionBlock.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import type { GalleryProps } from '@/lib/types/exhibitionDetail.types';
  import emblaCarouselSvelte from 'embla-carousel-svelte';

  export let props: GalleryProps;
  let {
    descriptionBlock: { title, description },
    images,
  } = props;

  // let emblaApi;
  // let options = { loop: false };

  // const onInit = (event) => {
  //   emblaApi = event.detail;
  // };
</script>

<section>
  <div class="container pt-xl">
    <!-- <div
      class="embla"
      use:emblaCarouselSvelte={{ options }}
      on:emblaInit={onInit}
    >
      <div class="embla__container">
        <div class="embla__slide">Slide 1</div>
        <div class="embla__slide">Slide 2</div>
        <div class="embla__slide">Slide 3</div>
      </div>
    </div> -->

    <DescriptionBlock class="mb-xl" {description}>
      <H4>{title}</H4>
    </DescriptionBlock>
  </div>
</section>

<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
