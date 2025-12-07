<script lang="ts">
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { DocumentationProps } from '@/lib/types/event-detail.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';

  export let props: DocumentationProps;
  $: ({
    quote,
    images,
    descriptionBlock: { description, name, author, cta, isbn, publishedBy },
  } = props);
</script>

<section>
  <div class="container-primary py-section">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <ParallaxScrollImage
      class="mb-sm md:mb-[80px] xl:mb-[6.69rem]"
      images={[{ img: images[0] }, { img: images[1] }]} />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <div class="space-y-[36px]">
          <C.HeaderContainer>
            <C.Title>{name}</C.Title>
            {#if !!author}
              <C.Subtitle>{author}</C.Subtitle>
            {/if}
          </C.HeaderContainer>

          <div>
            {#if !!publishedBy?.length}
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
            {/if}

            {#if !!isbn}
              <C.Subtitle class="!text-[0.75rem]">
                ISBN {isbn}
              </C.Subtitle>
            {/if}
          </div>

          {#if !!cta?.title && !!cta?.href}
            <Cta href={cta.href}>{cta.title}</Cta>
          {/if}
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
