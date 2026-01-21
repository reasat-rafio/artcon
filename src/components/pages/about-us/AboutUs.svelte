<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { AboutUsProps } from '@/lib/types/about-us.types';

  export let props: AboutUsProps;
  let {
    quote,
    descriptionBlock: { title, description },
  } = props;
</script>

<section class="w-full max-w-full overflow-hidden">
  <div class="container-primary {$$props.class}">
    {#if !!quote}
      <Quote class="pt-section" {quote} />
    {/if}

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <C.Title el="h2">{title}</C.Title>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
