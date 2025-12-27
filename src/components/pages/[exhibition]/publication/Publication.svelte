<script lang="ts">
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type {
    Publication,
    PublicationProps,
  } from '@/lib/types/exhibition-detail.types';
  import imagePopupStore from '@/store/image-popup';

  export let props: PublicationProps & { publication: Publication };
  $: ({
    publication: {
      description,
      subtitle,
      name,
      publishedBy,
      isbn,
      quote,
      exproleLink,
      publicationImage,
      slug,
      associationsList,
    },
    invitationCardImage,
    fullInvitationCardImage,
  } = props);

  function triggerPopup() {
    imagePopupStore.setVisibility(true);
    imagePopupStore.setImage(
      fullInvitationCardImage,
      fullInvitationCardImage?.caption,
    );
  }
</script>

<section>
  <div class="py-section container-primary">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <ParallaxScrollImage
      on:triggerPopup={triggerPopup}
      class="mb-section"
      disableHoverEffect={true}
      images={[
        {
          img: invitationCardImage,
          triggerPopup: true,
        },
        {
          img: { ...publicationImage, alt: name },
          caption: name,
          link: `/preview/publication/${slug.current}`,
        },
      ]} />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <div class="space-y-[2.25rem]">
          <C.HeaderContainer>
            <C.Title>{name}</C.Title>
            <C.Subtitle
              class="font-inter !text-[0.875rem] font-light leading-[120%]">
              {subtitle}
            </C.Subtitle>
          </C.HeaderContainer>

          <div>
            {#if !!associationsList?.length}
              <div class="mb-[1.5rem]">
                <ul class="space-y-[0.5rem]">
                  {#each associationsList as { key, value }}
                    <div>
                      <C.Subtitle class="!text-[0.75rem] font-light text-eerie-black">
                        {key}
                      </C.Subtitle>
                      <C.Subtitle class="!text-[0.875rem] font-normal">
                        {value}
                      </C.Subtitle>
                    </div>
                  {/each}
                </ul>
              </div>
            {/if}
            <C.Subtitle class="!text-[0.75rem] font-light  text-eerie-black">
              Published by
              {#each publishedBy as p, i}
                <div class="inline font-light">
                  {#if i === publishedBy.length - 1 && publishedBy.length > 1}
                    <span>and</span>
                  {:else if i !== 0}
                    ,
                  {/if}
                  <span class="!text-[0.875rem] font-normal">
                    {p}
                  </span>
                </div>
              {/each}
            </C.Subtitle>
            <C.Subtitle class="!text-[0.75rem]">ISBN {isbn}</C.Subtitle>
          </div>

          <Cta variant="tertiary" className="capitalize !min-w-[12rem] !px-[2.5rem] !py-[1rem] !text-[1rem] ![background:linear-gradient(90deg,rgb(100,100,100)_0%,rgb(220,50,50)_100%)]" href={`/preview/publication/${slug.current}`}>
            Preview
          </Cta>
        </div>
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
