<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { AboutUsProps } from '@/lib/types/aboutUs.types';
  import { PortableText } from '@portabletext/svelte';

  export let props: AboutUsProps;
  let {
    quote,
    descriptionBlock: { title, description },
  } = props;
</script>

<section class="py-section">
  <div class="container">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

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
