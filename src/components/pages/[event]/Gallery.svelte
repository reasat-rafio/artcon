<script lang="ts">
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { GalleryProps } from '@/lib/types/event-detail.types';
  import Gallery from '@/components/ui/carousel/Gallery.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import lightboxStore from '@/store/lightbox';

  export let props: GalleryProps;
  $: ({
    descriptionBlock: { title, description },
    images,
  } = props);

  const lightboxAction = (index: number) => {
    lightboxStore.setLightboxVisibility(true);
    lightboxStore.setHideThumbnails(false);
    lightboxStore.setAllImages(images);
    lightboxStore.setActiveIndex(index);
  };
</script>

<section>
  <div class="pt-section container-primary {$$props.class}">
    <DescriptionBlock class="mb-sm md:mb-[5rem] xl:mb-[4.638rem]">
      <svelte:fragment slot="intro" let:C>
        <C.Title>{title}</C.Title>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>

    <div class="lg:mr-[4.375rem]">
      <Gallery items={images} let:chunk let:api>
        {#each chunk as image, chunkIndex (image.asset._id || image._key || chunkIndex)}
          {@const chunkSize = typeof window !== 'undefined' ? (window.innerWidth >= 1280 ? 6 : window.innerWidth >= 768 ? 4 : 2) : 2}
          {@const slideIndex = api?.selectedScrollSnap() ?? 0}
          {@const globalIndex = slideIndex * chunkSize + chunkIndex}
          <Card
            on:lightboxAction={() => lightboxAction(globalIndex)}
            class="pl-[1.5625rem] hover:cursor-zoom-in max-md:pt-[1.5625rem]"
            let:Image>
            <Image {image} />
          </Card>
        {/each}
      </Gallery>
    </div>
  </div>
</section>
