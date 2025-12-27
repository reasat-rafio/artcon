<script lang="ts">
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ServiceProps } from '@/lib/types/services.types';
  import formPopupStore from '@/store/form-popup';

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
    {#each services as { title, description, descriptionMedia, fullWidthImage }, index}
      <article class="space-y-sm md:space-y-[80px] xl:space-y-xl">
        <DescriptionBlock>
          <svelte:fragment slot="intro" let:C>
            <C.Title el="h2">{title}</C.Title>
            <Cta
              el="button"
              onClick={() => handleFormPopup(title)}
              className="mt-md border-raisin-black text-raisin-black capitalize px-[1.94rem] leading-[120%]">
              Get Service
            </Cta>
          </svelte:fragment>
          <svelte:fragment slot="description" let:Description>
            {#if descriptionMedia}
              <figure class="mb-md">
                {#if descriptionMedia.image}
                  <SanityImage
                    class="mx-auto aspect-video h-full w-full rounded-[25px] object-cover"
                    src={descriptionMedia.image}
                    alt={descriptionMedia.image.alt || ''}
                    imageUrlBuilder={imageBuilder}
                    sizes="(min-width: 1024px) 50vw, 100vw" />
                {:else if descriptionMedia.video}
                  <video
                    class="mx-auto aspect-video h-full w-full rounded-[25px] object-cover"
                    width="100%"
                    height="100%"
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate"
                    controls={false}
                    playsInline
                    autoPlay
                    muted
                    loop>
                    <source src={descriptionMedia.video.mov} type="video/mp4; codecs=hvc1" />
                    <source src={descriptionMedia.video.webm} type="video/webm" />
                    Sorry, your browser doesn&apos;t support embedded videos.
                  </video>
                {/if}
              </figure>
            {/if}
            <Description>
              <PortableText value={description} />
            </Description>
          </svelte:fragment>
        </DescriptionBlock>

        {#if fullWidthImage}
          <figure class="service-image">
            <SanityImage
              class="h-full w-full object-cover rounded-[25px]"
              src={fullWidthImage}
              alt={fullWidthImage.alt || title}
              imageUrlBuilder={imageBuilder}
              sizes="(min-width: 1024px) 1200px, 100vw" />
          </figure>
        {/if}
      </article>
    {/each}
  </div>
</section>
