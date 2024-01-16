<script lang="ts">
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { GalleryProps } from '@/lib/types/exhibition-detail.types';
  import Gallery from '@/components/ui/carousel/Gallery.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import lightboxStore from '@/store/lightbox';

  export let props: GalleryProps;

  $: ({
    descriptionBlock: { title, description },
    images,
  } = props);

  const lightboxAction = (index: number) => {
    lightboxStore.setLightboxVisibility(true);
    lightboxStore.setAllImages(images);
    lightboxStore.setActiveIndex(index);
  };
</script>

<section>
  <div class="py-section container-primary">
    <div
      use:parallaxAnimation
      class="mb-sm translate-y-[120px] md:mb-[5rem] lg:mr-[4.375rem] xl:mb-[4.638rem]">
      <Gallery items={images} let:chunk>
        {#each chunk as image, index}
          <Card
            on:lightboxAction={() => lightboxAction(index)}
            class="pl-[1.5625rem] hover:cursor-zoom-in max-md:pt-[1.5625rem]"
            let:Image>
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
