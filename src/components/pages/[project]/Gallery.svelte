<script lang="ts">
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { GalleryProps } from '@/lib/types/projectDetail.types';
  import { PortableText } from '@portabletext/svelte';
  import Gallery from '@/components/ui/carousel/Gallery.svelte';

  export let props: GalleryProps;
  $: ({
    descriptionBlock: { title, description },
    images,
  } = props);
</script>

<section>
  <div class="container-primary py-section">
    <div class="mb-section">
      <Gallery axiesOnMobile="y" items={images} let:chunk>
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
