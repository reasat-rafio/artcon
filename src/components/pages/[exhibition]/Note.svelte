<script lang="ts">
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { CommonNoteProps } from '@/lib/types/common.types';
  import { PortableText } from '@portabletext/svelte';

  export let props: CommonNoteProps;
  $: ({ notes } = props);
</script>

<section class="py-xl">
  <div class="container">
    {#each notes as { quote, descriptionBlock: { title, subtitle, description } }, index}
      <div>
        <Quote class="mb-xl" {quote} />
        <DescriptionBlock class={index + 1 !== notes.length ? 'mb-xl' : ''}>
          <svelte:fragment slot="intro" let:C>
            <C.HeaderContainer>
              <C.Title>{title}</C.Title>
              <C.Subtitle>{subtitle}</C.Subtitle>
            </C.HeaderContainer>
          </svelte:fragment>
          <svelte:fragment slot="description" let:Description>
            <Description>
              <PortableText value={description} />
            </Description>
          </svelte:fragment>
        </DescriptionBlock>
      </div>
    {/each}
  </div>
</section>
