<script lang="ts">
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { AboutUsProps } from '@/lib/types/aboutUs.types';

  export let props: AboutUsProps;
  let {
    quote,
    descriptionBlock: { title, description },
  } = props;
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.Title>{title}</C.Title>
        </C.IntroContainer>
      </svelte:fragment>
      <svelte:fragment slot="description" let:C>
        <C.DescriptionContainer>
          <C.Description>
            <C.PortableTextBlock value={description} />
          </C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
