<script lang="ts">
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ServiceProps } from '@/lib/types/services.types';
  import formPopupStore from '@/store/form-popup-store';

  export let services: ServiceProps[];
  export let contextMessage: string;

  function handleFormPopup(title: string) {
    contextMessage = `The user selected service is titled ${title}.`;
    formPopupStore.setFormPopupVisibility(true);
  }
</script>

<section>
  <div
    class="py-section container-primary space-y-sm md:space-y-[80px] xl:space-y-xl">
    {#each services as { title, description, image }, index}
      <article class="space-y-sm md:space-y-[80px] xl:space-y-xl">
        <DescriptionBlock>
          <svelte:fragment slot="intro" let:C>
            <C.Title el="h2">{title}</C.Title>
          </svelte:fragment>
          <svelte:fragment slot="description" let:Description>
            <Description>
              <PortableText value={description} />
            </Description>
            <Cta
              el="button"
              onClick={() => handleFormPopup(title)}
              className="mt-md border-raisin-black text-raisin-black capitalize px-[1.94rem] leading-[120%]">
              Get Service
            </Cta>
          </svelte:fragment>
        </DescriptionBlock>

        <figure use:parallaxAnimation class="translate-y-[120px]">
          <SanityImage
            class="mx-auto aspect-video h-full w-full max-w-[72.75rem] rounded-[25px] object-cover"
            src={image}
            alt={image.alt}
            imageUrlBuilder={imageBuilder}
            sizes="(min-width: 1024px) 70vw, 100vw" />
        </figure>
      </article>
    {/each}
  </div>
</section>
