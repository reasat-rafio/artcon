<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { GalleryProps } from '@/lib/types/exhibitionDetail.types';
  import { PortableText } from '@portabletext/svelte';
  import Gallery from '@/components/ui/carousel/Gallery.svelte';

  export let props: GalleryProps;
  $: ({
    descriptionBlock: { title, description },
    images,
  } = props);
</script>

<section class="py-section">
  <div class="container">
    <div class="mb-section">
      <Gallery items={images} let:chunk>
        {#each chunk as image}
          <Card class="max-md:pt-[20px] md:pl-[20px]" let:Image>
            <Image {image} />
          </Card>
        {/each}
      </Gallery>
    </div>

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
