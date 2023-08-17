<script lang="ts">
  import type { NoteProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';

  export let props: NoteProps;
  let { notes } = props;
</script>

<section class="py-xl">
  <div class="container">
    {#each notes as { quote, descriptionBlock: { title, subtitle, description } }}
      <div>
        <Quote class="mb-xl" {quote} />

        <DescriptionBlock class="mb-xl last:mb-0">
          <svelte:fragment slot="intro" let:C>
            <C.IntroContainer>
              <C.HeaderContainer>
                <C.Title>{title}</C.Title>
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
