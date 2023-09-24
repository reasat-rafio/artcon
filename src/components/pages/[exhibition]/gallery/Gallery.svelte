<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import type { GalleryProps } from '@/lib/types/exhibitionDetail.types';
  import { PortableText } from '@portabletext/svelte';

  export let props: GalleryProps;
  $: ({
    descriptionBlock: { title, description },
    images,
  } = props);
</script>

<section class="py-section">
  <div class="container">
    <Carousel class="mb-section" let:Gallery>
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
        <C.Title>{title}</C.Title>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
