<script lang="ts">
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ServiceItemProps, ImageDividerProps } from '@/lib/types/services.types';
  import formPopupStore from '@/store/form-popup';

  export let services: (ServiceItemProps | ImageDividerProps)[];
  export let contextMessage: string;

  function handleFormPopup(title: string) {
    contextMessage = `The user selected service is titled ${title}.`;
    formPopupStore.setFormPopupVisibility(true);
  }

  function isImageDivider(item: ServiceItemProps | ImageDividerProps): item is ImageDividerProps {
    return item._type === 'common.imageAsset';
  }
</script>

<section>
  {#each services as item}
    {#if isImageDivider(item)}
      <ImageAsset props={item} />
    {:else}
      <div class="py-section container-primary space-y-sm md:space-y-[80px] xl:space-y-xl">
        <article class="space-y-sm md:space-y-[80px] xl:space-y-xl">
          <DescriptionBlock>
            <svelte:fragment slot="intro" let:C>
              <C.Title el="h2">{item.title}</C.Title>
              {#if item.button}
                <Cta
                  el="button"
                  onClick={() => handleFormPopup(item.title)}
                  className="mt-md border-raisin-black text-raisin-black capitalize px-[1.94rem] leading-[120%]">
                  {item.button.label || 'Get Service'}
                </Cta>
              {/if}
            </svelte:fragment>
            <svelte:fragment slot="description" let:Description>
              {#if item.image}
                <figure class="mb-md">
                  <SanityImage
                    class="mx-auto h-full w-full rounded-[25px] object-cover"
                    src={item.image}
                    alt={item.image.alt || item.title}
                    imageUrlBuilder={imageBuilder}
                    sizes="(min-width: 1024px) 50vw, 100vw" />
                </figure>
              {/if}
              {#if item.summary?.text}
                <p class="!font-inter !text-[1rem] !font-[300] !leading-[27px]">{item.summary.text}</p>
              {/if}
            </svelte:fragment>
          </DescriptionBlock>

          {#if item.contentMedia}
            <figure class="service-image">
              {#if item.contentMedia.image}
                <SanityImage
                  class="h-full w-full object-cover rounded-[25px]"
                  src={item.contentMedia.image}
                  alt={item.contentMedia.image?.alt || item.title}
                  imageUrlBuilder={imageBuilder}
                  sizes="(min-width: 1024px) 1200px, 100vw" />
              {:else if item.contentMedia.video}
                <video
                  class="h-full w-full object-cover rounded-[25px]"
                  width="100%"
                  height="100%"
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate"
                  controls={false}
                  playsInline
                  autoPlay
                  muted
                  loop>
                  <source src={item.contentMedia.video.mov} type="video/mp4; codecs=hvc1" />
                  <source src={item.contentMedia.video.webm} type="video/webm" />
                  Sorry, your browser doesn&apos;t support embedded videos.
                </video>
              {/if}
            </figure>
          {/if}
        </article>
      </div>
    {/if}
  {/each}
</section>
