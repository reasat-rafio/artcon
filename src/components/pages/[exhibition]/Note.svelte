<script lang="ts">
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { CommonNoteProps } from '@/lib/types/common.types';

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
            <C.IntroContainer>
              <C.HeaderContainer>
                <C.Title>{title}</C.Title>
                <C.Subtitle>{subtitle}</C.Subtitle>
              </C.HeaderContainer>
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
    {/each}
  </div>
</section>
