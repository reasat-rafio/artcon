<script lang="ts">
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { DocumentationProps } from '@/lib/types/event-detail.types';
  import { PortableText } from '@portabletext/svelte';

  export let props: DocumentationProps;
  $: ({
    quote,
    images,
    descriptionBlock: { description, name, author, cta, information },
  } = props);
</script>

<section>
  <div class="container-primary py-section">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <ParallaxScrollImage
      class="mb-section"
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

          <div class="sub-title-light">
            <PortableText value={information} />
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
