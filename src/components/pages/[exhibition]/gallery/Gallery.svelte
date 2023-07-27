<script lang="ts">
  import DescriptionBlock from '@/components/DescriptionBlock.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import type { GalleryProps } from '@/lib/types/exhibitionDetail.types';
  import Carousel from './Carousel.svelte';

  export let props: GalleryProps;
  let {
    descriptionBlock: { title, description },
    images,
  } = props;
</script>

<section>
  <div class="container pt-xl">
    <Carousel {images} />
    <DescriptionBlock class="mb-xl" {description}>
      <H4>{title}</H4>
    </DescriptionBlock>
  </div>
</section>
